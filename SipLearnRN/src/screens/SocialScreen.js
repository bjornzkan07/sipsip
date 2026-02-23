import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, TextInput, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useApp } from '../context/AppContext';
import { LIGHT, DARK, GLOBAL_LB } from '../theme';

export default function SocialScreen() {
  const { state, dispatch, toast } = useApp();
  const T = state.nightMode ? DARK : LIGHT;
  const [searchText, setSearchText] = useState('');

  const MEDALS = ['🥇', '🥈', '🥉'];

  const glb = [...GLOBAL_LB, {
    n: state.user?.n || 'You',
    un: state.user?.un || '@you',
    av: state.user?.av || '☕',
    xp: state.xpTotal,
    str: state.streak,
    isMe: true,
  }].sort((a, b) => b.xp - a.xp).slice(0, 11);

  const suggestions = state.friends.filter(f => !f.added);
  const searched = searchText.trim()
    ? state.friends.filter(f =>
        f.un.toLowerCase().includes(searchText.toLowerCase()) ||
        f.n.toLowerCase().includes(searchText.toLowerCase())
      )
    : null;

  function addFriend(id) {
    dispatch({ type: 'ADD_FRIEND', payload: id });
    const f = state.friends.find(x => x.id === id);
    if (f) toast(`Added ${f.n}! 🎉`);
  }

  return (
    <View style={[styles.root, { backgroundColor: T.bg }]}>
      <ScrollView contentContainerStyle={{ padding: 20, paddingBottom: 100 }}>
        {/* Global Leaderboard */}
        <View style={[styles.lbHeader, { backgroundColor: T.surface, borderColor: T.border }]}>
          <Text style={[styles.lbTitle, { color: T.tx }]}>🌍 Global Leaderboard</Text>
          <Text style={[styles.lbSub, { color: T.tx3 }]}>Updated daily · {glb.length} players worldwide</Text>
        </View>

        {glb.map((f, i) => (
          <View
            key={f.un + i}
            style={[
              styles.playerCard,
              { backgroundColor: T.surface, borderColor: T.border },
              f.isMe && { borderColor: T.teal, backgroundColor: T.tealBg },
            ]}
          >
            <View style={[styles.rank, i === 0 && styles.rank1, i === 1 && styles.rank2, i === 2 && styles.rank3]}>
              <Text style={styles.rankTxt}>{i < 3 ? MEDALS[i] : i + 1}</Text>
            </View>
            <Text style={styles.avEmoji}>{f.av}</Text>
            <View style={styles.playerInfo}>
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
                <Text style={[styles.playerName, { color: T.tx }]}>{f.n}</Text>
                {f.isMe && (
                  <View style={[styles.youBadge, { backgroundColor: T.teal }]}>
                    <Text style={styles.youBadgeTxt}>YOU</Text>
                  </View>
                )}
              </View>
              <Text style={[styles.playerMeta, { color: T.tx3 }]}>{f.un} · 🔥{f.str}</Text>
            </View>
            <Text style={[styles.playerXP, { color: T.teal }]}>{f.xp.toLocaleString()}</Text>
          </View>
        ))}

        {/* Friend Search */}
        <View style={styles.searchSection}>
          <View style={[styles.searchRow, { backgroundColor: T.surface, borderColor: T.border }]}>
            <TextInput
              style={[styles.searchInput, { color: T.tx }]}
              placeholder="Search friends by username…"
              placeholderTextColor={T.tx3}
              value={searchText}
              onChangeText={setSearchText}
              autoCapitalize="none"
              autoCorrect={false}
            />
            <Text style={{ fontSize: 16 }}>🔍</Text>
          </View>

          {searched && (
            <View>
              {searched.length === 0 ? (
                <Text style={[styles.noResults, { color: T.tx3 }]}>No results for "{searchText}"</Text>
              ) : (
                searched.map(f => (
                  <View key={f.id} style={[styles.playerCard, { backgroundColor: T.surface, borderColor: T.border }]}>
                    <Text style={styles.avEmoji}>{f.av}</Text>
                    <View style={styles.playerInfo}>
                      <Text style={[styles.playerName, { color: T.tx }]}>{f.n}</Text>
                      <Text style={[styles.playerMeta, { color: T.tx3 }]}>{f.un}</Text>
                    </View>
                    {f.added ? (
                      <View style={[styles.friendBadge, { backgroundColor: T.okBg }]}>
                        <Text style={[styles.friendBadgeTxt, { color: T.ok }]}>✓ Friend</Text>
                      </View>
                    ) : (
                      <TouchableOpacity style={[styles.addBtn, { backgroundColor: T.tealBg, borderColor: T.teal }]} onPress={() => addFriend(f.id)}>
                        <Text style={[styles.addBtnTxt, { color: T.teal }]}>+ Add</Text>
                      </TouchableOpacity>
                    )}
                  </View>
                ))
              )}
            </View>
          )}

          {/* Suggestions */}
          {!searchText && suggestions.length > 0 && (
            <>
              <Text style={[styles.subHead, { color: T.tx3 }]}>Suggestions</Text>
              {suggestions.map(f => (
                <View key={f.id} style={[styles.playerCard, { backgroundColor: T.surface, borderColor: T.border }]}>
                  <Text style={styles.avEmoji}>{f.av}</Text>
                  <View style={styles.playerInfo}>
                    <Text style={[styles.playerName, { color: T.tx }]}>{f.n}</Text>
                    <Text style={[styles.playerMeta, { color: T.tx3 }]}>{f.un} · {f.xp.toLocaleString()} XP</Text>
                  </View>
                  <TouchableOpacity style={[styles.addBtn, { backgroundColor: T.tealBg, borderColor: T.teal }]} onPress={() => addFriend(f.id)}>
                    <Text style={[styles.addBtnTxt, { color: T.teal }]}>+ Add</Text>
                  </TouchableOpacity>
                </View>
              ))}
            </>
          )}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1 },
  lbHeader: { borderRadius: 18, padding: 18, marginBottom: 14, borderWidth: 1 },
  lbTitle: { fontSize: 20, fontWeight: '800', marginBottom: 4 },
  lbSub: { fontSize: 12, fontWeight: '500' },
  playerCard: { flexDirection: 'row', alignItems: 'center', gap: 10, padding: 14, borderRadius: 14, borderWidth: 1, marginBottom: 8 },
  rank: { width: 32, height: 32, borderRadius: 100, alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(0,180,166,0.1)' },
  rank1: { backgroundColor: 'rgba(255,215,0,0.2)' },
  rank2: { backgroundColor: 'rgba(192,192,192,0.2)' },
  rank3: { backgroundColor: 'rgba(205,127,50,0.2)' },
  rankTxt: { fontSize: 14, fontWeight: '800' },
  avEmoji: { fontSize: 22 },
  playerInfo: { flex: 1 },
  playerName: { fontSize: 13, fontWeight: '700' },
  playerMeta: { fontSize: 11, fontWeight: '500', marginTop: 2 },
  playerXP: { fontSize: 14, fontWeight: '800' },
  youBadge: { borderRadius: 100, paddingHorizontal: 6, paddingVertical: 2 },
  youBadgeTxt: { color: '#fff', fontSize: 9, fontWeight: '800' },
  searchSection: { marginTop: 20 },
  searchRow: { flexDirection: 'row', alignItems: 'center', borderRadius: 14, borderWidth: 1, paddingHorizontal: 14, paddingVertical: 10, marginBottom: 12, gap: 10 },
  searchInput: { flex: 1, fontSize: 14, fontWeight: '500' },
  noResults: { fontSize: 12, fontWeight: '600', paddingVertical: 8 },
  subHead: { fontSize: 9, fontWeight: '700', letterSpacing: 1, textTransform: 'uppercase', marginBottom: 10, marginTop: 6 },
  friendBadge: { borderRadius: 100, paddingHorizontal: 10, paddingVertical: 4 },
  friendBadgeTxt: { fontSize: 11, fontWeight: '800' },
  addBtn: { borderRadius: 100, paddingHorizontal: 12, paddingVertical: 5, borderWidth: 1.5 },
  addBtnTxt: { fontSize: 12, fontWeight: '800' },
});
