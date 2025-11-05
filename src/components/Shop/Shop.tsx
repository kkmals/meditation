import React, { useState } from 'react';
import { useGame } from '../../contexts/GameContext';
import { CORAL_DEFINITIONS } from '../../data/corals';
import { CREATURE_DEFINITIONS } from '../../data/creatures';
import type { CoralDefinition, CreatureDefinition } from '../../types';
import './Shop.css';

type TabType = 'corals' | 'creatures';

const Shop: React.FC = () => {
  const { gameState, purchaseItem } = useGame();
  const [activeTab, setActiveTab] = useState<TabType>('corals');
  const [notification, setNotification] = useState<string | null>(null);

  const showNotification = (message: string) => {
    setNotification(message);
    setTimeout(() => setNotification(null), 3000);
  };

  const handlePurchase = (type: 'coral' | 'creature', id: string, cost: number, name: string) => {
    const success = purchaseItem(type, id, cost);
    if (success) {
      showNotification(`✨ ${name} unlocked!`);
    } else {
      showNotification(`❌ Not enough pearls! Need ${cost}, have ${gameState.userProgress.pearls}`);
    }
  };

  const canAfford = (cost: number) => gameState.userProgress.pearls >= cost;

  const isUnlocked = (type: 'coral' | 'creature', id: string) => {
    return type === 'coral'
      ? gameState.userProgress.unlockedCorals.includes(id as any)
      : gameState.userProgress.unlockedCreatures.includes(id as any);
  };

  const meetsRequirements = (item: CoralDefinition | CreatureDefinition) => {
    if ('minSessionMinutes' in item && item.minSessionMinutes) {
      // For corals with session requirements, check longest session
      const longestSession = Math.max(
        ...gameState.userProgress.sessions.map(s => s.duration),
        0
      );
      if (longestSession < item.minSessionMinutes) return false;
    }

    if ('requiredStreak' in item && item.requiredStreak) {
      if (gameState.userProgress.longestStreak < item.requiredStreak) return false;
    }

    if ('requiredCorals' in item && item.requiredCorals) {
      if (gameState.reefState.healthyCorals < item.requiredCorals) return false;
    }

    return true;
  };

  const getRequirementText = (item: CoralDefinition | CreatureDefinition): string | null => {
    if ('minSessionMinutes' in item && item.minSessionMinutes) {
      return `Requires ${item.minSessionMinutes}m session`;
    }
    if ('requiredStreak' in item && item.requiredStreak) {
      return `Requires ${item.requiredStreak}-day streak`;
    }
    if ('requiredCorals' in item && item.requiredCorals) {
      return `Requires ${item.requiredCorals} corals`;
    }
    return null;
  };

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'common':
        return '#94a3b8';
      case 'uncommon':
        return '#22c55e';
      case 'rare':
        return '#3b82f6';
      case 'legendary':
        return '#f59e0b';
      default:
        return '#94a3b8';
    }
  };

  const availableCorals = Object.values(CORAL_DEFINITIONS).filter(
    coral => !isUnlocked('coral', coral.id)
  );

  const availableCreatures = Object.values(CREATURE_DEFINITIONS).filter(
    creature => !isUnlocked('creature', creature.id)
  );

  return (
    <div className="shop-container">
      <div className="shop-header">
        <h2>Reef Shop</h2>
        <div className="pearl-balance">
          <span className="pearl-icon">💎</span>
          <span className="pearl-amount">{gameState.userProgress.pearls}</span>
          <span className="pearl-label">Pearls</span>
        </div>
      </div>

      {notification && (
        <div className="shop-notification">
          {notification}
        </div>
      )}

      <div className="shop-tabs">
        <button
          className={`tab ${activeTab === 'corals' ? 'active' : ''}`}
          onClick={() => setActiveTab('corals')}
        >
          Corals ({availableCorals.length})
        </button>
        <button
          className={`tab ${activeTab === 'creatures' ? 'active' : ''}`}
          onClick={() => setActiveTab('creatures')}
        >
          Creatures ({availableCreatures.length})
        </button>
      </div>

      <div className="shop-content">
        {activeTab === 'corals' && (
          <div className="items-grid">
            {availableCorals.length === 0 ? (
              <div className="empty-shop">
                <p>🎉 You've unlocked all corals!</p>
              </div>
            ) : (
              availableCorals.map((coral) => {
                const unlocked = isUnlocked('coral', coral.id);
                const affordable = canAfford(coral.cost);
                const meetsReqs = meetsRequirements(coral);
                const canBuy = !unlocked && affordable && meetsReqs;
                const reqText = getRequirementText(coral);

                return (
                  <div
                    key={coral.id}
                    className={`shop-item ${!meetsReqs ? 'locked' : ''} ${unlocked ? 'owned' : ''}`}
                  >
                    <div
                      className="item-preview"
                      style={{ backgroundColor: coral.color }}
                    >
                      <div className="item-icon coral-icon" />
                    </div>
                    <div className="item-info">
                      <div className="item-header">
                        <h3>{coral.name}</h3>
                        <span
                          className="rarity-badge"
                          style={{ backgroundColor: getRarityColor(coral.rarity) }}
                        >
                          {coral.rarity}
                        </span>
                      </div>
                      <p className="item-description">{coral.description}</p>
                      {reqText && !meetsReqs && (
                        <p className="requirement-text">🔒 {reqText}</p>
                      )}
                      <div className="item-footer">
                        <span className="item-cost">
                          💎 {coral.cost}
                        </span>
                        <button
                          className={`buy-btn ${canBuy ? '' : 'disabled'}`}
                          onClick={() => canBuy && handlePurchase('coral', coral.id, coral.cost, coral.name)}
                          disabled={!canBuy}
                        >
                          {unlocked ? 'Owned' : !affordable ? 'Too Expensive' : !meetsReqs ? 'Locked' : 'Buy'}
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        )}

        {activeTab === 'creatures' && (
          <div className="items-grid">
            {availableCreatures.length === 0 ? (
              <div className="empty-shop">
                <p>🎉 You've unlocked all creatures!</p>
              </div>
            ) : (
              availableCreatures.map((creature) => {
                const unlocked = isUnlocked('creature', creature.id);
                const affordable = canAfford(creature.cost);
                const meetsReqs = meetsRequirements(creature);
                const canBuy = !unlocked && affordable && meetsReqs;
                const reqText = getRequirementText(creature);

                return (
                  <div
                    key={creature.id}
                    className={`shop-item ${!meetsReqs ? 'locked' : ''} ${unlocked ? 'owned' : ''}`}
                  >
                    <div className="item-preview creature-preview">
                      <div className="item-icon creature-icon">
                        {getCreatureEmoji(creature.id)}
                      </div>
                    </div>
                    <div className="item-info">
                      <div className="item-header">
                        <h3>{creature.name}</h3>
                        <span
                          className="rarity-badge"
                          style={{ backgroundColor: getRarityColor(creature.rarity) }}
                        >
                          {creature.rarity}
                        </span>
                      </div>
                      <p className="item-description">{creature.description}</p>
                      {reqText && !meetsReqs && (
                        <p className="requirement-text">🔒 {reqText}</p>
                      )}
                      <div className="item-footer">
                        <span className="item-cost">
                          💎 {creature.cost}
                        </span>
                        <button
                          className={`buy-btn ${canBuy ? '' : 'disabled'}`}
                          onClick={() => canBuy && handlePurchase('creature', creature.id, creature.cost, creature.name)}
                          disabled={!canBuy}
                        >
                          {unlocked ? 'Owned' : !affordable ? 'Too Expensive' : !meetsReqs ? 'Locked' : 'Buy'}
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        )}
      </div>

      <div className="shop-footer">
        <p className="tip">💡 Tip: Earn pearls by completing focus sessions!</p>
      </div>
    </div>
  );
};

const getCreatureEmoji = (type: string): string => {
  const emojiMap: Record<string, string> = {
    clownfish: '🐠',
    angelfish: '🐟',
    seahorse: '🐴',
    starfish: '⭐',
    turtle: '🐢',
    octopus: '🐙',
    'manta-ray': '🦈',
    dolphin: '🐬',
    shark: '🦈',
  };
  return emojiMap[type] || '🐠';
};

export default Shop;
