import { useState } from 'react';
import { GameProvider } from './contexts/GameContext';
import Timer from './components/Timer/Timer';
import Reef from './components/Reef/Reef';
import Shop from './components/Shop/Shop';
import Navigation from './components/Navigation/Navigation';
import './App.css';

type View = 'timer' | 'reef' | 'shop';

function App() {
  const [currentView, setCurrentView] = useState<View>('timer');

  const renderView = () => {
    switch (currentView) {
      case 'timer':
        return <Timer />;
      case 'reef':
        return <Reef />;
      case 'shop':
        return <Shop />;
      default:
        return <Timer />;
    }
  };

  return (
    <GameProvider>
      <div className="app">
        <header className="app-header">
          <h1 className="app-title">
            <span className="coral-emoji">🪸</span>
            Coral Reef Sanctuary
          </h1>
          <p className="app-subtitle">Grow your focus, grow your reef</p>
        </header>

        <main className="app-main">
          {renderView()}
        </main>

        <Navigation currentView={currentView} onNavigate={setCurrentView} />
      </div>
    </GameProvider>
  );
}

export default App;
