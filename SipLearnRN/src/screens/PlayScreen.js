import React, { useState } from 'react';
import {
  View, Text, ScrollView, TouchableOpacity,
  StyleSheet, Dimensions
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useApp } from '../context/AppContext';
import { LIGHT, DARK, getLevel, getNextLevel, getLevelPct, CAT_EMOJIS, CAT_GRADIENTS } from '../theme';
import CONTENT from '../data/content';

const { width } = Dimensions.get('window');

export default function PlayScreen({ navigation }) {
  const { state } = useApp();
  const T = state.nightMode ? DARK : LIGHT;
  const [openCat, setOpenCat] = useState(null);

  const lv = getLevel(state.xpTotal);
  const nxt = getNextLevel(state.xpTotal);
  const pct = getLevelPct(state.xpTotal);

  const h = new Date().getHours();
  const greet = h < 12 ? 'Good Morning ☀️' : h < 17 ? 'Good Afternoon 🌤️' : 'Good Evening 🌙';

  function toggleCat(catKey) {
    setOpenCat(openCat === catKey ? null : catKey);
  }

  function startLevel(catKey, topicKey, levelId) {
    if (state.energy <= 0) {
      // TODO: open energy modal — for now just show alert
      navigation.navigate('Lesson', { catKey, topicKey, levelId, mode: 'normal' });
      return;
    }
    navigation.navigate('Lesson', { catKey, topicKey, levelId, mode: 'normal' });
  }

  function startBlitz() {
    navigation.navigate('Lesson', { mode: 'blitz' });
  }

  function startDailyChallenge() {
    if (state.dailyChallengeUsed) return;
    navigation.navigate('Lesson', { mode: 'daily' });
  }

  function startWeakAreas() {
    if (!state.weakAreas.length) return;
    navigation.navigate('Lesson', { mode: 'weak' });
  }

  return (
    <View style={[styles.root, { backgroundColor: T.bg }]}>
      <ScrollView contentContainerStyle={{ padding: 20, paddingBottom: 100 }}>
        {/* Header */}
        <View style={styles.header}>
          <View style={[styles.streakChip, { backgroundColor: T.surface, borderColor: 'rgba(255,184,48,0.35)' }]}>
            <Text style={{ fontSize: 18 }}>🔥</Text>
            <View>
              <Text style={[styles.streakCount, { color: T.gold }]}>{state.streak}</Text>
              <Text style={[styles.streakLabel, { color: T.tx3 }]}>STREAK</Text>
            </View>
          </View>
          <TouchableOpacity
            style={[styles.profileBtn, { backgroundColor: T.surface, borderColor: T.border }]}
            onPress={() => navigation.navigate('Profile')}
          >
            <Text style={{ fontSize: 20 }}>{state.user?.av || '☕'}</Text>
          </TouchableOpacity>
        </View>

        {/* XP Bar */}
        <View style={[styles.xpBar, { backgroundColor: T.surface, borderColor: T.border }]}>
          <View style={styles.xpTop}>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
              <Text style={[styles.xpLabel, { color: T.tx }]}>{lv.label}</Text>
              <Text style={[styles.xpSub, { color: T.tx3 }]}>{state.xpTotal.toLocaleString()} XP</Text>
            </View>
            <View style={[styles.lvlBadge, { backgroundColor: T.teal }]}>
              <Text style={styles.lvlBadgeTxt}>Lvl {lv.lvl}</Text>
            </View>
          </View>
          <View style={[styles.xpRail, { backgroundColor: T.bg2 }]}>
            <LinearGradient
              colors={['#00D4C0', '#00B4A6']}
              start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
              style={[styles.xpFill, { width: `${pct}%` }]}
            />
          </View>
          {nxt ? (
            <Text style={[styles.xpNext, { color: T.tx3 }]}>{nxt.min - state.xpTotal} XP to {nxt.label}</Text>
          ) : (
            <Text style={[styles.xpNext, { color: T.gold }]}>Max Level! 🏆</Text>
          )}
        </View>

        {/* Greeting */}
        <Text style={[styles.greet, { color: T.tx }]}>{greet}</Text>

        {/* Special Modes */}
        <Text style={[styles.sectionLabel, { color: T.tx3 }]}>Special Modes</Text>
        <View style={styles.modeGrid}>
          <TouchableOpacity style={[styles.modeCard, styles.modeBlitz]} onPress={startBlitz}>
            <LinearGradient colors={['#FF8C8C', '#FF6B6B']} style={styles.modeGrad}>
              <Text style={styles.modeIco}>⚡</Text>
              <Text style={styles.modeTitle}>60 Sec Blitz</Text>
              <Text style={styles.modeSub}>Rapid-fire questions</Text>
              <View style={styles.modeBadge}><Text style={styles.modeBadgeTxt}>HOT</Text></View>
            </LinearGradient>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.modeCard]} onPress={startDailyChallenge}>
            <LinearGradient colors={['#FFD700', '#FFB830']} style={styles.modeGrad}>
              <Text style={styles.modeIco}>📅</Text>
              <Text style={styles.modeTitle}>Daily Challenge</Text>
              <Text style={styles.modeSub}>{state.dailyChallengeUsed ? 'Come back tomorrow!' : 'Mixed · Once/day'}</Text>
              {state.dailyChallengeUsed && <View style={[styles.modeBadge, { backgroundColor: 'rgba(0,0,0,0.2)' }]}><Text style={styles.modeBadgeTxt}>DONE</Text></View>}
            </LinearGradient>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.modeCard, styles.modeWide]} onPress={startWeakAreas}>
            <LinearGradient colors={['#7C6EE8', '#A090FF']} style={styles.modeGrad}>
              <Text style={styles.modeIco}>🎯</Text>
              <Text style={styles.modeTitle}>Weak Areas Practice</Text>
              <Text style={styles.modeSub}>{state.weakAreas.length ? `${state.weakAreas.length} questions to review` : 'Complete levels to unlock'}</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>

        {/* Categories */}
        <Text style={[styles.sectionLabel, { color: T.tx3, marginTop: 4 }]}>Categories</Text>
        {Object.entries(CONTENT).map(([catKey, cat]) => {
          const totalL = Object.values(cat.topics).reduce((s, t) => s + t.levels.length, 0);
          const doneL = Object.values(cat.topics).reduce((s, t) => s + t.levels.filter(l => state.prog[l.id] === 'complete').length, 0);
          const isOpen = openCat === catKey;
          const gradColors = CAT_GRADIENTS[catKey] || ['#333', '#555'];

          return (
            <View key={catKey} style={styles.catWrap}>
              <TouchableOpacity onPress={() => toggleCat(catKey)}>
                <LinearGradient colors={gradColors} style={styles.catCard}>
                  <View style={{ flex: 1 }}>
                    <Text style={styles.catEmoji}>{CAT_EMOJIS[catKey] || '📚'}</Text>
                    <Text style={styles.catEyebrow}>Category</Text>
                    <Text style={styles.catTitle}>{cat.label}</Text>
                    <Text style={styles.catMeta}>{doneL}/{totalL} levels complete</Text>
                  </View>
                  <Text style={[styles.catArrow, { transform: [{ rotate: isOpen ? '90deg' : '0deg' }] }]}>›</Text>
                </LinearGradient>
              </TouchableOpacity>

              {isOpen && (
                <View style={[styles.topicsPanel, { backgroundColor: T.bg2, borderColor: T.border }]}>
                  {Object.entries(cat.topics).map(([topicKey, topic]) => (
                    <View key={topicKey}>
                      <Text style={[styles.topicLabel, { color: T.tx3 }]}>{topic.label}</Text>
                      {topic.levels.map((l, i) => {
                        const lvlState = state.prog[l.id] || 'locked';
                        const isDone = lvlState === 'complete';
                        const isLocked = lvlState === 'locked';
                        return (
                          <TouchableOpacity
                            key={l.id}
                            style={[styles.lvlRow, { backgroundColor: T.surface, borderColor: T.border }, isDone && { borderColor: T.teal }, isLocked && { opacity: 0.5 }]}
                            onPress={() => !isLocked && startLevel(catKey, topicKey, l.id)}
                            disabled={isLocked}
                          >
                            <View style={[styles.lvlNum, { backgroundColor: isDone ? T.teal : T.bg3 }]}>
                              <Text style={[styles.lvlNumTxt, { color: isDone ? '#fff' : T.tx3 }]}>{isDone ? '✓' : i + 1}</Text>
                            </View>
                            <View style={{ flex: 1 }}>
                              <Text style={[styles.lvlName, { color: T.tx }]}>{l.name}</Text>
                              <Text style={[styles.lvlSub, { color: T.tx3 }]}>{l.sub}</Text>
                            </View>
                            {isLocked ? (
                              <Text style={{ color: T.tx3, fontSize: 14 }}>🔒</Text>
                            ) : (
                              <View style={[styles.lvlBadgeSmall, { backgroundColor: isDone ? T.okBg : T.tealBg }]}>
                                <Text style={[styles.lvlBadgeSmallTxt, { color: isDone ? T.ok : T.teal }]}>{isDone ? 'Done' : 'Start'}</Text>
                              </View>
                            )}
                          </TouchableOpacity>
                        );
                      })}
                    </View>
                  ))}
                </View>
              )}
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 },
  streakChip: { flexDirection: 'row', alignItems: 'center', gap: 7, borderWidth: 1.5, borderRadius: 100, paddingHorizontal: 12, paddingVertical: 7 },
  streakCount: { fontSize: 16, fontWeight: '800' },
  streakLabel: { fontSize: 8, fontWeight: '700', letterSpacing: 0.8 },
  profileBtn: { width: 40, height: 40, borderRadius: 12, borderWidth: 1.5, alignItems: 'center', justifyContent: 'center' },
  xpBar: { borderRadius: 16, padding: 14, borderWidth: 1, marginBottom: 18 },
  xpTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 },
  xpLabel: { fontSize: 13, fontWeight: '700' },
  xpSub: { fontSize: 11, fontWeight: '500' },
  lvlBadge: { borderRadius: 100, paddingHorizontal: 10, paddingVertical: 4 },
  lvlBadgeTxt: { color: '#fff', fontSize: 11, fontWeight: '800' },
  xpRail: { height: 8, borderRadius: 100, overflow: 'hidden' },
  xpFill: { height: 8, borderRadius: 100 },
  xpNext: { fontSize: 10, fontWeight: '600', marginTop: 6, textAlign: 'right' },
  greet: { fontSize: 22, fontWeight: '700', marginBottom: 16 },
  sectionLabel: { fontSize: 10, fontWeight: '700', letterSpacing: 1, textTransform: 'uppercase', marginBottom: 10 },
  modeGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 10, marginBottom: 16 },
  modeCard: { flex: 1, minWidth: (width - 50) / 2, borderRadius: 16, overflow: 'hidden' },
  modeWide: { width: '100%', flex: 0 },
  modeGrad: { padding: 16, minHeight: 100 },
  modeIco: { fontSize: 24, marginBottom: 6 },
  modeTitle: { color: '#fff', fontSize: 13, fontWeight: '700', marginBottom: 3 },
  modeSub: { color: 'rgba(255,255,255,0.8)', fontSize: 11, fontWeight: '500' },
  modeBadge: { position: 'absolute', top: 10, right: 10, backgroundColor: 'rgba(255,255,255,0.25)', borderRadius: 100, paddingHorizontal: 8, paddingVertical: 2 },
  modeBadgeTxt: { color: '#fff', fontSize: 9, fontWeight: '800', letterSpacing: 0.6 },
  catWrap: { marginBottom: 10 },
  catCard: { borderRadius: 18, padding: 18, flexDirection: 'row', alignItems: 'center' },
  catEmoji: { fontSize: 28, marginBottom: 4 },
  catEyebrow: { color: 'rgba(255,255,255,0.7)', fontSize: 9, fontWeight: '700', letterSpacing: 1, textTransform: 'uppercase' },
  catTitle: { color: '#fff', fontSize: 18, fontWeight: '800', marginBottom: 3 },
  catMeta: { color: 'rgba(255,255,255,0.75)', fontSize: 11, fontWeight: '600' },
  catArrow: { color: '#fff', fontSize: 28, fontWeight: '300' },
  topicsPanel: { borderWidth: 1, borderTopWidth: 0, borderRadius: 18, borderTopLeftRadius: 0, borderTopRightRadius: 0, padding: 14 },
  topicLabel: { fontSize: 9, fontWeight: '700', letterSpacing: 1, textTransform: 'uppercase', paddingVertical: 8, paddingHorizontal: 4 },
  lvlRow: { flexDirection: 'row', alignItems: 'center', gap: 12, padding: 14, borderRadius: 14, borderWidth: 1.5, marginBottom: 8 },
  lvlNum: { width: 32, height: 32, borderRadius: 100, alignItems: 'center', justifyContent: 'center' },
  lvlNumTxt: { fontSize: 12, fontWeight: '800' },
  lvlName: { fontSize: 14, fontWeight: '700', marginBottom: 2 },
  lvlSub: { fontSize: 11, fontWeight: '500' },
  lvlBadgeSmall: { borderRadius: 100, paddingHorizontal: 10, paddingVertical: 4 },
  lvlBadgeSmallTxt: { fontSize: 11, fontWeight: '800' },
});
