import React, { useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity, ScrollView,
  StyleSheet, KeyboardAvoidingView, Platform, Dimensions
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useApp } from '../context/AppContext';
import { AVLIST, LIGHT } from '../theme';

const { width } = Dimensions.get('window');

export default function OnboardingScreen({ navigation }) {
  const { login, checkStreak } = useApp();
  const [tab, setTab] = useState('reg');
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginUser, setLoginUser] = useState('');
  const [loginPass, setLoginPass] = useState('');
  const [selectedAv, setSelectedAv] = useState('☕');
  const [errors, setErrors] = useState({});

  const T = LIGHT;

  function handleRegister() {
    const errs = {};
    if (username.trim().length < 3) errs.username = 'Username must be at least 3 characters';
    if (password.length < 6) errs.password = 'Password must be at least 6 characters';
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setErrors({});
    const un = username.startsWith('@') ? username : '@' + username;
    login({ n: name.trim() || username.trim(), un, av: selectedAv });
    checkStreak();
  }

  function handleLogin() {
    if (!loginUser.trim() || !loginPass) {
      setErrors({ login: 'Please enter your username and password' });
      return;
    }
    setErrors({});
    const un = loginUser.startsWith('@') ? loginUser : '@' + loginUser;
    login({ n: loginUser.replace('@', ''), un, av: '☕' });
    checkStreak();
  }

  return (
    <LinearGradient colors={['#EEF9F8', '#D3ECEB']} style={styles.root}>
      {/* Orbs */}
      <View style={[styles.orb, { width: 320, height: 320, top: -100, right: -80, backgroundColor: 'rgba(0,180,166,0.18)' }]} />
      <View style={[styles.orb, { width: 260, height: 260, bottom: -60, left: -60, backgroundColor: 'rgba(255,184,48,0.14)' }]} />

      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={styles.scroll} keyboardShouldPersistTaps="handled">
          {/* Hero */}
          <View style={styles.hero}>
            <LinearGradient colors={['#00D4C0', '#00B4A6']} style={styles.logoBox}>
              <Text style={styles.logoEmoji}>☕</Text>
            </LinearGradient>
            <Text style={styles.headline}>
              Sip &{'\n'}<Text style={{ color: T.teal, fontStyle: 'italic' }}>Learn</Text>
            </Text>
            <Text style={styles.sub}>Master culture, one question at a time</Text>
          </View>

          {/* Card */}
          <View style={[styles.card, { backgroundColor: T.surface, borderColor: T.border }]}>
            {/* Tabs */}
            <View style={[styles.tabRow, { backgroundColor: T.bg2 }]}>
              {['reg', 'log'].map((t, i) => (
                <TouchableOpacity
                  key={t}
                  style={[styles.tabBtn, tab === t && [styles.tabBtnOn, { backgroundColor: T.surface }]]}
                  onPress={() => setTab(t)}
                >
                  <Text style={[styles.tabBtnTxt, { color: tab === t ? T.tx : T.tx3 }]}>
                    {i === 0 ? 'Register' : 'Log In'}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            {/* Register Form */}
            {tab === 'reg' && (
              <View>
                <View style={styles.fg}>
                  <Text style={[styles.fl, { color: T.tx3 }]}>Display Name (optional)</Text>
                  <TextInput
                    style={[styles.fi, { backgroundColor: T.bg2, color: T.tx, borderColor: T.border }]}
                    placeholder="e.g. Alex"
                    placeholderTextColor={T.tx3}
                    value={name}
                    onChangeText={setName}
                    autoCapitalize="words"
                  />
                </View>
                <View style={styles.fg}>
                  <Text style={[styles.fl, { color: T.tx3 }]}>Username *</Text>
                  <TextInput
                    style={[styles.fi, { backgroundColor: T.bg2, color: T.tx, borderColor: errors.username ? T.err : T.border }]}
                    placeholder="@yourname"
                    placeholderTextColor={T.tx3}
                    value={username}
                    onChangeText={setUsername}
                    autoCapitalize="none"
                    autoCorrect={false}
                  />
                  {errors.username && <Text style={[styles.ferr, { color: T.err }]}>{errors.username}</Text>}
                </View>
                <View style={styles.fg}>
                  <Text style={[styles.fl, { color: T.tx3 }]}>Password *</Text>
                  <TextInput
                    style={[styles.fi, { backgroundColor: T.bg2, color: T.tx, borderColor: errors.password ? T.err : T.border }]}
                    placeholder="At least 6 characters"
                    placeholderTextColor={T.tx3}
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry
                  />
                  {errors.password && <Text style={[styles.ferr, { color: T.err }]}>{errors.password}</Text>}
                </View>
                {/* Avatar picker */}
                <View style={styles.fg}>
                  <Text style={[styles.fl, { color: T.tx3 }]}>Pick Your Avatar</Text>
                  <View style={styles.avRow}>
                    {AVLIST.map(av => (
                      <TouchableOpacity
                        key={av}
                        style={[styles.avChip, { backgroundColor: T.bg2, borderColor: selectedAv === av ? T.teal : 'transparent' }, selectedAv === av && { backgroundColor: T.tealBg }]}
                        onPress={() => setSelectedAv(av)}
                      >
                        <Text style={{ fontSize: 20 }}>{av}</Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                </View>
                <TouchableOpacity style={styles.btnPrimary} onPress={handleRegister}>
                  <LinearGradient colors={['#00D4C0', '#00B4A6']} style={styles.btnGrad}>
                    <Text style={styles.btnTxt}>Create Account →</Text>
                  </LinearGradient>
                </TouchableOpacity>
              </View>
            )}

            {/* Login Form */}
            {tab === 'log' && (
              <View>
                <View style={styles.fg}>
                  <Text style={[styles.fl, { color: T.tx3 }]}>Username</Text>
                  <TextInput
                    style={[styles.fi, { backgroundColor: T.bg2, color: T.tx, borderColor: T.border }]}
                    placeholder="@yourname"
                    placeholderTextColor={T.tx3}
                    value={loginUser}
                    onChangeText={setLoginUser}
                    autoCapitalize="none"
                    autoCorrect={false}
                  />
                </View>
                <View style={styles.fg}>
                  <Text style={[styles.fl, { color: T.tx3 }]}>Password</Text>
                  <TextInput
                    style={[styles.fi, { backgroundColor: T.bg2, color: T.tx, borderColor: T.border }]}
                    placeholder="Your password"
                    placeholderTextColor={T.tx3}
                    value={loginPass}
                    onChangeText={setLoginPass}
                    secureTextEntry
                  />
                </View>
                {errors.login && <Text style={[styles.ferr, { color: T.err }]}>{errors.login}</Text>}
                <TouchableOpacity style={styles.btnPrimary} onPress={handleLogin}>
                  <LinearGradient colors={['#00D4C0', '#00B4A6']} style={styles.btnGrad}>
                    <Text style={styles.btnTxt}>Log In →</Text>
                  </LinearGradient>
                </TouchableOpacity>
              </View>
            )}
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1 },
  orb: { position: 'absolute', borderRadius: 999 },
  scroll: { flexGrow: 1, alignItems: 'center', justifyContent: 'center', padding: 20, paddingBottom: 40 },
  hero: { alignItems: 'center', marginBottom: 28 },
  logoBox: {
    width: 64, height: 64, borderRadius: 20,
    alignItems: 'center', justifyContent: 'center', marginBottom: 16,
  },
  logoEmoji: { fontSize: 30 },
  headline: {
    fontSize: 40, fontWeight: '800', color: LIGHT.tx,
    textAlign: 'center', lineHeight: 46, marginBottom: 10,
  },
  sub: { fontSize: 14, fontWeight: '500', color: LIGHT.tx2, textAlign: 'center' },
  card: {
    width: '100%', maxWidth: 420, borderRadius: 24,
    padding: 22, borderWidth: 1,
    shadowColor: '#006060', shadowOpacity: 0.12, shadowRadius: 20, shadowOffset: { width: 0, height: 6 },
    elevation: 6,
  },
  tabRow: { flexDirection: 'row', borderRadius: 100, padding: 3, marginBottom: 22 },
  tabBtn: { flex: 1, paddingVertical: 10, borderRadius: 100, alignItems: 'center' },
  tabBtnOn: { shadowColor: '#000', shadowOpacity: 0.08, shadowRadius: 4, shadowOffset: { width: 0, height: 2 }, elevation: 2 },
  tabBtnTxt: { fontSize: 13, fontWeight: '700' },
  fg: { marginBottom: 15 },
  fl: { fontSize: 10, fontWeight: '700', letterSpacing: 1, textTransform: 'uppercase', marginBottom: 6 },
  fi: {
    width: '100%', paddingVertical: 12, paddingHorizontal: 14,
    borderRadius: 12, fontSize: 14, fontWeight: '600', borderWidth: 2,
  },
  ferr: { fontSize: 11, fontWeight: '700', marginTop: 5 },
  avRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  avChip: {
    width: 44, height: 44, borderRadius: 12, borderWidth: 2.5,
    alignItems: 'center', justifyContent: 'center',
  },
  btnPrimary: { marginTop: 8, borderRadius: 14, overflow: 'hidden' },
  btnGrad: { paddingVertical: 14, alignItems: 'center' },
  btnTxt: { color: '#fff', fontSize: 15, fontWeight: '700' },
});
