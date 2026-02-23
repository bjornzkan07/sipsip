import React, { useState, useEffect, useRef } from 'react';
import {
  View, Text, ScrollView, TouchableOpacity, Image,
  StyleSheet, Dimensions, Animated, SafeAreaView
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useApp } from '../context/AppContext';
import { LIGHT, DARK } from '../theme';
import CONTENT from '../data/content';

const { width, height } = Dimensions.get('window');

const TOPIC_COLORS = {
  coffee:     ['#6B3300', '#C04000'],
  wine:       ['#4A0020', '#8B0040'],
  tv:         ['#1A0040', '#4A20B0'],
  ancient:    ['#8B2000', '#D44000'],
  modern:     ['#3B0060', '#7020C0'],
  classical:  ['#003060', '#0060B0'],
  modern_art: ['#560080', '#A020D0'],
  countries:  ['#003880', '#0060C8'],
  landmarks:  ['#006040', '#00A070'],
};

// Gather all questions across all categories for blitz/daily/weak modes
function getAllQuestions() {
  const qs = [];
  for (const cat in CONTENT) {
    for (const topicKey in CONTENT[cat].topics) {
      for (const level of CONTENT[cat].topics[topicKey].levels) {
        for (const q of level.questions) {
          qs.push({ ...q, catKey: cat, topicKey });
        }
      }
    }
  }
  return qs;
}

function shuffle(arr) {
  return [...arr].sort(() => Math.random() - 0.5);
}

