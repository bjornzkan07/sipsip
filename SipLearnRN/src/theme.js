export const LIGHT = {
  teal: '#00B4A6',
  tealD: '#008C82',
  tealBg: 'rgba(0,180,166,0.12)',
  tealBg2: 'rgba(0,180,166,0.22)',
  gold: '#FFB830',
  goldD: '#D4900A',
  goldBg: 'rgba(255,184,48,0.14)',
  coral: '#FF6B6B',
  coralD: '#D94040',
  violet: '#7C6EE8',
  bg: '#EEF9F8',
  bg2: '#E2F4F3',
  bg3: '#D3ECEB',
  surface: '#FFFFFF',
  border: 'rgba(0,180,166,0.18)',
  border2: 'rgba(0,180,166,0.3)',
  tx: '#0B2D2B',
  tx2: '#2A6862',
  tx3: '#6AAAA4',
  ok: '#10B981',
  okBg: 'rgba(16,185,129,0.12)',
  err: '#EF4444',
  errBg: 'rgba(239,68,68,0.1)',
};

export const DARK = {
  teal: '#00B4A6',
  tealD: '#008C82',
  tealBg: 'rgba(0,180,166,0.15)',
  tealBg2: 'rgba(0,180,166,0.25)',
  gold: '#FFB830',
  goldD: '#D4900A',
  goldBg: 'rgba(255,184,48,0.14)',
  coral: '#FF6B6B',
  coralD: '#D94040',
  violet: '#7C6EE8',
  bg: '#08181A',
  bg2: '#0E2628',
  bg3: '#163335',
  surface: '#0E2628',
  border: 'rgba(0,180,166,0.20)',
  border2: 'rgba(0,180,166,0.35)',
  tx: '#D4F5F2',
  tx2: '#7ECDC7',
  tx3: '#3A8A84',
  ok: '#10B981',
  okBg: 'rgba(16,185,129,0.12)',
  err: '#EF4444',
  errBg: 'rgba(239,68,68,0.1)',
};

export const CAT_GRADIENTS = {
  gastronomy: ['#6B3300', '#C04000'],
  popculture: ['#3B0069', '#8B10C9'],
  history:    ['#8B2000', '#D44000'],
  art:        ['#560080', '#A020D0'],
  geography:  ['#003880', '#0060C8'],
};

export const CAT_EMOJIS = {
  gastronomy: '🍽️',
  popculture: '🎬',
  history:    '🏛️',
  art:        '🎨',
  geography:  '🗺️',
};

export const LEVELS_XP = [
  { lvl: 1,  min: 0,    label: 'Novice' },
  { lvl: 2,  min: 200,  label: 'Apprentice' },
  { lvl: 3,  min: 500,  label: 'Explorer' },
  { lvl: 4,  min: 900,  label: 'Scholar' },
  { lvl: 5,  min: 1400, label: 'Connoisseur' },
  { lvl: 6,  min: 2000, label: 'Expert' },
  { lvl: 7,  min: 2800, label: 'Master' },
  { lvl: 8,  min: 3800, label: 'Virtuoso' },
  { lvl: 9,  min: 5000, label: 'Sage' },
  { lvl: 10, min: 7000, label: 'Legend' },
];

export function getLevel(xp) {
  let cur = LEVELS_XP[0];
  for (const l of LEVELS_XP) { if (xp >= l.min) cur = l; }
  return cur;
}

export function getNextLevel(xp) {
  const cur = getLevel(xp);
  return LEVELS_XP.find(l => l.lvl === cur.lvl + 1) || null;
}

export function getLevelPct(xp) {
  const cur = getLevel(xp), nxt = getNextLevel(xp);
  if (!nxt) return 100;
  return Math.round((xp - cur.min) / (nxt.min - cur.min) * 100);
}

export const AVLIST = ['☕','🍷','🎩','🌿','🍵','🦋','🌹','📺','🎬','🧑‍🍳','🌺','🎭','🏛️','🗺️','🎨'];

export const ACHIEVEMENTS = [
  { id: 'first_win',   emoji: '🏆', label: 'First Win',   desc: 'Complete your first level' },
  { id: 'streak_3',    emoji: '🔥', label: 'On Fire',     desc: '3-day streak' },
  { id: 'streak_7',    emoji: '🌟', label: 'Weekly',      desc: '7-day streak' },
  { id: 'xp_500',      emoji: '⚡', label: 'XP Hunter',   desc: 'Earn 500 XP' },
  { id: 'xp_1000',     emoji: '💎', label: 'Gem',         desc: 'Earn 1,000 XP' },
  { id: 'levels_5',    emoji: '🎓', label: 'Scholar',     desc: 'Complete 5 levels' },
  { id: 'levels_10',   emoji: '🏅', label: 'Expert',      desc: 'Complete 10 levels' },
  { id: 'social_link', emoji: '🔗', label: 'Connected',   desc: 'Link an account' },
];

export const GLOBAL_LB = [
  { n: 'Lucien Beaumont', un: '@lucien_b',    av: '🎩', xp: 12400, str: 42 },
  { n: 'Rafael Morales',  un: '@raf_vino',    av: '🌹', xp: 10200, str: 38 },
  { n: 'Julia Strauss',   un: '@julia_w',     av: '🎨', xp: 9800,  str: 31 },
  { n: 'Marco Ferretti',  un: '@marco_vino',  av: '🍷', xp: 8650,  str: 22 },
  { n: 'Yuki Hayashi',    un: '@yuki_knows',  av: '🌺', xp: 7900,  str: 19 },
  { n: 'Chris Baxter',    un: '@cbaxter',     av: '🎬', xp: 7100,  str: 15 },
  { n: 'Sophie Chen',     un: '@sophiebrews', av: '☕', xp: 6400,  str: 14 },
  { n: 'Aiko Tanaka',     un: '@aiko_sip',    av: '🌿', xp: 5300,  str: 11 },
  { n: 'Tom Garcia',      un: '@tomg',        av: '🧑‍🍳', xp: 4200, str: 8 },
  { n: 'Nina Patel',      un: '@ninapatel',   av: '🦋', xp: 3100,  str: 5 },
];

export const MOCK_FRIENDS = [
  { id: 'f1', n: 'Marco Ferretti',  un: '@marco_vino',  av: '🍷', xp: 3420, str: 12, added: false },
  { id: 'f2', n: 'Sophie Chen',     un: '@sophiebrews', av: '☕', xp: 2850, str: 8,  added: false },
  { id: 'f3', n: 'Lucien Beaumont', un: '@lucien_b',    av: '🎩', xp: 5100, str: 21, added: true  },
  { id: 'f4', n: 'Aiko Tanaka',     un: '@aiko_sip',    av: '🌿', xp: 1900, str: 4,  added: false },
  { id: 'f5', n: 'Rafael Morales',  un: '@raf_vino',    av: '🌹', xp: 4300, str: 15, added: true  },
];
