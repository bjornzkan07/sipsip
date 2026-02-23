import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useApp } from '../context/AppContext';
import { LIGHT, DARK } from '../theme';

export default function PracticeScreen({ navigation }) {
  const { state } = useApp();
  const T = state.nightMode ? DARK : LIGHT;

  const levels = Object.values(state.completed);

  function startWeakAreas() {
    if (!state.weakAreas.length) return;
    navigation.navigate('Lesson', { mode: 'weak' });
  }

  if (!levels.length && !state.weakAreas.length) {
    return (
      <View style={[styles.root, { backgroundColor: T.bg }]}>
        <View style={styles.empty}>
          <Text style={styles.emptyIco}>⏱️</Text>
          <Text style={[styles.emptyTitle, { color: T.tx }]}>No history yet</Text>
          <Text style={[styles.emptyBody, { color: T.tx2 }]}>Complete your first lesson{'\n'}and your progress will appear here.</Text>
          <TouchableOpacity style={styles.emptyBtn} onPress={() => navigation.navigate('Play')}>
            <LinearGradient colors={['#00D4C0', '#00B4A6']} style={styles.emptyBtnGrad}>
              <Text style={styles.emptyBtnTxt}>Start Learning</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  const TOPIC_ICONS = {
    coffee: '☕', wine: '🍷', tv: '📺', ancient: '🏛️',
    modern: '🗓️', classical: '🎨', modern_art: '🖼️',
    countries: '🗺️', landmarks: '🗽',
  };

  const TOPIC_COLORS = {
    coffee: ['#6B3300', '#C04000'],
    wine: ['#4A0020', '#8B0040'],
    tv: ['#1A0040', '#4A20B0'],
    ancient: ['#8B2000', '#D44000'],
    modern: ['#3B0060', '#7020C0'],
    classical: ['#003060', '#0060B0'],
    modern_art: ['#560080', '#A020D0'],
    countries: ['#003880', '#0060C8'],
    landmarks: ['#006040', '#00A070'],
  };

  return (
    <View style={[styles.root, { backgroundColor: T.bg }]}>
      <ScrollView contentContainerStyle={{ padding: 20, paddingBottom: 100 }}>
        {/* Completed Levels */}
        {levels.length > 0 && (
          <>
            <Text style={[styles.sectionHead, { color: T.tx }]}>Completed Levels</Text>
            {levels.map((l, idx) => {
              const sc = Math.round((l.correct / l.total) * 100);
              const colors = TOPIC_COLORS[l.topic] || TOPIC_COLORS.tv;
              const ico = TOPIC_ICONS[l.topic] || '📖';
              return (
                <View key={idx} style={[styles.histItem, { backgroundColor: T.surface, borderColor: T.border }]}>
                  <LinearGradient colors={colors} style={styles.histIco}>
                    <Text style={{ fontSize: 18 }}>{ico}</Text>
                  </LinearGradient>
                  <View style={styles.histInfo}>
                    <Text style={[styles.histName, { color: T.tx }]}>{l.name}</Text>
                    <Text style={[styles.histMeta, { color: T.tx3 }]}>{l.date} · {l.correct}/{l.total} correct</Text>
                  </View>
                  <View style={[styles.scoreChip, {
                    backgroundColor: sc >= 80 ? T.okBg : sc >= 60 ? T.goldBg : T.errBg,
                    borderColor: sc >= 80 ? T.ok : sc >= 60 ? T.gold : T.err,
                  }]}>
                    <Text style={[styles.scoreChipTxt, { color: sc >= 80 ? T.ok : sc >= 60 ? T.gold : T.err }]}>{sc}%</Text>
                  </View>
                </View>
              );
            })}
          </>
        )}

        {/* Weak Areas */}
        {state.weakAreas.length > 0 && (
          <>
            <Text style={[styles.sectionHead, { color: T.tx, marginTop: 24 }]}>
              Mistakes to Practice ({state.weakAreas.length})
            </Text>
            {state.weakAreas.slice(0, 8).map((m, i) => (
              <View key={i} style={[styles.mistakeCard, { backgroundColor: T.surface, borderColor: T.errBg }]}>
                <Text style={[styles.mistakeQ, { color: T.tx }]}>{m.q}</Text>
                <Text style={[styles.mistakeWrong, { color: T.err }]}>✗ {m.ya}</Text>
                <Text style={[styles.mistakeRight, { color: T.ok }]}>✓ {m.ca}</Text>
              </View>
            ))}
            <TouchableOpacity style={styles.practiceBtn} onPress={startWeakAreas}>
              <LinearGradient colors={['#FF8C8C', '#FF6B6B']} style={styles.practiceBtnGrad}>
                <Text style={styles.practiceBtnTxt}>Practice All {state.weakAreas.length} Weak Areas 🎯</Text>
              </LinearGradient>
            </TouchableOpacity>
          </>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1 },
  empty: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 40 },
  emptyIco: { fontSize: 48, marginBottom: 14 },
  emptyTitle: { fontSize: 22, fontWeight: '800', marginBottom: 8, textAlign: 'center' },
  emptyBody: { fontSize: 14, fontWeight: '500', textAlign: 'center', lineHeight: 22, marginBottom: 24 },
  emptyBtn: { borderRadius: 14, overflow: 'hidden', width: '100%' },
  emptyBtnGrad: { paddingVertical: 14, alignItems: 'center' },
  emptyBtnTxt: { color: '#fff', fontSize: 15, fontWeight: '700' },
  sectionHead: { fontSize: 16, fontWeight: '800', marginBottom: 14 },
  histItem: { flexDirection: 'row', alignItems: 'center', gap: 12, padding: 14, borderRadius: 16, borderWidth: 1, marginBottom: 10 },
  histIco: { width: 44, height: 44, borderRadius: 12, alignItems: 'center', justifyContent: 'center' },
  histInfo: { flex: 1 },
  histName: { fontSize: 14, fontWeight: '700', marginBottom: 3 },
  histMeta: { fontSize: 11, fontWeight: '500' },
  scoreChip: { borderRadius: 100, paddingHorizontal: 10, paddingVertical: 4, borderWidth: 1 },
  scoreChipTxt: { fontSize: 13, fontWeight: '800' },
  mistakeCard: { borderRadius: 14, padding: 14, marginBottom: 10, borderWidth: 1.5 },
  mistakeQ: { fontSize: 13, fontWeight: '700', marginBottom: 6, lineHeight: 18 },
  mistakeWrong: { fontSize: 12, fontWeight: '600', marginBottom: 3 },
  mistakeRight: { fontSize: 12, fontWeight: '600' },
  practiceBtn: { borderRadius: 14, overflow: 'hidden', marginTop: 4 },
  practiceBtnGrad: { paddingVertical: 14, alignItems: 'center' },
  practiceBtnTxt: { color: '#fff', fontSize: 14, fontWeight: '800' },
});
