import React, { useState, useEffect } from 'react';
import { useTimer } from '../../hooks/useTimer';
import { useGame } from '../../contexts/GameContext';
import { formatTime, getMotivationalMessage } from '../../utils/gameLogic';
import { CORAL_DEFINITIONS } from '../../data/corals';
import './Timer.css';

const Timer: React.FC = () => {
  const { timerState, start, pause, resume, stop, fail, progress } = useTimer({
    onComplete: handleTimerComplete,
  });
  const { gameState, startSession, completeSession, failSession } = useGame();

  const [selectedDuration, setSelectedDuration] = useState(25);
  const [showMessage, setShowMessage] = useState(false);
  const [message, setMessage] = useState('');
  const [showMidpointMessage, setShowMidpointMessage] = useState(false);

  function handleTimerComplete() {
    completeSession();
    showMotivationalMessage('complete');
  }

  const showMotivationalMessage = (phase: 'start' | 'midpoint' | 'complete' | 'failed') => {
    const msg = getMotivationalMessage(
      phase,
      selectedDuration,
      gameState.userProgress.currentStreak
    );
    setMessage(msg);
    setShowMessage(true);
    setTimeout(() => setShowMessage(false), 5000);
  };

  const handleStart = () => {
    startSession(selectedDuration);
    start(selectedDuration, 'focus');
    showMotivationalMessage('start');
  };

  const handlePause = () => {
    pause();
  };

  const handleResume = () => {
    resume();
  };

  const handleStop = () => {
    if (window.confirm('If you stop now, the coral will bleach. Are you sure?')) {
      failSession();
      fail();
      showMotivationalMessage('failed');
      setTimeout(() => stop(), 2000);
    }
  };

  const handleReset = () => {
    stop();
  };

  // Show midpoint message
  useEffect(() => {
    if (timerState.status === 'running' && progress >= 49 && progress <= 51 && !showMidpointMessage) {
      setShowMidpointMessage(true);
      showMotivationalMessage('midpoint');
    }
  }, [progress, timerState.status, showMidpointMessage]);

  const currentCoral = gameState.currentSession
    ? CORAL_DEFINITIONS[gameState.currentSession.coralType]
    : null;

  const getCoralGrowthStage = (): number => {
    if (progress < 25) return 1;
    if (progress < 50) return 2;
    if (progress < 75) return 3;
    return 4;
  };

  return (
    <div className="timer-container">
      <div className="timer-header">
        <h2>Focus Session</h2>
        <div className="stats-mini">
          <span className="pearl-count">💎 {gameState.userProgress.pearls}</span>
          <span className="streak-count">🔥 {gameState.userProgress.currentStreak} days</span>
        </div>
      </div>

      {showMessage && (
        <div className="motivational-message">
          {message}
        </div>
      )}

      {timerState.status === 'idle' && (
        <div className="timer-setup">
          <h3>Set your focus time</h3>
          <div className="duration-buttons">
            {[15, 25, 30, 45, 50, 60].map((duration) => (
              <button
                key={duration}
                className={`duration-btn ${selectedDuration === duration ? 'active' : ''}`}
                onClick={() => setSelectedDuration(duration)}
              >
                {duration}m
              </button>
            ))}
          </div>
          <button className="start-btn" onClick={handleStart}>
            Start Focus Session
          </button>
        </div>
      )}

      {(timerState.status === 'running' || timerState.status === 'paused') && currentCoral && (
        <div className="timer-active">
          <div className="coral-preview">
            <div
              className={`coral-growing stage-${getCoralGrowthStage()}`}
              style={{ backgroundColor: currentCoral.color }}
            >
              <div className="growth-progress" style={{ height: `${progress}%` }} />
            </div>
            <p className="coral-name">{currentCoral.name}</p>
          </div>

          <div className="timer-display">
            <svg className="progress-ring" width="200" height="200">
              <circle
                className="progress-ring-bg"
                cx="100"
                cy="100"
                r="90"
                fill="none"
                stroke="#1e3a5f"
                strokeWidth="10"
              />
              <circle
                className="progress-ring-fill"
                cx="100"
                cy="100"
                r="90"
                fill="none"
                stroke={currentCoral.color}
                strokeWidth="10"
                strokeDasharray={`${2 * Math.PI * 90}`}
                strokeDashoffset={`${2 * Math.PI * 90 * (1 - progress / 100)}`}
                transform="rotate(-90 100 100)"
              />
            </svg>
            <div className="time-remaining">
              {formatTime(timerState.remainingSeconds)}
            </div>
          </div>

          <div className="timer-controls">
            {timerState.status === 'running' && (
              <>
                <button className="control-btn pause" onClick={handlePause}>
                  Pause
                </button>
                <button className="control-btn stop" onClick={handleStop}>
                  Stop
                </button>
              </>
            )}
            {timerState.status === 'paused' && (
              <>
                <button className="control-btn resume" onClick={handleResume}>
                  Resume
                </button>
                <button className="control-btn stop" onClick={handleStop}>
                  Stop
                </button>
              </>
            )}
          </div>
        </div>
      )}

      {timerState.status === 'completed' && (
        <div className="timer-complete">
          <div className="success-icon">🎉</div>
          <h3>Session Complete!</h3>
          <p>Your coral has grown beautifully!</p>
          <button className="restart-btn" onClick={handleReset}>
            Start Another Session
          </button>
        </div>
      )}

      {timerState.status === 'failed' && (
        <div className="timer-failed">
          <div className="failed-icon">😔</div>
          <h3>Coral Bleached</h3>
          <p>Don't give up! Try again.</p>
          <button className="restart-btn" onClick={handleReset}>
            Try Again
          </button>
        </div>
      )}
    </div>
  );
};

export default Timer;
