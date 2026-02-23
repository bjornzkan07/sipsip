import React, { createContext, useContext, useReducer, useEffect, useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CONTENT from '../data/content';
import { ACHIEVEMENTS, MOCK_FRIENDS } from '../theme';

const LS_KEY = 'siplearn_state_v1';

const initialState = {
  // User
  user: null,
  // Gamification
  energy: 5,
  maxEnergy: 5,
  xpTotal: 0,
  streak: 0,
  lastDay: '',
  // Progress
  completed: {},   // { levelId: { name, date, correct, total, topic } }
  prog: {},        // { levelId: 'locked'|'unlocked'|'complete' }
  weakAreas: [],   // [{ q, ya, ca }]
  // Settings
  nightMode: false,
  adsFree: false,
  dailyChallengeUsed: false,
  // Friends
  friends: JSON.parse(JSON.stringify(MOCK_FRIENDS)),
  // UI
  earnedAchievements: [],
  toastMsg: null,
};

function buildProg(completed) {
  const prog = {};
  for (const cat in CONTENT) {
    for (const topicKey in CONTENT[cat].topics) {
      CONTENT[cat].topics[topicKey].levels.forEach((l, i) => {
        prog[l.id] = completed[l.id] ? 'complete' : i === 0 ? 'unlocked' : 'locked';
      });
    }
  }
  // unlock next level after complete
  for (const cat in CONTENT) {
    for (const topicKey in CONTENT[cat].topics) {
      const levels = CONTENT[cat].topics[topicKey].levels;
      levels.forEach((l, i) => {
        if (prog[l.id] === 'complete' && i + 1 < levels.length) {
          if (prog[levels[i + 1].id] === 'locked') {
            prog[levels[i + 1].id] = 'unlocked';
          }
        }
      });
    }
  }
  return prog;
}

function checkAchievements(state) {
  const earned = [...(state.earnedAchievements || [])];
  const doneCount = Object.keys(state.completed).length;

  const checks = [
    { id: 'first_win',   cond: doneCount >= 1 },
    { id: 'streak_3',    cond: state.streak >= 3 },
    { id: 'streak_7',    cond: state.streak >= 7 },
    { id: 'xp_500',      cond: state.xpTotal >= 500 },
    { id: 'xp_1000',     cond: state.xpTotal >= 1000 },
    { id: 'levels_5',    cond: doneCount >= 5 },
    { id: 'levels_10',   cond: doneCount >= 10 },
  ];

  let changed = false;
  for (const c of checks) {
    if (c.cond && !earned.includes(c.id)) {
      earned.push(c.id);
      changed = true;
    }
  }
  return changed ? earned : state.earnedAchievements;
}

function reducer(state, action) {
  switch (action.type) {
    case 'LOAD':
      return { ...state, ...action.payload };
    case 'SET_USER':
      return { ...state, user: action.payload };
    case 'SET_NIGHT':
      return { ...state, nightMode: action.payload };
    case 'SHOW_TOAST':
      return { ...state, toastMsg: action.payload };
    case 'CLEAR_TOAST':
      return { ...state, toastMsg: null };
    case 'SET_ENERGY': {
      const energy = Math.max(0, Math.min(action.payload, state.maxEnergy));
      return { ...state, energy };
    }
    case 'ADD_ENERGY': {
      const energy = Math.min(state.energy + action.payload, state.maxEnergy);
      return { ...state, energy };
    }
    case 'USE_ENERGY': {
      const energy = Math.max(0, state.energy - 1);
      return { ...state, energy };
    }
    case 'ADD_XP': {
      const xpTotal = state.xpTotal + action.payload;
      const earned = checkAchievements({ ...state, xpTotal });
      return { ...state, xpTotal, earnedAchievements: earned };
    }
    case 'SET_STREAK':
      return { ...state, streak: action.payload, lastDay: action.lastDay };
    case 'COMPLETE_LEVEL': {
      const { levelId, levelData } = action.payload;
      const completed = { ...state.completed, [levelId]: levelData };
      const prog = buildProg(completed);
      const earned = checkAchievements({ ...state, completed });
      return { ...state, completed, prog, earnedAchievements: earned };
    }
    case 'SET_DAILY_USED':
      return { ...state, dailyChallengeUsed: action.payload };
    case 'ADD_WEAK_AREA': {
      const exists = state.weakAreas.find(w => w.q === action.payload.q);
      if (exists) return state;
      return { ...state, weakAreas: [...state.weakAreas, action.payload] };
    }
    case 'SET_ADS_FREE':
      return { ...state, adsFree: action.payload };
    case 'ADD_FRIEND': {
      const friends = state.friends.map(f =>
        f.id === action.payload ? { ...f, added: true } : f
      );
      return { ...state, friends };
    }
    case 'LINK_SOCIAL': {
      const maxEnergy = state.maxEnergy + 1;
      return { ...state, maxEnergy };
    }
    case 'RESET_DAILY':
      return { ...state, dailyChallengeUsed: false };
    default:
      return state;
  }
}

const AppContext = createContext(null);

export function AppProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  // Load persisted state
  useEffect(() => {
    (async () => {
      try {
        const raw = await AsyncStorage.getItem(LS_KEY);
        if (raw) {
          const saved = JSON.parse(raw);
          const prog = buildProg(saved.completed || {});
          dispatch({ type: 'LOAD', payload: { ...saved, prog } });
        }
      } catch (e) {}
    })();
  }, []);

  // Persist state when it changes
  useEffect(() => {
    if (!state.user) return; // don't save before login
    const toSave = {
      user: state.user,
      energy: state.energy,
      maxEnergy: state.maxEnergy,
      xpTotal: state.xpTotal,
      streak: state.streak,
      lastDay: state.lastDay,
      completed: state.completed,
      weakAreas: state.weakAreas,
      nightMode: state.nightMode,
      adsFree: state.adsFree,
      dailyChallengeUsed: state.dailyChallengeUsed,
      friends: state.friends,
      earnedAchievements: state.earnedAchievements,
    };
    AsyncStorage.setItem(LS_KEY, JSON.stringify(toSave)).catch(() => {});
  }, [state]);

  // Check & update streak
  const checkStreak = useCallback(() => {
    const today = new Date().toDateString();
    const yesterday = new Date(Date.now() - 86400000).toDateString();
    if (state.lastDay === '') {
      dispatch({ type: 'SET_STREAK', payload: 1, lastDay: today });
    } else if (state.lastDay === today) {
      // already counted
    } else if (state.lastDay === yesterday) {
      dispatch({ type: 'SET_STREAK', payload: state.streak + 1, lastDay: today });
    } else {
      dispatch({ type: 'SET_STREAK', payload: 1, lastDay: today });
    }
  }, [state.lastDay, state.streak]);

  const toast = useCallback((msg) => {
    dispatch({ type: 'SHOW_TOAST', payload: msg });
    setTimeout(() => dispatch({ type: 'CLEAR_TOAST' }), 2500);
  }, []);

  const login = useCallback((userData) => {
    dispatch({ type: 'SET_USER', payload: userData });
    const prog = buildProg(state.completed);
    dispatch({ type: 'LOAD', payload: { prog } });
  }, [state.completed]);

  const signOut = useCallback(async () => {
    await AsyncStorage.removeItem(LS_KEY);
    dispatch({ type: 'LOAD', payload: { ...initialState } });
  }, []);

  return (
    <AppContext.Provider value={{ state, dispatch, toast, checkStreak, login, signOut, buildProg }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  return useContext(AppContext);
}

export { buildProg };
