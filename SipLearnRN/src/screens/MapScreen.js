import React, { useState } from 'react';
import {
  View, Text, ScrollView, TouchableOpacity,
  StyleSheet, Dimensions, Modal
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useApp } from '../context/AppContext';
import { LIGHT, DARK, CAT_EMOJIS, CAT_GRADIENTS } from '../theme';
import CONTENT from '../data/content';

const { width } = Dimensions.get('window');

const MAP_THEMES = {
  gastronomy: { watermarks: '☕🍷🫖🍽️' },
  popculture: { watermarks: '🎬📺🎵🎮' },
  history:    { watermarks: '🏛️⚔️📜🗺️' },
  art:        { watermarks: '🎨🖼️✨🖌️' },
  geography:  { watermarks: '🌍🗺️🧭🌊' },
};

export default function MapScreen({ navigation }) {
  const { state } = useApp();
  const T = state.nightMode ? DARK : LIGHT;
  const cats = Object.keys(CONTENT);
  const [activeCat, setActiveCat] = useState(cats[0]);
  const [previewLevel, setPreviewLevel] = useState(null);

  const cat = CONTENT[activeCat];
  const theme = MAP_THEMES[activeCat] || { watermarks: '📖' };
  const gradColors = CAT_GRADIENTS[activeCat] || ['#333', '#555'];

  // Flatten levels for active category
  const levels = [];
  for (const topicKey in cat.topics) {
    cat.topics[topicKey].levels.forEach(l => levels.push({ ...l, topicKey, catKey: activeCat }));
  }

  const states = levels.map((l, i) => {
    const p = state.prog[l.id];
    if (p === 'complete') return 'done';
    if (p === 'unlocked' || i === 0 || state.prog[levels[i - 1]?.id] === 'complete') return 'active';
    return 'locked';
  });

  const done = states.filter(s => s === 'done').length;
  const total = levels.length;
  const pct = total ? Math.round(done / total * 100) : 0;

  function handleNodePress(l, i) {
    const lvlState = states[i];
    if (lvlState === 'locked') return;
    setPreviewLevel({ ...l, state: lvlState, idx: i });
  }

  function startLevel() {
    if (!previewLevel) return;
    setPreviewLevel(null);
    navigation.navigate('Lesson', {
      catKey: previewLevel.catKey,
      topicKey: previewLevel.topicKey,
      levelId: previewLevel.id,
      mode: 'normal',
    });
  }

  return (
    <View style={[styles.root, { backgroundColor: T.bg }]}>
      {/* Category tab strip */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.tabStrip}
        contentContainerStyle={{ padding: 14, gap: 8 }}
      >
        {cats.map(catId => (
          <TouchableOpacity
            key={catId}
            style={[
              styles.tab,
              { backgroundColor: T.bg2, borderColor: T.border },
              activeCat === catId && { backgroundColor: T.tealBg2, borderColor: T.teal },
            ]}
            onPress={() => setActiveCat(catId)}
          >
            <Text style={styles.tabIco}>{CAT_EMOJIS[catId]}</Text>
            <Text style={[styles.tabTxt, { color: activeCat === catId ? T.teal : T.tx2 }]}>
              {CONTENT[catId].label}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <ScrollView contentContainerStyle={{ paddingBottom: 100 }}>
        {/* Hero banner */}
        <View style={styles.heroWrap}>
          <LinearGradient colors={gradColors} style={styles.heroBanner}>
            <Text style={styles.heroTitle}>{CAT_EMOJIS[activeCat]} {cat.label}</Text>
            <Text style={styles.heroSub}>{done} of {total} levels complete</Text>
            <View style={styles.heroProg}>
              <View style={[styles.heroProgFill, { width: `${pct}%` }]} />
            </View>
          </LinearGradient>
        </View>

        {/* Nodes */}
        <View style={styles.nodesContainer}>
          {/* Watermark strip */}
          <Text style={styles.watermark} numberOfLines={3}>
            {(theme.watermarks + ' ').repeat(20)}
          </Text>

          {/* Connector line */}
          <View style={[styles.connectorLine, { backgroundColor: T.border }]} />

          {levels.map((l, i) => {
            const lvlState = states[i];
            const isLeft = i % 2 === 0;
            const isDone = lvlState === 'done';
            const isActive = lvlState === 'active';
            const isLocked = lvlState === 'locked';

            return (
              <View
                key={l.id}
                style={[styles.nodeRow, { justifyContent: isLeft ? 'flex-start' : 'flex-end' }]}
              >
                {/* Info label on opposite side */}
                {!isLeft && (
                  <View style={[styles.nodeInfo, styles.nodeInfoLeft]}>
                    <Text style={[styles.nodeName, { color: T.tx }]}>{l.name}</Text>
                    <Text style={[styles.nodeState, { color: isDone ? T.teal : isActive ? T.gold : T.tx3 }]}>
                      {isDone ? '✓ Done' : isActive ? '▶ Play now' : '🔒 Locked'}
                    </Text>
                  </View>
                )}

                <TouchableOpacity
                  onPress={() => handleNodePress(l, i)}
                  disabled={isLocked}
                  style={[
                    styles.node,
                    isDone && [styles.nodeDone, { shadowColor: T.teal }],
                    isActive && [styles.nodeActive, { shadowColor: T.gold }],
                    isLocked && styles.nodeLocked,
                    { marginHorizontal: isLeft ? 24 : 24 },
                  ]}
                  activeOpacity={0.8}
                >
                  {isDone && (
                    <LinearGradient colors={['#00D6A0', '#00B4A6']} style={styles.nodeGrad}>
                      <Text style={styles.nodeIcon}>✓</Text>
                    </LinearGradient>
                  )}
                  {isActive && (
                    <LinearGradient colors={['#FFD700', '#FFB830']} style={styles.nodeGrad}>
                      <Text style={styles.nodeIcon}>▶</Text>
                    </LinearGradient>
                  )}
                  {isLocked && (
                    <View style={[styles.nodeGrad, { backgroundColor: T.bg3 }]}>
                      <Text style={[styles.nodeIcon, { color: T.tx3 }]}>🔒</Text>
                    </View>
                  )}
                  {/* Step number badge */}
                  <View style={[styles.stepBadge, {
                    backgroundColor: isDone ? T.teal : isActive ? T.gold : T.bg3,
                  }]}>
                    <Text style={[styles.stepBadgeTxt, { color: isDone || isActive ? '#fff' : T.tx3 }]}>{i + 1}</Text>
                  </View>
                </TouchableOpacity>

                {/* Info label right side */}
                {isLeft && (
                  <View style={styles.nodeInfo}>
                    <Text style={[styles.nodeName, { color: T.tx }]}>{l.name}</Text>
                    <Text style={[styles.nodeState, { color: isDone ? T.teal : isActive ? T.gold : T.tx3 }]}>
                      {isDone ? '✓ Done' : isActive ? '▶ Play now' : '🔒 Locked'}
                    </Text>
                  </View>
                )}
              </View>
            );
          })}

          {/* End node */}
          <View style={styles.endNode}>
            <View style={[styles.endBadge, done === total && styles.endBadgeDone]}>
              <Text style={{ fontSize: 32 }}>{done === total ? '🏆' : '🎯'}</Text>
            </View>
            <Text style={[styles.endTitle, { color: T.tx }]}>{done === total ? `Mastered! ${CAT_EMOJIS[activeCat]}` : 'Keep Going!'}</Text>
            <Text style={[styles.endSub, { color: T.tx3 }]}>
              {done === total ? 'All levels complete in this category' : 'Complete the path to unlock the trophy'}
            </Text>
          </View>
        </View>
      </ScrollView>

      {/* Preview Modal */}
      <Modal transparent visible={!!previewLevel} animationType="slide" onRequestClose={() => setPreviewLevel(null)}>
        <TouchableOpacity style={styles.modalOverlay} activeOpacity={1} onPress={() => setPreviewLevel(null)}>
          <View style={[styles.modalSheet, { backgroundColor: T.surface, borderColor: T.border }]}>
            <View style={styles.sheetHandle} />
            <Text style={[styles.modalTitle, { color: T.tx }]}>{previewLevel?.name}</Text>
            <Text style={[styles.modalSub, { color: T.tx2 }]}>{previewLevel?.sub || 'Tap to begin this level'}</Text>
            <TouchableOpacity style={styles.modalBtn} onPress={startLevel}>
              <LinearGradient colors={['#00D4C0', '#00B4A6']} style={styles.modalBtnGrad}>
                <Text style={styles.modalBtnTxt}>{previewLevel?.state === 'done' ? '🔁 Replay Level' : '▶ Start Level'}</Text>
              </LinearGradient>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.modalBtnGhost, { borderColor: T.border }]} onPress={() => setPreviewLevel(null)}>
              <Text style={[styles.modalBtnGhostTxt, { color: T.tx3 }]}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1 },
  tabStrip: { flexGrow: 0 },
  tab: { flexDirection: 'row', alignItems: 'center', gap: 6, paddingHorizontal: 14, paddingVertical: 8, borderRadius: 100, borderWidth: 1.5 },
  tabIco: { fontSize: 15 },
  tabTxt: { fontSize: 12, fontWeight: '700' },
  heroWrap: { padding: 20, paddingBottom: 0 },
  heroBanner: { borderRadius: 20, padding: 18 },
  heroTitle: { color: '#fff', fontSize: 22, fontWeight: '800', marginBottom: 4 },
  heroSub: { color: 'rgba(255,255,255,0.75)', fontSize: 12, fontWeight: '600', marginBottom: 12 },
  heroProg: { height: 6, backgroundColor: 'rgba(255,255,255,0.25)', borderRadius: 100, overflow: 'hidden' },
  heroProgFill: { height: 6, backgroundColor: 'rgba(255,255,255,0.85)', borderRadius: 100 },
  nodesContainer: { position: 'relative', paddingVertical: 20 },
  watermark: { position: 'absolute', top: 20, left: 0, right: 0, fontSize: 60, opacity: 0.04, lineHeight: 80, letterSpacing: 16, flexWrap: 'wrap' },
  connectorLine: { position: 'absolute', top: 0, bottom: 0, left: width / 2 - 1.5, width: 3, borderRadius: 2 },
  nodeRow: { flexDirection: 'row', alignItems: 'center', paddingVertical: 12 },
  node: {
    width: 68, height: 68, borderRadius: 34,
    shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.4, shadowRadius: 10, elevation: 6,
  },
  nodeGrad: { width: '100%', height: '100%', borderRadius: 34, alignItems: 'center', justifyContent: 'center' },
  nodeDone: { borderWidth: 3, borderColor: 'rgba(0,180,166,0.35)' },
  nodeActive: { borderWidth: 3, borderColor: 'rgba(255,184,48,0.55)' },
  nodeLocked: { opacity: 0.45 },
  nodeIcon: { fontSize: 22, color: '#fff', fontWeight: '800' },
  stepBadge: { position: 'absolute', top: -2, right: -2, width: 22, height: 22, borderRadius: 11, alignItems: 'center', justifyContent: 'center' },
  stepBadgeTxt: { fontSize: 9, fontWeight: '800' },
  nodeInfo: { flex: 1, paddingHorizontal: 12 },
  nodeInfoLeft: { alignItems: 'flex-end' },
  nodeName: { fontSize: 13, fontWeight: '700', marginBottom: 2, lineHeight: 18 },
  nodeState: { fontSize: 11, fontWeight: '700' },
  endNode: { alignItems: 'center', paddingVertical: 24, paddingHorizontal: 20 },
  endBadge: { width: 72, height: 72, borderRadius: 22, backgroundColor: 'rgba(255,184,48,0.2)', alignItems: 'center', justifyContent: 'center', marginBottom: 10 },
  endBadgeDone: { backgroundColor: '#FFB830' },
  endTitle: { fontSize: 16, fontWeight: '700', textAlign: 'center', marginBottom: 4 },
  endSub: { fontSize: 12, fontWeight: '500', textAlign: 'center' },
  // Modal
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.6)', justifyContent: 'flex-end' },
  modalSheet: { borderTopLeftRadius: 28, borderTopRightRadius: 28, padding: 22, paddingBottom: 40, borderTopWidth: 1 },
  sheetHandle: { width: 40, height: 4, backgroundColor: '#ccc', borderRadius: 2, alignSelf: 'center', marginBottom: 20 },
  modalTitle: { fontSize: 22, fontWeight: '800', marginBottom: 6 },
  modalSub: { fontSize: 14, fontWeight: '500', lineHeight: 20, marginBottom: 20 },
  modalBtn: { borderRadius: 14, overflow: 'hidden', marginBottom: 10 },
  modalBtnGrad: { paddingVertical: 15, alignItems: 'center' },
  modalBtnTxt: { color: '#fff', fontSize: 15, fontWeight: '800' },
  modalBtnGhost: { paddingVertical: 14, alignItems: 'center', borderRadius: 14, borderWidth: 1.5 },
  modalBtnGhostTxt: { fontSize: 14, fontWeight: '700' },
});
