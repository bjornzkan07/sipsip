import React from 'react';
import { View, Text, StatusBar, Platform } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { AppProvider, useApp } from './src/context/AppContext';
import { LIGHT, DARK } from './src/theme';

import OnboardingScreen from './src/screens/OnboardingScreen';
import PlayScreen     from './src/screens/PlayScreen';
import PracticeScreen from './src/screens/PracticeScreen';
import MapScreen      from './src/screens/MapScreen';
import ShopScreen     from './src/screens/ShopScreen';
import SocialScreen   from './src/screens/SocialScreen';
import ProfileScreen  from './src/screens/ProfileScreen';
import LessonScreen   from './src/screens/LessonScreen';

const Stack = createNativeStackNavigator();
const Tab   = createBottomTabNavigator();

// ── Tab icons ──────────────────────────────────────────────────────────────────
const TAB_ICONS = {
  Play:     { active: '🏠', inactive: '🏠' },
  Practice: { active: '📖', inactive: '📖' },
  Map:      { active: '🗺️', inactive: '🗺️' },
  Shop:     { active: '🛍️', inactive: '🛍️' },
  Social:   { active: '🏆', inactive: '🏆' },
};

function TabNavigator() {
  const { state } = useApp();
  const T = state.nightMode ? DARK : LIGHT;

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarStyle: {
          backgroundColor: T.surface,
          borderTopColor: T.border,
          borderTopWidth: 1,
          height: Platform.OS === 'ios' ? 84 : 62,
          paddingBottom: Platform.OS === 'ios' ? 28 : 8,
          paddingTop: 8,
          elevation: 0,
          shadowOpacity: 0,
        },
        tabBarLabel: ({ focused }) => (
          <Text
            style={{
              fontSize: 10,
              fontWeight: focused ? '800' : '600',
              color: focused ? T.teal : T.tx3,
              letterSpacing: 0.2,
            }}
          >
            {route.name}
          </Text>
        ),
        tabBarIcon: ({ focused }) => {
          const icon = TAB_ICONS[route.name];
          return (
            <View style={{ alignItems: 'center' }}>
              {focused && (
                <View
                  style={{
                    position: 'absolute',
                    top: -10,
                    width: 36,
                    height: 3,
                    borderRadius: 2,
                    backgroundColor: T.teal,
                  }}
                />
              )}
              <Text style={{ fontSize: 20, opacity: focused ? 1 : 0.55 }}>
                {icon?.active ?? '⭐'}
              </Text>
            </View>
          );
        },
        tabBarActiveTintColor: T.teal,
        tabBarInactiveTintColor: T.tx3,
      })}
    >
      <Tab.Screen name="Play"     component={PlayScreen} />
      <Tab.Screen name="Practice" component={PracticeScreen} />
      <Tab.Screen name="Map"      component={MapScreen} />
      <Tab.Screen name="Shop"     component={ShopScreen} />
      <Tab.Screen name="Social"   component={SocialScreen} />
    </Tab.Navigator>
  );
}

// ── Root navigator ─────────────────────────────────────────────────────────────
function RootNavigator() {
  const { state } = useApp();
  const T = state.nightMode ? DARK : LIGHT;
  const authed = !!state.user?.un;

  return (
    <>
      <StatusBar
        barStyle={state.nightMode ? 'light-content' : 'dark-content'}
        backgroundColor={T.bg}
      />
      <Stack.Navigator screenOptions={{ headerShown: false, animation: 'slide_from_right' }}>
        {!authed ? (
          <Stack.Screen name="Onboarding" component={OnboardingScreen} />
        ) : (
          <>
            <Stack.Screen name="Main"    component={TabNavigator} />
            <Stack.Screen
              name="Profile"
              component={ProfileScreen}
              options={{ animation: 'slide_from_bottom' }}
            />
            <Stack.Screen
              name="Lesson"
              component={LessonScreen}
              options={{ animation: 'slide_from_bottom', gestureEnabled: false }}
            />
          </>
        )}
      </Stack.Navigator>
    </>
  );
}

// ── Toast overlay ──────────────────────────────────────────────────────────────
function ToastOverlay() {
  const { state } = useApp();
  const T = state.nightMode ? DARK : LIGHT;

  if (!state.toastMsg) return null;

  return (
    <View
      pointerEvents="none"
      style={{
        position: 'absolute',
        bottom: Platform.OS === 'ios' ? 110 : 80,
        left: 24,
        right: 24,
        zIndex: 9999,
        alignItems: 'center',
      }}
    >
      <View
        style={{
          backgroundColor: T.tx,
          paddingHorizontal: 20,
          paddingVertical: 12,
          borderRadius: 100,
          flexDirection: 'row',
          alignItems: 'center',
          gap: 8,
          shadowColor: '#000',
          shadowOpacity: 0.25,
          shadowRadius: 12,
          elevation: 12,
        }}
      >
        <Text style={{ color: T.bg, fontSize: 13, fontWeight: '700', textAlign: 'center' }}>
          {state.toastMsg}
        </Text>
      </View>
    </View>
  );
}

// ── App root ───────────────────────────────────────────────────────────────────
export default function App() {
  return (
    <AppProvider>
      <NavigationContainer>
        <View style={{ flex: 1 }}>
          <RootNavigator />
          <ToastOverlay />
        </View>
      </NavigationContainer>
    </AppProvider>
  );
}
