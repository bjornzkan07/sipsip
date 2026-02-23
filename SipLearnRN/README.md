# 🍷 Sip & Learn — React Native

A gamified wine & culture quiz app built with Expo.

## ✨ Features

- 5 quiz categories: Gastronomy, Pop Culture, History, Art, Geography
- Training slides → MCQ + matching quiz flow
- ⚡ Energy system (5 charges, -1 per level/wrong answer, +1/hr recovery)
- 🏆 XP & 10 levelling tiers (Novice → Legend)
- 🔥 Daily streak tracking
- 🗺️ Visual learning map with locked/active/complete nodes
- ⏱️ Blitz mode (60-second speed round)
- 📅 Daily Challenge + Weak Areas practice
- 🛍️ Shop: energy refills, Pro pack, ad-free toggle, cosmetic badges
- 🌙 Light / Dark theme
- Persistent state via AsyncStorage

## 🚀 Quick Start

### Prerequisites
- [Node.js](https://nodejs.org/) 18+
- [Expo Go](https://expo.dev/go) app on your phone

### Install & Run

```bash
# 1. Install dependencies
cd SipLearnRN
npm install

# 2. Start the dev server
npx expo start

# 3. Scan the QR code with Expo Go (iOS / Android)
```

> **Tip:** press `i` for iOS Simulator or `a` for Android emulator in the terminal.

## 📁 Project Structure

```
SipLearnRN/
├── App.js                      # Root: navigation + toast overlay
├── app.json                    # Expo config
├── package.json
└── src/
    ├── theme.js                # Colors (LIGHT/DARK), XP levels, achievements
    ├── data/
    │   └── content.js          # All quiz content (5 categories)
    ├── context/
    │   └── AppContext.js       # Global state (useReducer + AsyncStorage)
    └── screens/
        ├── OnboardingScreen.js # Register / login + avatar picker
        ├── PlayScreen.js       # Home: categories, special modes, energy bar
        ├── LessonScreen.js     # Training slides + MCQ + matching + completion
        ├── MapScreen.js        # Visual learning path per category
        ├── PracticeScreen.js   # Completed levels history + weak areas
        ├── ShopScreen.js       # Energy, Pro pack, cosmetics
        ├── SocialScreen.js     # Global leaderboard + friend search
        └── ProfileScreen.js    # Stats, achievements, settings, sign out
```

## 🎮 Navigation Flow

```
Onboarding (no user)
  └─ Register / Login
       └─ Main Tabs
            ├─ Play
            ├─ Practice
            ├─ Map
            ├─ Shop
            └─ Social
                 ├─ Profile (modal)
                 └─ Lesson (modal, full-screen)
```

## 🛠️ Key Dependencies

| Package | Purpose |
|---|---|
| `expo-linear-gradient` | Gradient headers, cards, buttons |
| `@react-native-async-storage/async-storage` | State persistence |
| `@react-navigation/native-stack` | Root stack (Onboarding → Main → Lesson) |
| `@react-navigation/bottom-tabs` | 5-tab main navigation |

## 🔧 Adding More Content

Open `src/data/content.js`. Each category follows this shape:

```js
{
  id: 'mycategory',
  name: 'My Category',
  emoji: '🎯',
  gradient: ['#color1', '#color2'],
  topics: [
    {
      id: 'mytopic',
      name: 'My Topic',
      levels: [
        {
          id: 'level1',
          title: 'Level 1',
          training: [
            { title: 'Slide Title', text: 'Fact text...', image: '🎯', highlight: 'key phrase' }
          ],
          questions: [
            { type: 'mcq', question: '...?', options: ['A','B','C','D'], correct: 0, explain: '...' },
            { type: 'match', instruction: 'Match these', pairs: [{ term: '...', def: '...' }] }
          ]
        }
      ]
    }
  ]
}
```

---

Built with ❤️ using React Native + Expo
