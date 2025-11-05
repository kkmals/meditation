import React, { useState } from 'react';
import { useGame } from '../../contexts/GameContext';
import { CORAL_DEFINITIONS } from '../../data/corals';
import { formatDuration } from '../../utils/gameLogic';
import './Reef.css';

const Reef: React.FC = () => {
  const { gameState } = useGame();
  const [selectedCoral, setSelectedCoral] = useState<string | null>(null);

  const { corals, healthyCorals, failedCorals, totalCorals } = gameState.reefState;

  const getCoralSize = (sessionDuration: number): string => {
    if (sessionDuration >= 60) return 'large';
    if (sessionDuration >= 30) return 'medium';
    return 'small';
  };

  const handleCoralClick = (coralId: string) => {
    setSelectedCoral(coralId === selectedCoral ? null : coralId);
  };

  const selectedCoralData = selectedCoral
    ? corals.find((c) => c.id === selectedCoral)
    : null;

  return (
    <div className="reef-container">
      <div className="reef-header">
        <h2>Your Coral Reef Sanctuary</h2>
        <div className="reef-stats">
          <div className="stat">
            <span className="stat-value">{totalCorals}</span>
            <span className="stat-label">Total Corals</span>
          </div>
          <div className="stat">
            <span className="stat-value">{healthyCorals}</span>
            <span className="stat-label">Healthy</span>
          </div>
          <div className="stat">
            <span className="stat-value">{failedCorals}</span>
            <span className="stat-label">Bleached</span>
          </div>
          <div className="stat">
            <span className="stat-value">{formatDuration(gameState.userProgress.totalFocusTime)}</span>
            <span className="stat-label">Total Focus</span>
          </div>
        </div>
      </div>

      {corals.length === 0 ? (
        <div className="empty-reef">
          <div className="empty-reef-icon">🌊</div>
          <h3>Your reef is empty</h3>
          <p>Start a focus session to grow your first coral!</p>
        </div>
      ) : (
        <div className="reef-ocean">
          <div className="ocean-surface" />
          <div className="reef-bed">
            {corals.map((coral) => {
              const coralDef = CORAL_DEFINITIONS[coral.type];
              const size = getCoralSize(coral.sessionDuration);
              const isSelected = selectedCoral === coral.id;

              return (
                <div
                  key={coral.id}
                  className={`coral ${size} ${coral.isHealthy ? 'healthy' : 'bleached'} ${
                    isSelected ? 'selected' : ''
                  }`}
                  style={{
                    left: `${coral.position.x}%`,
                    top: `${coral.position.y}%`,
                    backgroundColor: coral.isHealthy ? coralDef.color : '#6b7280',
                  }}
                  onClick={() => handleCoralClick(coral.id)}
                  title={coralDef.name}
                >
                  <div className="coral-shape" />
                  {isSelected && (
                    <div className="coral-tooltip">
                      <strong>{coralDef.name}</strong>
                      <p>
                        {coral.isHealthy ? 'Healthy' : 'Bleached'} •{' '}
                        {formatDuration(coral.sessionDuration)}
                      </p>
                      <small>
                        {new Date(coral.timestamp).toLocaleDateString()}
                      </small>
                    </div>
                  )}
                </div>
              );
            })}

            {/* Add some decorative elements */}
            <div className="reef-decoration bubble" style={{ left: '20%', animationDelay: '0s' }} />
            <div className="reef-decoration bubble" style={{ left: '50%', animationDelay: '2s' }} />
            <div className="reef-decoration bubble" style={{ left: '80%', animationDelay: '4s' }} />
          </div>

          {/* Zone indicators */}
          <div className="zone-indicators">
            <div className="zone shallow">Shallow Reef</div>
            <div className="zone mid">Mid Reef</div>
            <div className="zone deep">Deep Reef</div>
          </div>
        </div>
      )}

      {selectedCoralData && (
        <div className="coral-details-panel">
          <button
            className="close-details"
            onClick={() => setSelectedCoral(null)}
          >
            ✕
          </button>
          <h3>{CORAL_DEFINITIONS[selectedCoralData.type].name}</h3>
          <div className="detail-row">
            <span>Status:</span>
            <span className={selectedCoralData.isHealthy ? 'status-healthy' : 'status-bleached'}>
              {selectedCoralData.isHealthy ? 'Healthy' : 'Bleached'}
            </span>
          </div>
          <div className="detail-row">
            <span>Session Duration:</span>
            <span>{formatDuration(selectedCoralData.sessionDuration)}</span>
          </div>
          <div className="detail-row">
            <span>Zone:</span>
            <span className="zone-badge">{selectedCoralData.zone}</span>
          </div>
          <div className="detail-row">
            <span>Grown on:</span>
            <span>{new Date(selectedCoralData.timestamp).toLocaleString()}</span>
          </div>
          <p className="coral-description">
            {CORAL_DEFINITIONS[selectedCoralData.type].description}
          </p>
        </div>
      )}
    </div>
  );
};

export default Reef;
