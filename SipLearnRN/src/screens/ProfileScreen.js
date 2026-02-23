import React, { useState } from 'react';
import {
  View, Text, ScrollView, TouchableOpacity, Modal,
  StyleSheet, Alert
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useApp } from '../context/AppContext';
import { LIGHT, DARK, AVLIST, ACHIEVEMENTS, getLevel, getLevelPct } from '../theme';

export default function ProfileScreen({ navigation }) {
  const { state, dispatch, toast, signOut } = useApp();
  const T = state.nightMode ? DARK : LIGHT;
  const [avModalOpen, setAvModalOpen] = useState(false);
  const [tempAv, setTempAv] = useState(state.user?.av || '☕');

  const lv = getLevel(state.xpTotal);
  const pct = getLevelPct(state.xpTotal);
  const doneCount = Object.keys(state.completed).length;

  const SOCIALS = [
    { id: 'ig', n: 'Instagram', av: '📸' },
    { id: 'tw', n: 'X (Twitter)', av: '🐦' },
    { id: 'fb', n: 'Facebook', av: '👤' },
  ];

  function saveAvatar() {
    dispatch({ type: 'LOAD', payload: { user: { ...state.user, av: tempAv } } });
    setAvModalOpen(false);
    toast('Avatar updated!');
  }

  function linkSocial(id) {
    toast(`${SOCIALS.find(s => s.id === id)?.n} linked! +1 energy 🎉`);
    dispatch({ type: 'LINK_SOCIAL' });
  }

  function handleSignOut() {
    Alert.alert('Sign Out', 'Are you sure you want to sign out?', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Sign Out', style: 'destructive', onPress: signOut },
    ]);
  }

  return (
    <View style={[styles.root, { backgroundColor: T.bg }]}>
      <ScrollView contentContainerStyle={{ paddingBottom: 100 }}>
        {/* Hero */}
        <LinearGradient colors={[T.tealBg, 'transparent']} style={styles.hero}>
          <TouchableOpacity onPress={() => setAvModalOpen(true)} style={styles.avWrap}>
            <LinearGradient colors={['#00D4C0', '#00B4A6']} style={styles.av}>
              <Text style={{ fontSize: 40 }}>{state.user?.av || '☕'}</Text>
            </LinearGradient>
            <View style={[styles.avEdit, { backgroundColor: T.teal }]}>
              <Text style={{ color: '#fff', fontSize: 12 }}>✏️</Text>
            </View>
          </TouchableOpacity>
          <Text style={[styles.name, { color: T.tx }]}>{state.user?.n}</Text>
          <Text style={[styles.handle, { color: T.tx3 }]}>{state.user?.un} · {lv.label}</Text>

          {/* Stats row */}
          <View style={styles.statsRow}>
            {[
              { val: state.xpTotal.toLocaleString(), lbl: 'XP', color: T.gold },
              { val: state.streak, lbl: 'Streak 🔥', color: T.teal },
              { val: doneCount, lbl: 'Levels', color: T.coral },
            ].map(s => (
              <View key={s.lbl} style={[styles.stat, { backgroundColor: T.surface, borderColor: T.border }]}>
                <Text style={[styles.statV, { color: s.color }]}>{s.val}</Text>
                <Text style={[styles.statL, { color: T.tx3 }]}>{s.lbl}</Text>
              </View>
            ))}
          </View>

          {/* XP bar */}
          <View style={[styles.xpBarWrap, { backgroundColor: T.surface, borderColor: T.border }]}>
            <View style={styles.xpBarTop}>
              <Text style={[styles.xpBarLbl, { color: T.tx }]}>Level {lv.lvl} · {lv.label}</Text>
              <Text style={[styles.xpBarPct, { color: T.tx3 }]}>{pct}%</Text>
            </View>
            <View style={[styles.xpRail, { backgroundColor: T.bg2 }]}>
              <LinearGradient
                colors={['#00D4C0', '#00B4A6']}
                start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
                style={[styles.xpFill, { width: `${pct}%` }]}
              />
            </View>
          </View>
        </LinearGradient>

        <View style={{ padding: 20, gap: 16 }}>
          {/* Energy */}
          <View style={[styles.section, { backgroundColor: T.surface, borderColor: T.border }]}>
            <Text style={[styles.sectionLbl, { color: T.tx3 }]}>⚡ Energy</Text>
            <View style={styles.energyRow}>
              <Text style={{ fontSize: 20 }}>⚡</Text>
              <View style={{ flex: 1 }}>
                <Text style={[styles.energyCount, { color: T.tx }]}>{state.energy}/{state.maxEnergy} charges</Text>
                <View style={styles.pipsRow}>
                  {Array.from({ length: state.maxEnergy }).map((_, i) => (
                    <View key={i} style={[styles.pip, { backgroundColor: T.bg3, borderColor: T.border }, i < state.energy && { backgroundColor: T.gold }]} />
                  ))}
                </View>
              </View>
              <TouchableOpacity onPress={() => dispatch({ type: 'ADD_ENERGY', payload: 3 })} style={[styles.refuelBtn, { backgroundColor: T.goldBg, borderColor: T.gold }]}>
                <Text style={[styles.refuelBtnTxt, { color: T.gold }]}>Refuel</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Achievements */}
          <View style={[styles.section, { backgroundColor: T.surface, borderColor: T.border }]}>
            <Text style={[styles.sectionLbl, { color: T.tx3 }]}>🏅 Achievements</Text>
            <View style={styles.badgesRow}>
              {ACHIEVEMENTS.map(a => {
                const earned = state.earnedAchievements?.includes(a.id);
                return (
                  <View key={a.id} style={[styles.badge, { backgroundColor: T.bg3, borderColor: T.border }, earned && { backgroundColor: T.goldBg, borderColor: T.goldD }]}>
                    <Text style={{ fontSize: 20, opacity: earned ? 1 : 0.4 }}>{a.emoji}</Text>
                    <Text style={[styles.badgeLbl, { color: T.tx3 }]}>{a.label}</Text>
                  </View>
                );
              })}
            </View>
          </View>

          {/* Link Accounts */}
          <View style={[styles.section, { backgroundColor: T.surface, borderColor: T.border }]}>
            <Text style={[styles.sectionLbl, { color: T.tx3 }]}>🔗 Link Accounts · +1 energy each</Text>
            {SOCIALS.map(s => (
              <View key={s.id} style={[styles.socialRow, { borderColor: T.border }]}>
                <View style={[styles.socialAv, { backgroundColor: T.bg2 }]}>
                  <Text style={{ fontSize: 16 }}>{s.av}</Text>
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={[styles.socialName, { color: T.tx }]}>{s.n}</Text>
                  <Text style={[styles.socialStatus, { color: T.tx3 }]}>Not linked</Text>
                </View>
                <TouchableOpacity onPress={() => linkSocial(s.id)} style={[styles.linkBtn, { backgroundColor: T.tealBg, borderColor: T.teal }]}>
                  <Text style={[styles.linkBtnTxt, { color: T.teal }]}>Link</Text>
                </TouchableOpacity>
              </View>
            ))}
          </View>

          {/* Settings */}
          <View style={[styles.section, { backgroundColor: T.surface, borderColor: T.border }]}>
            <Text style={[styles.sectionLbl, { color: T.tx3 }]}>⚙️ Settings</Text>
            {/* Theme */}
            <View style={styles.settingRow}>
              <Text style={[styles.settingName, { color: T.tx }]}>Theme</Text>
              <View style={styles.themeToggle}>
                {[{ lbl: '☀️ Day', val: false }, { lbl: '🌙 Night', val: true }].map(t => (
                  <TouchableOpacity
                    key={t.lbl}
                    style={[styles.themBtn, { borderColor: T.border }, state.nightMode === t.val && { borderColor: T.teal, backgroundColor: T.tealBg }]}
                    onPress={() => dispatch({ type: 'SET_NIGHT', payload: t.val })}
                  >
                    <Text style={[styles.themBtnTxt, { color: state.nightMode === t.val ? T.teal : T.tx3 }]}>{t.lbl}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
            <TouchableOpacity style={[styles.settingRow, { borderTopWidth: 1, borderTopColor: T.border }]} onPress={() => toast('Notifications setting coming soon!')}>
              <Text style={{ fontSize: 18 }}>🔔</Text>
              <View style={{ flex: 1, marginLeft: 12 }}>
                <Text style={[styles.settingName, { color: T.tx }]}>Notifications</Text>
                <Text style={[styles.settingSub, { color: T.tx3 }]}>Daily reminders & streak alerts</Text>
              </View>
              <Text style={[styles.chevron, { color: T.tx3 }]}>›</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.settingRow, { borderTopWidth: 1, borderTopColor: T.border }]} onPress={() => toast('Sound setting coming soon!')}>
              <Text style={{ fontSize: 18 }}>🔊</Text>
              <View style={{ flex: 1, marginLeft: 12 }}>
                <Text style={[styles.settingName, { color: T.tx }]}>Sound Effects</Text>
                <Text style={[styles.settingSub, { color: T.tx3 }]}>Audio feedback on answers</Text>
              </View>
              <Text style={[styles.chevron, { color: T.tx3 }]}>›</Text>
            </TouchableOpacity>
          </View>

          {/* Sign Out */}
          <TouchableOpacity style={[styles.signOutBtn, { backgroundColor: T.errBg, borderColor: T.err }]} onPress={handleSignOut}>
            <Text style={[styles.signOutTxt, { color: T.err }]}>Sign Out</Text>
          </TouchableOpacity>
          <Text style={[styles.version, { color: T.tx3 }]}>Sip & Learn v9.0</Text>
        </View>
      </ScrollView>

      {/* Avatar Modal */}
      <Modal transparent visible={avModalOpen} animationType="slide" onRequestClose={() => setAvModalOpen(false)}>
        <TouchableOpacity style={styles.modalOverlay} activeOpacity={1} onPress={() => setAvModalOpen(false)}>
          <View style={[styles.modalSheet, { backgroundColor: T.surface, borderColor: T.border }]}>
            <View style={styles.sheetHandle} />
            <Text style={{ fontSize: 52, textAlign: 'center', marginBottom: 8 }}>{tempAv}</Text>
            <Text style={[styles.modalTitle, { color: T.tx }]}>Change Avatar</Text>
            <View style={styles.avGrid}>
              {AVLIST.map(av => (
                <TouchableOpacity
                  key={av}
                  style={[styles.avChip, { backgroundColor: T.bg2, borderColor: 'transparent' }, tempAv === av && { borderColor: T.teal, backgroundColor: T.tealBg }]}
                  onPress={() => setTempAv(av)}
                >
                  <Text style={{ fontSize: 22 }}>{av}</Text>
                </TouchableOpacity>
              ))}
            </View>
            <TouchableOpacity style={styles.saveBtn} onPress={saveAvatar}>
              <LinearGradient colors={['#00D4C0', '#00B4A6']} style={styles.saveBtnGrad}>
                <Text style={styles.saveBtnTxt}>Save</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1 },
  hero: { padding: 24, alignItems: 'center', paddingTop: 32 },
  avWrap: { marginBottom: 16, position: 'relative' },
  av: { width: 88, height: 88, borderRadius: 26, alignItems: 'center', justifyContent: 'center' },
  avEdit: { position: 'absolute', bottom: -4, right: -4, width: 26, height: 26, borderRadius: 13, alignItems: 'center', justifyContent: 'center' },
  name: { fontSize: 22, fontWeight: '800', marginBottom: 4 },
  handle: { fontSize: 13, fontWeight: '600', marginBottom: 18 },
  statsRow: { flexDirection: 'row', gap: 10, marginBottom: 14 },
  stat: { flex: 1, borderRadius: 14, padding: 12, alignItems: 'center', borderWidth: 1 },
  statV: { fontSize: 20, fontWeight: '800', marginBottom: 2 },
  statL: { fontSize: 10, fontWeight: '700', letterSpacing: 0.3 },
  xpBarWrap: { width: '100%', borderRadius: 14, padding: 14, borderWidth: 1 },
  xpBarTop: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 },
  xpBarLbl: { fontSize: 12, fontWeight: '700' },
  xpBarPct: { fontSize: 12, fontWeight: '600' },
  xpRail: { height: 8, borderRadius: 100, overflow: 'hidden' },
  xpFill: { height: 8, borderRadius: 100 },
  section: { borderRadius: 18, padding: 16, borderWidth: 1 },
  sectionLbl: { fontSize: 9, fontWeight: '700', letterSpacing: 1, textTransform: 'uppercase', marginBottom: 14 },
  energyRow: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  energyCount: { fontSize: 12, fontWeight: '700', marginBottom: 8 },
  pipsRow: { flexDirection: 'row', gap: 4 },
  pip: { height: 8, width: 28, borderRadius: 4, borderWidth: 1 },
  refuelBtn: { borderRadius: 100, paddingHorizontal: 14, paddingVertical: 6, borderWidth: 1.5 },
  refuelBtnTxt: { fontSize: 12, fontWeight: '800' },
  badgesRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  badge: { width: 56, height: 60, borderRadius: 14, alignItems: 'center', justifyContent: 'center', borderWidth: 1.5, gap: 2 },
  badgeLbl: { fontSize: 7, fontWeight: '700', textAlign: 'center', letterSpacing: 0.3 },
  socialRow: { flexDirection: 'row', alignItems: 'center', gap: 12, paddingVertical: 12, borderBottomWidth: 1 },
  socialAv: { width: 36, height: 36, borderRadius: 10, alignItems: 'center', justifyContent: 'center' },
  socialName: { fontSize: 13, fontWeight: '700' },
  socialStatus: { fontSize: 11, fontWeight: '500', marginTop: 1 },
  linkBtn: { borderRadius: 100, paddingHorizontal: 12, paddingVertical: 5, borderWidth: 1.5 },
  linkBtnTxt: { fontSize: 12, fontWeight: '800' },
  settingRow: { flexDirection: 'row', alignItems: 'center', paddingVertical: 12 },
  settingName: { fontSize: 14, fontWeight: '700' },
  settingSub: { fontSize: 11, fontWeight: '500', marginTop: 1 },
  themeToggle: { flexDirection: 'row', gap: 6, marginLeft: 'auto' },
  themBtn: { paddingHorizontal: 12, paddingVertical: 6, borderRadius: 100, borderWidth: 1.5 },
  themBtnTxt: { fontSize: 11, fontWeight: '700' },
  chevron: { fontSize: 22, fontWeight: '300' },
  signOutBtn: { borderRadius: 14, padding: 14, alignItems: 'center', borderWidth: 1.5 },
  signOutTxt: { fontSize: 14, fontWeight: '800' },
  version: { textAlign: 'center', fontSize: 11, fontWeight: '500' },
  // Modal
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.6)', justifyContent: 'flex-end' },
  modalSheet: { borderTopLeftRadius: 28, borderTopRightRadius: 28, padding: 22, paddingBottom: 40, borderTopWidth: 1 },
  sheetHandle: { width: 40, height: 4, backgroundColor: '#ccc', borderRadius: 2, alignSelf: 'center', marginBottom: 16 },
  modalTitle: { fontSize: 20, fontWeight: '800', textAlign: 'center', marginBottom: 20 },
  avGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 10, justifyContent: 'center', marginBottom: 20 },
  avChip: { width: 50, height: 50, borderRadius: 14, alignItems: 'center', justifyContent: 'center', borderWidth: 2.5 },
  saveBtn: { borderRadius: 14, overflow: 'hidden' },
  saveBtnGrad: { paddingVertical: 14, alignItems: 'center' },
  saveBtnTxt: { color: '#fff', fontSize: 15, fontWeight: '800' },
});