export default function LessonScreen({ navigation, route }) {
  const { state, dispatch, toast } = useApp();
  const T = state.nightMode ? DARK : LIGHT;
  const { catKey, topicKey, levelId, mode = 'normal' } = route.params || {};

  // Determine level data
  const level = catKey && topicKey && levelId
    ? CONTENT[catKey]?.topics[topicKey]?.levels.find(l => l.id === levelId)
    : null;

  const [phase, setPhase] = useState('train'); // 'train' | 'quiz' | 'complete'
  const [slideIdx, setSlideIdx] = useState(0);
  const [answered, setAnswered] = useState(false);
  const [selected, setSelected] = useState(null);
  const [feedback, setFeedback] = useState(null); // { ok, title, body }
  const [lCorrect, setLCorrect] = useState(0);
  const [mistakes, setMistakes] = useState([]);
  const [xpEarned, setXpEarned] = useState(0);

  // Blitz mode
  const [blitzTimeLeft, setBlitzTimeLeft] = useState(60);
  const [blitzScore, setBlitzScore] = useState(0);
  const [blitzQuestions, setBlitzQuestions] = useState([]);
  const [blitzIdx, setBlitzIdx] = useState(0);
  const blitzTimerRef = useRef(null);

  // Match mode
  const [matchLeft, setMatchLeft] = useState(null);    // { idx, val }
  const [matchedL, setMatchedL] = useState([]);
  const [matchedR, setMatchedR] = useState([]);
  const [wrongL, setWrongL] = useState(null);
  const [wrongR, setWrongR] = useState(null);
  const [matchCorrect, setMatchCorrect] = useState(0);
  const [shuffledLeft, setShuffledLeft] = useState([]);
  const [shuffledRight, setShuffledRight] = useState([]);

  // Daily / weak mode questions
  const [specialQuestions, setSpecialQuestions] = useState([]);
  const [specialIdx, setSpecialIdx] = useState(0);

  const feedbackAnim = useRef(new Animated.Value(0)).current;

  // Setup for each mode
  useEffect(() => {
    if (mode === 'blitz') {
      const allQs = shuffle(getAllQuestions().filter(q => q.type === 'mcq')).slice(0, 30);
      setBlitzQuestions(allQs);
      dispatch({ type: 'USE_ENERGY' });
      startBlitzTimer();
    } else if (mode === 'daily') {
      const allQs = shuffle(getAllQuestions()).slice(0, 10);
      setSpecialQuestions(allQs);
      dispatch({ type: 'USE_ENERGY' });
      dispatch({ type: 'SET_DAILY_USED', payload: true });
    } else if (mode === 'weak') {
      const qs = state.weakAreas.map(w => {
        const allQ = getAllQuestions();
        return allQ.find(q => q.question === w.q) || null;
      }).filter(Boolean);
      setSpecialQuestions(shuffle(qs));
      dispatch({ type: 'USE_ENERGY' });
    } else {
      // Normal mode
      dispatch({ type: 'USE_ENERGY' });
    }
    return () => { if (blitzTimerRef.current) clearInterval(blitzTimerRef.current); };
  }, []);

  function startBlitzTimer() {
    blitzTimerRef.current = setInterval(() => {
      setBlitzTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(blitzTimerRef.current);
          finishBlitz();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  }

  function finishBlitz() {
    clearInterval(blitzTimerRef.current);
    const xp = blitzScore * 10;
    setXpEarned(xp);
    dispatch({ type: 'ADD_XP', payload: xp });
    setPhase('complete');
  }

  // Helpers for current question
  function getCurrentQuestion() {
    if (mode === 'blitz') return blitzQuestions[blitzIdx];
    if (mode === 'daily' || mode === 'weak') return specialQuestions[specialIdx];
    if (phase === 'quiz') return level?.questions[slideIdx];
    return null;
  }

  function getTotalSlides() {
    if (mode === 'blitz') return blitzQuestions.length;
    if (mode === 'daily' || mode === 'weak') return specialQuestions.length;
    if (!level) return 0;
    return level.training.length + level.questions.length;
  }

  function getCurrentSlideNum() {
    if (mode === 'blitz') return blitzIdx;
    if (mode === 'daily' || mode === 'weak') return specialIdx;
    return phase === 'train' ? slideIdx : level.training.length + slideIdx;
  }

  const total = getTotalSlides();
  const current = getCurrentSlideNum();
  const progress = total > 0 ? current / total : 0;

  const topicColors = TOPIC_COLORS[topicKey] || TOPIC_COLORS['tv'];

  // Setup match when question changes
  useEffect(() => {
    const q = getCurrentQuestion();
    if (q?.type === 'match') {
      setShuffledLeft(shuffle(q.pairs.map(p => p.left)));
      setShuffledRight(shuffle(q.pairs.map(p => p.right)));
      setMatchLeft(null);
      setMatchedL([]);
      setMatchedR([]);
      setMatchCorrect(0);
      setWrongL(null);
      setWrongR(null);
    }
    setAnswered(false);
    setSelected(null);
    setFeedback(null);
  }, [slideIdx, blitzIdx, specialIdx, phase]);

  function showFeedback(ok, title, body) {
    setFeedback({ ok, title, body });
    Animated.spring(feedbackAnim, {
      toValue: 1, useNativeDriver: true,
      tension: 100, friction: 8,
    }).start();
  }

  function hideFeedback() {
    Animated.timing(feedbackAnim, {
      toValue: 0, duration: 200, useNativeDriver: true,
    }).start(() => setFeedback(null));
  }

  function handleMCQ(idx) {
    if (answered) return;
    const q = getCurrentQuestion();
    setAnswered(true);
    setSelected(idx);
    const isCorrect = idx === q.correct;

    if (isCorrect) {
      let xp = mode === 'blitz' ? 10 : 15;
      setXpEarned(prev => prev + xp);
      dispatch({ type: 'ADD_XP', payload: xp });
      setLCorrect(prev => prev + 1);
      if (mode === 'blitz') setBlitzScore(prev => prev + 1);
      showFeedback(true, 'Correct! ✓', q.explain);
    } else {
      dispatch({ type: 'USE_ENERGY' });
      const mistake = { q: q.question, ya: q.options[idx], ca: q.options[q.correct] };
      setMistakes(prev => [...prev, mistake]);
      dispatch({ type: 'ADD_WEAK_AREA', payload: mistake });
      showFeedback(false, 'Not quite ✗', q.explain);
    }
  }

  function handleMatchLeft(idx, val) {
    if (matchedL.includes(idx)) return;
    if (matchLeft !== null) {
      // deselect
      setMatchLeft(null);
      return;
    }
    setMatchLeft({ idx, val });
  }

  function handleMatchRight(idx, val) {
    if (matchedR.includes(idx) || matchLeft === null) return;
    const q = getCurrentQuestion();
    const pair = q.pairs.find(p => p.left === matchLeft.val);
    const ok = pair && pair.right === val;

    if (ok) {
      const newMatchedL = [...matchedL, matchLeft.idx];
      const newMatchedR = [...matchedR, idx];
      const newCorrect = matchCorrect + 1;
      setMatchedL(newMatchedL);
      setMatchedR(newMatchedR);
      setMatchCorrect(newCorrect);
      setMatchLeft(null);

      if (newCorrect === q.pairs.length) {
        setAnswered(true);
        setLCorrect(prev => prev + 1);
        dispatch({ type: 'ADD_XP', payload: 20 });
        setXpEarned(prev => prev + 20);
        showFeedback(true, 'All matched! ✓', 'Perfect — every pair correct!');
      }
    } else {
      // Wrong — flash red briefly
      setWrongL(matchLeft.idx);
      setWrongR(idx);
      dispatch({ type: 'USE_ENERGY' });
      showFeedback(false, 'Wrong match ✗', 'Try again — keep pairing!');
      setTimeout(() => { setWrongL(null); setWrongR(null); setMatchLeft(null); }, 500);
    }
  }

  function advanceSlide() {
    hideFeedback();
    if (mode === 'blitz') {
      const nextIdx = blitzIdx + 1;
      if (nextIdx >= blitzQuestions.length) { finishBlitz(); return; }
      setBlitzIdx(nextIdx);
      return;
    }
    if (mode === 'daily' || mode === 'weak') {
      const nextIdx = specialIdx + 1;
      if (nextIdx >= specialQuestions.length) {
        finishSpecial();
        return;
      }
      setSpecialIdx(nextIdx);
      return;
    }
    // Normal mode
    if (phase === 'train') {
      if (slideIdx + 1 >= level.training.length) {
        setPhase('quiz');
        setSlideIdx(0);
      } else {
        setSlideIdx(prev => prev + 1);
      }
    } else {
      if (slideIdx + 1 >= level.questions.length) {
        finishLevel();
      } else {
        setSlideIdx(prev => prev + 1);
      }
    }
  }

  function finishSpecial() {
    const xp = xpEarned;
    dispatch({ type: 'ADD_XP', payload: 0 }); // already added per question
    setPhase('complete');
  }

  function finishLevel() {
    if (!level) { setPhase('complete'); return; }
    const total = level.questions.length;
    const xp = lCorrect * 15 + (lCorrect === total ? 50 : 0); // bonus for perfect
    dispatch({ type: 'ADD_XP', payload: 50 }); // base level completion XP
    setXpEarned(prev => prev + 50);

    const today = new Date().toLocaleDateString();
    dispatch({
      type: 'COMPLETE_LEVEL',
      payload: {
        levelId,
        levelData: {
          name: level.name,
          date: today,
          correct: lCorrect,
          total,
          topic: topicKey,
        },
      },
    });
    setPhase('complete');
  }

  // ─── Render helpers ─────────────────────────────────────────

  function renderTraining() {
    const s = level?.training[slideIdx];
    if (!s) return null;
    return (
      <ScrollView contentContainerStyle={styles.trainScroll}>
        {s.image ? (
          <View style={styles.factImgWrap}>
            <Image source={{ uri: s.image }} style={styles.factImg} resizeMode="cover" />
            <LinearGradient colors={['transparent', 'rgba(0,0,0,0.6)']} style={styles.factImgOverlay} />
            <View style={styles.factBadge}>
              <Text style={styles.factBadgeTxt}>⭐ Training</Text>
            </View>
          </View>
        ) : null}
        <View style={styles.factBody}>
          <Text style={[styles.factTitle, { color: T.tx }]}>{s.title}</Text>
          <Text style={[styles.factText, { color: T.tx2 }]}>{s.text}</Text>
          {s.highlight && (
            <View style={[styles.factHL, { backgroundColor: T.tealBg, borderColor: T.teal }]}>
              <Text style={[styles.factHLTxt, { color: T.teal }]}>💡 {s.highlight}</Text>
            </View>
          )}
        </View>
      </ScrollView>
    );
  }

  function renderMCQ(q) {
    if (!q) return null;
    const labels = ['A', 'B', 'C', 'D'];
    return (
      <ScrollView contentContainerStyle={styles.quizScroll}>
        <View style={[styles.qBadge, { backgroundColor: T.tealBg }]}>
          <Text style={[styles.qBadgeTxt, { color: T.teal }]}>Question {mode === 'blitz' ? blitzIdx + 1 : mode === 'daily' || mode === 'weak' ? specialIdx + 1 : slideIdx + 1}</Text>
        </View>
        <Text style={[styles.qText, { color: T.tx }]}>{q.question}</Text>
        <View style={styles.opts}>
          {q.options.map((opt, i) => {
            let bg = T.surface;
            let border = T.border;
            let textColor = T.tx;
            if (answered) {
              if (i === q.correct) { bg = T.okBg; border = T.ok; textColor = T.ok; }
              else if (i === selected && i !== q.correct) { bg = T.errBg; border = T.err; textColor = T.err; }
            } else if (selected === i) {
              bg = T.tealBg; border = T.teal;
            }
            return (
              <TouchableOpacity
                key={i}
                style={[styles.opt, { backgroundColor: bg, borderColor: border }]}
                onPress={() => handleMCQ(i)}
                disabled={answered}
              >
                <View style={[styles.optLabel, { backgroundColor: border === T.border ? T.bg2 : bg }]}>
                  <Text style={[styles.optLabelTxt, { color: textColor }]}>{labels[i]}</Text>
                </View>
                <Text style={[styles.optTxt, { color: textColor }]}>{opt}</Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </ScrollView>
    );
  }

  function renderMatch(q) {
    if (!q) return null;
    return (
      <ScrollView contentContainerStyle={styles.quizScroll}>
        <View style={[styles.qBadge, { backgroundColor: 'rgba(124,110,232,0.15)' }]}>
          <Text style={[styles.qBadgeTxt, { color: '#7C6EE8' }]}>Match the pairs</Text>
        </View>
        <Text style={[styles.qText, { color: T.tx }]}>{q.instruction}</Text>
        <View style={styles.matchGrid}>
          {/* Left column */}
          <View style={styles.matchCol}>
            <Text style={[styles.matchColLbl, { color: T.tx3 }]}>Terms</Text>
            {shuffledLeft.map((item, i) => {
              const isMatched = matchedL.includes(i);
              const isSelected = matchLeft?.idx === i;
              const isWrong = wrongL === i;
              return (
                <TouchableOpacity
                  key={i}
                  style={[
                    styles.matchItem,
                    { backgroundColor: T.surface, borderColor: T.border },
                    isMatched && { backgroundColor: T.okBg, borderColor: T.ok },
                    isSelected && { backgroundColor: T.tealBg, borderColor: T.teal },
                    isWrong && { backgroundColor: T.errBg, borderColor: T.err },
                  ]}
                  onPress={() => !isMatched && handleMatchLeft(i, item)}
                  disabled={isMatched}
                >
                  <Text style={[styles.matchItemTxt, { color: isMatched ? T.ok : isSelected ? T.teal : T.tx }]}>{item}</Text>
                </TouchableOpacity>
              );
            })}
          </View>
          {/* Right column */}
          <View style={styles.matchCol}>
            <Text style={[styles.matchColLbl, { color: T.tx3 }]}>Definitions</Text>
            {shuffledRight.map((item, i) => {
              const isMatched = matchedR.includes(i);
              const isWrong = wrongR === i;
              return (
                <TouchableOpacity
                  key={i}
                  style={[
                    styles.matchItem,
                    { backgroundColor: T.surface, borderColor: T.border },
                    isMatched && { backgroundColor: T.okBg, borderColor: T.ok },
                    isWrong && { backgroundColor: T.errBg, borderColor: T.err },
                  ]}
                  onPress={() => !isMatched && handleMatchRight(i, item)}
                  disabled={isMatched}
                >
                  <Text style={[styles.matchItemTxt, { color: isMatched ? T.ok : T.tx }]}>{item}</Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>
      </ScrollView>
    );
  }

  // ─── Complete screen ────────────────────────────────────────

  if (phase === 'complete') {
    const totalQs = mode === 'blitz' ? blitzScore : mode === 'daily' || mode === 'weak' ? specialQuestions.length : level?.questions.length || 0;
    const score = mode === 'blitz' ? blitzScore : lCorrect;
    const scoreTitle = mode === 'blitz'
      ? (blitzScore >= 10 ? 'Blazing! ⚡' : blitzScore >= 5 ? 'Good Run!' : 'Keep Practicing')
      : (score === totalQs ? 'Perfect! 🏆' : score >= totalQs * 0.8 ? 'Excellent! 🌟' : score >= totalQs * 0.6 ? 'Good Job! 👍' : 'Keep Going!');

    const scorePct = totalQs > 0 ? Math.round(score / totalQs * 100) : 0;

    return (
      <SafeAreaView style={[styles.completeBg, { backgroundColor: T.bg }]}>
        <LinearGradient colors={['rgba(0,180,166,0.15)', 'transparent']} style={StyleSheet.absoluteFill} />
        <View style={styles.completeInner}>
          <Text style={styles.completeMedal}>{scorePct >= 90 ? '🏆' : scorePct >= 70 ? '🌟' : '📖'}</Text>
          <Text style={[styles.completeTitle, { color: T.tx }]}>{scoreTitle}</Text>
          <Text style={[styles.completeSub, { color: T.tx2 }]}>
            {mode === 'blitz' ? `${blitzScore} correct in 60 seconds!` : `${score} of ${totalQs} questions correct`}
          </Text>
          <View style={styles.completeStats}>
            {[
              { val: `${scorePct}%`, lbl: 'Score' },
              { val: score, lbl: 'Correct' },
              { val: `+${xpEarned}`, lbl: 'XP' },
            ].map(s => (
              <View key={s.lbl} style={[styles.cstat, { backgroundColor: T.surface, borderColor: T.border }]}>
                <Text style={[styles.cstatV, { color: T.teal }]}>{s.val}</Text>
                <Text style={[styles.cstatL, { color: T.tx3 }]}>{s.lbl}</Text>
              </View>
            ))}
          </View>
          <TouchableOpacity style={styles.cBtn} onPress={() => navigation.goBack()}>
            <LinearGradient colors={['#00D4C0', '#00B4A6']} style={styles.cBtnGrad}>
              <Text style={styles.cBtnTxt}>Continue →</Text>
            </LinearGradient>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.cBtnGhost, { borderColor: T.border }]} onPress={() => navigation.navigate('Home', { screen: 'Map' })}>
            <Text style={[styles.cBtnGhostTxt, { color: T.tx2 }]}>View Map</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  // ─── Main lesson render ──────────────────────────────────────

  const q = getCurrentQuestion();
  const isTraining = mode === 'normal' && phase === 'train';
  const continueBtnEnabled = isTraining || answered;
  const continueBtnLabel = isTraining
    ? (slideIdx < (level?.training.length || 1) - 1 ? 'Continue →' : 'Start Quiz →')
    : (mode !== 'normal' ? 'Next →' : slideIdx < (level?.questions.length || 1) - 1 ? 'Continue →' : 'Finish →');

  // blitz time color
  const timeColor = blitzTimeLeft <= 10 ? T.err : blitzTimeLeft <= 20 ? T.gold : T.ok;

  return (
    <SafeAreaView style={[styles.root, { backgroundColor: T.bg }]}>
      {/* Header */}
      <LinearGradient colors={topicColors} style={styles.lessonHeader}>
        <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
          <Text style={{ color: 'rgba(255,255,255,0.8)', fontSize: 18 }}>‹</Text>
        </TouchableOpacity>
        <View style={styles.progressWrap}>
          <View style={styles.progressRail}>
            <View style={[styles.progressFill, { width: `${progress * 100}%` }]} />
          </View>
        </View>
        {/* Energy or blitz timer */}
        {mode === 'blitz' ? (
          <View style={styles.blitzTimer}>
            <Text style={[styles.blitzTimerTxt, { color: timeColor }]}>{blitzTimeLeft}</Text>
          </View>
        ) : (
          <View style={styles.energyRow}>
            {Array.from({ length: state.maxEnergy }).map((_, i) => (
              <View key={i} style={[styles.energyPip, i < state.energy && styles.energyPipOn]} />
            ))}
          </View>
        )}
      </LinearGradient>

      {/* Content */}
      <View style={{ flex: 1 }}>
        {isTraining
          ? renderTraining()
          : q?.type === 'match'
            ? renderMatch(q)
            : renderMCQ(q)
        }
      </View>

      {/* Feedback bar */}
      {feedback && (
        <Animated.View
          style={[
            styles.feedbackBar,
            { backgroundColor: feedback.ok ? T.okBg : T.errBg, borderColor: feedback.ok ? T.ok : T.err },
            {
              transform: [{
                translateY: feedbackAnim.interpolate({ inputRange: [0, 1], outputRange: [80, 0] })
              }]
            }
          ]}
        >
          <Text style={[styles.fbIcon, { color: feedback.ok ? T.ok : T.err }]}>{feedback.ok ? '✓' : '✗'}</Text>
          <View style={{ flex: 1 }}>
            <Text style={[styles.fbTitle, { color: feedback.ok ? T.ok : T.err }]}>{feedback.title}</Text>
            {feedback.body ? <Text style={[styles.fbBody, { color: T.tx2 }]}>{feedback.body}</Text> : null}
          </View>
        </Animated.View>
      )}

      {/* Continue button */}
      {continueBtnEnabled && (
        <View style={[styles.continueBtnWrap, { backgroundColor: T.bg }]}>
          <TouchableOpacity style={styles.continueBtn} onPress={advanceSlide}>
            <LinearGradient colors={topicColors} style={styles.continueBtnGrad}>
              <Text style={styles.continueBtnTxt}>{continueBtnLabel}</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1 },
  lessonHeader: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 16, paddingTop: 12, paddingBottom: 14, gap: 12 },
  backBtn: { width: 32, height: 32, borderRadius: 100, backgroundColor: 'rgba(255,255,255,0.2)', alignItems: 'center', justifyContent: 'center' },
  progressWrap: { flex: 1 },
  progressRail: { height: 6, backgroundColor: 'rgba(255,255,255,0.25)', borderRadius: 100, overflow: 'hidden' },
  progressFill: { height: 6, backgroundColor: 'rgba(255,255,255,0.85)', borderRadius: 100 },
  energyRow: { flexDirection: 'row', gap: 4 },
  energyPip: { width: 10, height: 10, borderRadius: 100, backgroundColor: 'rgba(255,255,255,0.3)' },
  energyPipOn: { backgroundColor: '#FFB830' },
  blitzTimer: { width: 40, height: 40, borderRadius: 100, backgroundColor: 'rgba(255,255,255,0.2)', alignItems: 'center', justifyContent: 'center' },
  blitzTimerTxt: { fontSize: 14, fontWeight: '800' },

  // Training
  trainScroll: { padding: 20, paddingBottom: 120 },
  factImgWrap: { borderRadius: 20, overflow: 'hidden', marginBottom: 20, height: 200 },
  factImg: { width: '100%', height: '100%' },
  factImgOverlay: { ...StyleSheet.absoluteFillObject },
  factBadge: { position: 'absolute', bottom: 12, left: 12, backgroundColor: 'rgba(0,0,0,0.5)', borderRadius: 100, paddingHorizontal: 10, paddingVertical: 4 },
  factBadgeTxt: { color: '#fff', fontSize: 11, fontWeight: '700' },
  factBody: { gap: 10 },
  factTitle: { fontSize: 20, fontWeight: '800', lineHeight: 26 },
  factText: { fontSize: 14, fontWeight: '500', lineHeight: 22 },
  factHL: { borderRadius: 14, padding: 14, borderWidth: 1.5 },
  factHLTxt: { fontSize: 13, fontWeight: '600', lineHeight: 20 },

  // Quiz
  quizScroll: { padding: 20, paddingBottom: 140 },
  qBadge: { alignSelf: 'flex-start', borderRadius: 100, paddingHorizontal: 14, paddingVertical: 5, marginBottom: 14 },
  qBadgeTxt: { fontSize: 11, fontWeight: '700', letterSpacing: 0.5 },
  qText: { fontSize: 18, fontWeight: '700', lineHeight: 26, marginBottom: 20 },
  opts: { gap: 10 },
  opt: { flexDirection: 'row', alignItems: 'center', gap: 12, padding: 14, borderRadius: 14, borderWidth: 1.5 },
  optLabel: { width: 30, height: 30, borderRadius: 100, alignItems: 'center', justifyContent: 'center' },
  optLabelTxt: { fontSize: 12, fontWeight: '800' },
  optTxt: { flex: 1, fontSize: 14, fontWeight: '600', lineHeight: 20 },

  // Match
  matchGrid: { flexDirection: 'row', gap: 10 },
  matchCol: { flex: 1, gap: 8 },
  matchColLbl: { fontSize: 9, fontWeight: '700', letterSpacing: 1, textTransform: 'uppercase', marginBottom: 4 },
  matchItem: { borderWidth: 1.5, borderRadius: 12, padding: 10, minHeight: 48, justifyContent: 'center' },
  matchItemTxt: { fontSize: 12, fontWeight: '600', lineHeight: 16, textAlign: 'center' },

  // Feedback
  feedbackBar: {
    position: 'absolute', bottom: 80, left: 16, right: 16,
    flexDirection: 'row', alignItems: 'flex-start', gap: 12,
    borderRadius: 16, padding: 14, borderWidth: 1.5,
    shadowColor: '#000', shadowOpacity: 0.1, shadowRadius: 8, elevation: 4,
  },
  fbIcon: { fontSize: 22, fontWeight: '800', marginTop: 1 },
  fbTitle: { fontSize: 14, fontWeight: '800', marginBottom: 3 },
  fbBody: { fontSize: 12, fontWeight: '500', lineHeight: 18 },

  // Continue
  continueBtnWrap: { position: 'absolute', bottom: 0, left: 0, right: 0, padding: 16, paddingBottom: 28 },
  continueBtn: { borderRadius: 14, overflow: 'hidden' },
  continueBtnGrad: { paddingVertical: 15, alignItems: 'center' },
  continueBtnTxt: { color: '#fff', fontSize: 15, fontWeight: '800', letterSpacing: 0.3 },

  // Complete
  completeBg: { flex: 1 },
  completeInner: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 24 },
  completeMedal: { fontSize: 72, marginBottom: 16 },
  completeTitle: { fontSize: 30, fontWeight: '800', textAlign: 'center', marginBottom: 8 },
  completeSub: { fontSize: 14, fontWeight: '500', textAlign: 'center', marginBottom: 28 },
  completeStats: { flexDirection: 'row', gap: 12, marginBottom: 28 },
  cstat: { flex: 1, borderRadius: 16, padding: 16, alignItems: 'center', borderWidth: 1 },
  cstatV: { fontSize: 22, fontWeight: '800', marginBottom: 4 },
  cstatL: { fontSize: 11, fontWeight: '700', letterSpacing: 0.5 },
  cBtn: { width: '100%', borderRadius: 14, overflow: 'hidden', marginBottom: 10 },
  cBtnGrad: { paddingVertical: 15, alignItems: 'center' },
  cBtnTxt: { color: '#fff', fontSize: 15, fontWeight: '800' },
  cBtnGhost: { width: '100%', paddingVertical: 14, alignItems: 'center', borderRadius: 14, borderWidth: 1.5 },
  cBtnGhostTxt: { fontSize: 14, fontWeight: '700' },
});
