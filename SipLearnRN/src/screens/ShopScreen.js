import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useApp } from '../context/AppContext';
import { LIGHT, DARK } from '../theme';

export default function ShopScreen() {
  const { state, dispatch, toast } = useApp();
  const T = state.nightMode ? DARK : LIGHT;

  function buyEnergy(n, price, name) {
    dispatch({ type: 'ADD_ENERGY', payload: n });
    toast(`${name}: +${n} Energy added ⚡`);
  }

  function buyPro() {
    dispatch({ type: 'SET_ADS_FREE', payload: true });
    dispatch({ type: 'ADD_ENERGY', payload: 99 });
    toast('Welcome to Pro! Unlimited energy unlocked 🎉');
  }

  const SHOP_ITEMS = [
    { ico: '⚡', color: ['#FFD700', '#FFB830'], name: 'Quick Refill', desc: '+3 Energy charges immediately', price: 'Free', n: 3 },
    { ico: '🔋', color: ['#00D4C0', '#00B4A6'], name: 'Power Pack', desc: '+5 Energy charges', price: '$0.99', n: 5 },
    { ico: '💥', color: ['#FF8C8C', '#FF6B6B'], name: 'Mega Refill', desc: '+10 Energy charges', price: '$1.99', n: 10 },
  ];

  const BADGE_ITEMS = [
    { ico: '🏆', color: ['#FFD700', '#FFB830'], name: 'Champion Badge', desc: 'Show off your expertise', price: '$1.99' },
    { ico: '🎭', color: ['#7C6EE8', '#A090FF'], name: 'Connoisseur Badge', desc: 'The mark of true mastery', price: '$0.99' },
  ];

  return (
    <View style={[styles.root, { backgroundColor: T.bg }]}>
      <ScrollView contentContainerStyle={{ padding: 20, paddingBottom: 100 }}>
        {/* Shop Hero */}
        <LinearGradient colors={['#1A0050', '#4A20B0', '#7C6EE8']} style={styles.shopHero}>
          <Text style={styles.shopHeroEmoji1}>✨</Text>
          <Text style={styles.shopHeroEmoji2}>💎</Text>
          <Text style={styles.shopHeroTitle}>Pro Shop</Text>
          <Text style={styles.shopHeroSub}>Unlock your full learning potential</Text>
        </LinearGradient>

        {/* Pro Banner */}
        <LinearGradient colors={['#1A0050', '#4A20B0', '#7C6EE8']} style={styles.proBanner}>
          <Text style={styles.proEyebrow}>⭐ PRO PACK</Text>
          <Text style={styles.proTitle}>Go Unlimited</Text>
          <View style={styles.perks}>
            {['Unlimited energy — never run out', 'Special Pro badge on leaderboard', 'Advanced analytics & insights', 'Ad-free experience forever', 'Priority access to new content'].map((perk, i) => (
              <View key={i} style={styles.perkRow}>
                <Text style={[styles.perkCheck, { color: T.gold }]}>✓</Text>
                <Text style={styles.perkTxt}>{perk}</Text>
              </View>
            ))}
          </View>
          <TouchableOpacity onPress={buyPro} style={styles.proBtn}>
            <LinearGradient colors={['#FFD700', '#FFB830']} style={styles.proBtnGrad}>
              <Text style={styles.proBtnTxt}>Unlock Pro · $9.99/month</Text>
            </LinearGradient>
          </TouchableOpacity>
        </LinearGradient>

        {/* Energy Refills */}
        <Text style={[styles.sectionTitle, { color: T.tx }]}>⚡ Energy Refills</Text>
        {SHOP_ITEMS.map((item, i) => (
          <TouchableOpacity key={i} style={[styles.shopItem, { backgroundColor: T.surface, borderColor: T.border }]} onPress={() => buyEnergy(item.n, item.price, item.name)}>
            <LinearGradient colors={item.color} style={styles.shopIco}>
              <Text style={{ fontSize: 22 }}>{item.ico}</Text>
            </LinearGradient>
            <View style={styles.shopInfo}>
              <Text style={[styles.shopName, { color: T.tx }]}>{item.name}</Text>
              <Text style={[styles.shopDesc, { color: T.tx3 }]}>{item.desc}</Text>
            </View>
            <Text style={[styles.shopPrice, { color: T.teal }]}>{item.price}</Text>
          </TouchableOpacity>
        ))}

        {/* Ad-Free */}
        <Text style={[styles.sectionTitle, { color: T.tx, marginTop: 8 }]}>🚫 Ad-Free</Text>
        <TouchableOpacity
          style={[styles.shopItem, { backgroundColor: T.surface, borderColor: state.adsFree ? T.teal : T.border }]}
          onPress={() => state.adsFree ? toast('Already active!') : (dispatch({ type: 'SET_ADS_FREE', payload: true }), toast('Ad-free activated! 🎉'))}
        >
          <LinearGradient colors={state.adsFree ? ['#00D4C0', '#00B4A6'] : ['#7C6EE8', '#A090FF']} style={styles.shopIco}>
            <Text style={{ fontSize: 22 }}>{state.adsFree ? '✓' : '🚫'}</Text>
          </LinearGradient>
          <View style={styles.shopInfo}>
            <Text style={[styles.shopName, { color: T.tx }]}>Ad-Free Experience</Text>
            <Text style={[styles.shopDesc, { color: T.tx3 }]}>
              {state.adsFree ? 'Active — enjoying Sip & Learn ad-free!' : 'Remove all ads · uninterrupted learning'}
            </Text>
          </View>
          <View style={[styles.shopPriceBtn, { backgroundColor: state.adsFree ? T.okBg : T.tealBg, borderColor: state.adsFree ? T.ok : T.teal }]}>
            <Text style={[styles.shopPriceBtnTxt, { color: state.adsFree ? T.ok : T.teal }]}>{state.adsFree ? 'Active' : '$4.99'}</Text>
          </View>
        </TouchableOpacity>

        {/* Badges */}
        <Text style={[styles.sectionTitle, { color: T.tx, marginTop: 8 }]}>🎖️ Special Badges</Text>
        {BADGE_ITEMS.map((item, i) => (
          <TouchableOpacity key={i} style={[styles.shopItem, { backgroundColor: T.surface, borderColor: T.border }]} onPress={() => toast('Badge purchase coming soon!')}>
            <LinearGradient colors={item.color} style={styles.shopIco}>
              <Text style={{ fontSize: 22 }}>{item.ico}</Text>
            </LinearGradient>
            <View style={styles.shopInfo}>
              <Text style={[styles.shopName, { color: T.tx }]}>{item.name}</Text>
              <Text style={[styles.shopDesc, { color: T.tx3 }]}>{item.desc}</Text>
            </View>
            <Text style={[styles.shopPrice, { color: T.teal }]}>{item.price}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1 },
  shopHero: { borderRadius: 20, padding: 24, marginBottom: 16, alignItems: 'center', position: 'relative', overflow: 'hidden' },
  shopHeroEmoji1: { position: 'absolute', top: 14, left: 16, fontSize: 28, opacity: 0.6 },
  shopHeroEmoji2: { position: 'absolute', top: 14, right: 16, fontSize: 28, opacity: 0.6 },
  shopHeroTitle: { color: '#fff', fontSize: 28, fontWeight: '800', marginBottom: 6 },
  shopHeroSub: { color: 'rgba(255,255,255,0.75)', fontSize: 13, fontWeight: '600' },
  proBanner: { borderRadius: 20, padding: 22, marginBottom: 16 },
  proEyebrow: { color: '#FFB830', fontSize: 10, fontWeight: '800', letterSpacing: 1, textTransform: 'uppercase', marginBottom: 6 },
  proTitle: { color: '#fff', fontSize: 24, fontWeight: '800', marginBottom: 12 },
  perks: { marginBottom: 16, gap: 8 },
  perkRow: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  perkCheck: { fontSize: 14, fontWeight: '800' },
  perkTxt: { color: 'rgba(255,255,255,0.9)', fontSize: 13, fontWeight: '600' },
  proBtn: { borderRadius: 14, overflow: 'hidden' },
  proBtnGrad: { paddingVertical: 14, alignItems: 'center' },
  proBtnTxt: { color: '#0B2D2B', fontSize: 14, fontWeight: '800' },
  sectionTitle: { fontSize: 18, fontWeight: '700', marginBottom: 12 },
  shopItem: { flexDirection: 'row', alignItems: 'center', gap: 14, padding: 14, borderRadius: 16, borderWidth: 1.5, marginBottom: 10 },
  shopIco: { width: 48, height: 48, borderRadius: 14, alignItems: 'center', justifyContent: 'center' },
  shopInfo: { flex: 1 },
  shopName: { fontSize: 14, fontWeight: '700', marginBottom: 3 },
  shopDesc: { fontSize: 11, fontWeight: '500' },
  shopPrice: { fontSize: 17, fontWeight: '800' },
  shopPriceBtn: { borderRadius: 100, paddingHorizontal: 10, paddingVertical: 5, borderWidth: 1.5 },
  shopPriceBtnTxt: { fontSize: 12, fontWeight: '800' },
});
