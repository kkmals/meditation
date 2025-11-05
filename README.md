# 🪸 Coral Reef Sanctuary

A gamified focus and productivity app that helps you build better habits by growing a vibrant virtual coral reef. Inspired by apps like Forest, Coral Reef Sanctuary motivates users to stay focused by transforming their concentration time into beautiful underwater ecosystems.

![Coral Reef Sanctuary](https://img.shields.io/badge/version-1.0.0-blue)
![React](https://img.shields.io/badge/React-19.1.1-61dafb)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9.3-blue)
![PWA](https://img.shields.io/badge/PWA-Enabled-success)

## ✨ Features

### 🎯 Core Functionality

- **Focus Timer**: Pomodoro-style timer with customizable durations (15, 25, 30, 45, 50, 60 minutes)
- **Visual Progress**: Watch your coral grow in real-time as you stay focused
- **Motivational Messages**: Encouraging messages throughout your focus journey
- **Consequences**: Corals bleach if you abandon a session early, providing gentle accountability

### 🎨 Coral Reef Visualization

- **Dynamic Reef Growth**: Every completed session adds a new coral to your reef
- **Multiple Zones**: Shallow, mid, and deep reef zones unlock as you progress
- **Coral Variety**: 9 different coral types with varying rarities
- **Interactive**: Click on any coral to see details about when and how it was grown
- **Beautiful Animations**: Gentle waves, bubbles, and coral swaying effects

### 💎 Reward System

- **Pearls Currency**: Earn pearls for every completed focus session
- **Session Bonuses**: Longer sessions earn proportionally more pearls
- **Streak Rewards**: Daily streaks provide bonus multipliers (7-day: 20%, 30-day: 50%)
- **Experience Points**: Gain XP to level up your sanctuary

### 🏪 Shop System

- **Unlock Corals**: Purchase new coral types with earned pearls
- **Marine Creatures**: Add fish, turtles, dolphins, and more to your reef
- **Rarity Tiers**: Common, uncommon, rare, and legendary items
- **Requirements**: Some items unlock after achieving specific milestones

### 📊 Progress Tracking

- **Streak Counter**: Track your daily focus streak
- **Statistics**: View total corals, healthy vs. bleached, and total focus time
- **Session History**: Complete log of all focus sessions
- **Milestones**: Achievements for reaching focus goals

### 🌊 Ocean-Themed UI

- **Calming Aesthetics**: Beautiful gradient ocean backgrounds
- **Smooth Animations**: Floating corals, rising bubbles, and wave effects
- **Responsive Design**: Works on desktop, tablet, and mobile devices
- **PWA Support**: Install as a standalone app on any device

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd meditation
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

### Building for Production

```bash
npm run build
```

The built files will be in the `dist` directory. The app is configured as a PWA and can be deployed to any static hosting service.

### Preview Production Build

```bash
npm run preview
```

## 🎮 How to Use

### Starting a Focus Session

1. Navigate to the **Focus** tab
2. Select your desired focus duration (15-60 minutes)
3. Click "Start Focus Session"
4. A coral polyp will appear and grow as you stay focused
5. Complete the session to add a healthy coral to your reef

### Viewing Your Reef

1. Navigate to the **Reef** tab
2. See all the corals you've grown
3. Click on any coral to view its details
4. Watch for the different zones (shallow, mid, deep) as your reef expands

### Shopping for Items

1. Navigate to the **Shop** tab
2. Browse available corals and creatures
3. Use your earned pearls to unlock new items
4. Check requirements for rare and legendary items

## 📁 Project Structure

```
src/
├── components/          # React components
│   ├── Timer/          # Focus timer component
│   ├── Reef/           # Reef visualization component
│   ├── Shop/           # Shop system component
│   └── Navigation/     # Navigation bar component
├── contexts/           # React contexts
│   └── GameContext.tsx # Global game state management
├── hooks/              # Custom React hooks
│   └── useTimer.ts     # Timer functionality hook
├── types/              # TypeScript type definitions
│   └── index.ts        # All type definitions
├── data/               # Static data and definitions
│   ├── corals.ts       # Coral definitions
│   ├── creatures.ts    # Creature definitions
│   └── milestones.ts   # Milestone definitions
├── utils/              # Utility functions
│   ├── gameLogic.ts    # Game mechanics and calculations
│   └── storage.ts      # Local storage management
├── App.tsx             # Main app component
├── main.tsx            # App entry point
└── index.css           # Global styles
```

## 🛠️ Technologies Used

- **React 19**: UI framework
- **TypeScript**: Type-safe development
- **Vite**: Fast build tool and dev server
- **Vite PWA Plugin**: Progressive Web App support
- **Local Storage**: Client-side data persistence
- **CSS3**: Animations and styling

## 🎨 Customization

### Adding New Coral Types

Edit `src/data/corals.ts`:

```typescript
{
  id: 'my-coral',
  name: 'My Coral',
  rarity: 'rare',
  cost: 50,
  description: 'A unique coral type',
  color: '#FF6B9D',
}
```

### Modifying Reward Calculations

Edit `src/utils/gameLogic.ts` to adjust:
- Pearl rewards per session
- Streak bonus multipliers
- Experience point calculations
- Level progression

### Changing Visual Theme

Modify colors in:
- `src/App.css`: Main background gradients
- Component-specific CSS files: Component colors and effects
- `vite.config.ts`: PWA theme colors

## 📱 Progressive Web App (PWA)

This app is configured as a PWA and can be installed on any device:

1. **Desktop**: Look for the install icon in your browser's address bar
2. **Mobile**: Use "Add to Home Screen" from your browser menu
3. **Offline Support**: The app works offline after initial load

## 🔄 Data Persistence

All game data is automatically saved to local storage:
- Progress persists across sessions
- No account or internet required
- Data stays on your device

To reset progress, clear your browser's local storage or use browser dev tools.

## 🎯 Future Enhancements

Potential features for future versions:

- [ ] Cloud sync for cross-device progress
- [ ] Social features (leaderboards, friend reefs)
- [ ] Ambient ocean sounds during focus sessions
- [ ] More marine life and decorations
- [ ] Custom themes and color palettes
- [ ] Focus session analytics and insights
- [ ] Export/import progress data
- [ ] Dark/light mode toggle
- [ ] Collaborative focus sessions

## 🤝 Contributing

Contributions are welcome! Please feel free to submit issues or pull requests.

## 📄 License

This project is open source and available under the MIT License.

## 🙏 Acknowledgments

- Inspired by [Forest](https://www.forestapp.cc/) - A focus app that plants real trees
- Ocean theme inspired by coral reef conservation efforts
- Built with love for productivity and marine life

---

**Made with 🪸 and ⏱️ for better focus habits**
