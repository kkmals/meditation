import React from 'react';
import './Navigation.css';

interface NavigationProps {
  currentView: 'timer' | 'reef' | 'shop';
  onNavigate: (view: 'timer' | 'reef' | 'shop') => void;
}

const Navigation: React.FC<NavigationProps> = ({ currentView, onNavigate }) => {
  return (
    <nav className="navigation">
      <button
        className={`nav-btn ${currentView === 'timer' ? 'active' : ''}`}
        onClick={() => onNavigate('timer')}
      >
        <span className="nav-icon">⏱️</span>
        <span className="nav-label">Focus</span>
      </button>
      <button
        className={`nav-btn ${currentView === 'reef' ? 'active' : ''}`}
        onClick={() => onNavigate('reef')}
      >
        <span className="nav-icon">🪸</span>
        <span className="nav-label">Reef</span>
      </button>
      <button
        className={`nav-btn ${currentView === 'shop' ? 'active' : ''}`}
        onClick={() => onNavigate('shop')}
      >
        <span className="nav-icon">🏪</span>
        <span className="nav-label">Shop</span>
      </button>
    </nav>
  );
};

export default Navigation;
