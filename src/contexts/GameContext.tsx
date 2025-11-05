import React, { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import type {
  GameState,
  FocusSession,
  CoralInstance,
  CoralType,
  CreatureType,
} from '../types';
import {
  saveGameState,
  loadGameState,
  getDefaultGameState,
} from '../utils/storage';
import {
  calculatePearlsForSession,
  calculateStreakBonus,
  calculateExperiencePoints,
  calculateLevel,
  getRandomCoralType,
  generateCoralPosition,
  determineReefZone,
  checkAndUpdateStreak,
} from '../utils/gameLogic';
import { v4 as uuidv4 } from 'uuid';

interface GameContextType {
  gameState: GameState;
  startSession: (durationMinutes: number) => void;
  completeSession: () => void;
  failSession: () => void;
  purchaseItem: (type: 'coral' | 'creature', id: string, cost: number) => boolean;
  unlockItem: (type: 'coral' | 'creature', id: string) => void;
  resetGame: () => void;
}

const GameContext = createContext<GameContextType | undefined>(undefined);

export const useGame = () => {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error('useGame must be used within a GameProvider');
  }
  return context;
};

interface GameProviderProps {
  children: ReactNode;
}

export const GameProvider: React.FC<GameProviderProps> = ({ children }) => {
  const [gameState, setGameState] = useState<GameState>(() => loadGameState());

  // Save state whenever it changes
  useEffect(() => {
    saveGameState(gameState);
  }, [gameState]);

  const startSession = (durationMinutes: number) => {
    const coralType = getRandomCoralType(gameState.userProgress.unlockedCorals);

    const session: FocusSession = {
      id: uuidv4(),
      startTime: Date.now(),
      duration: durationMinutes,
      completed: false,
      coralType,
      pearlsEarned: 0,
    };

    setGameState((prev) => ({
      ...prev,
      currentSession: session,
    }));
  };

  const completeSession = () => {
    if (!gameState.currentSession) return;

    const session = gameState.currentSession;
    const durationMinutes = session.duration;

    // Calculate rewards
    const basePearls = calculatePearlsForSession(durationMinutes);
    const streakBonus = calculateStreakBonus(gameState.userProgress.currentStreak);
    const pearlsEarned = Math.floor(basePearls * streakBonus);
    const xpEarned = calculateExperiencePoints(durationMinutes);

    // Update streak
    const { newStreak } = checkAndUpdateStreak(
      gameState.userProgress.lastFocusDate,
      gameState.userProgress.currentStreak
    );

    // Create coral instance
    const zone = determineReefZone(gameState.reefState.totalCorals);
    const position = generateCoralPosition(zone, gameState.reefState.corals);

    const newCoral: CoralInstance = {
      id: uuidv4(),
      type: session.coralType,
      position,
      zone,
      timestamp: Date.now(),
      sessionDuration: durationMinutes,
      isHealthy: true,
    };

    // Complete session
    const completedSession: FocusSession = {
      ...session,
      endTime: Date.now(),
      completed: true,
      pearlsEarned,
    };

    setGameState((prev) => {
      const newTotalXP = prev.userProgress.experiencePoints + xpEarned;
      const newLevel = calculateLevel(newTotalXP);

      return {
        ...prev,
        userProgress: {
          ...prev.userProgress,
          pearls: prev.userProgress.pearls + pearlsEarned,
          totalFocusTime: prev.userProgress.totalFocusTime + durationMinutes,
          currentStreak: newStreak,
          longestStreak: Math.max(prev.userProgress.longestStreak, newStreak),
          lastFocusDate: new Date().toISOString().split('T')[0],
          sessions: [...prev.userProgress.sessions, completedSession],
          experiencePoints: newTotalXP,
          level: newLevel,
        },
        reefState: {
          ...prev.reefState,
          corals: [...prev.reefState.corals, newCoral],
          totalCorals: prev.reefState.totalCorals + 1,
          healthyCorals: prev.reefState.healthyCorals + 1,
        },
        currentSession: null,
      };
    });
  };

  const failSession = () => {
    if (!gameState.currentSession) return;

    const session = gameState.currentSession;

    // Create bleached coral
    const zone = determineReefZone(gameState.reefState.totalCorals);
    const position = generateCoralPosition(zone, gameState.reefState.corals);

    const failedCoral: CoralInstance = {
      id: uuidv4(),
      type: session.coralType,
      position,
      zone,
      timestamp: Date.now(),
      sessionDuration: 0,
      isHealthy: false,
    };

    // Save failed session
    const failedSession: FocusSession = {
      ...session,
      endTime: Date.now(),
      completed: false,
      pearlsEarned: 0,
    };

    setGameState((prev) => ({
      ...prev,
      userProgress: {
        ...prev.userProgress,
        sessions: [...prev.userProgress.sessions, failedSession],
      },
      reefState: {
        ...prev.reefState,
        corals: [...prev.reefState.corals, failedCoral],
        totalCorals: prev.reefState.totalCorals + 1,
        failedCorals: prev.reefState.failedCorals + 1,
      },
      currentSession: null,
    }));
  };

  const purchaseItem = (
    type: 'coral' | 'creature',
    id: string,
    cost: number
  ): boolean => {
    if (gameState.userProgress.pearls < cost) {
      return false;
    }

    setGameState((prev) => {
      const updates: Partial<GameState> = {
        userProgress: {
          ...prev.userProgress,
          pearls: prev.userProgress.pearls - cost,
        },
      };

      if (type === 'coral') {
        updates.userProgress!.unlockedCorals = [
          ...prev.userProgress.unlockedCorals,
          id as CoralType,
        ];
      } else if (type === 'creature') {
        updates.userProgress!.unlockedCreatures = [
          ...prev.userProgress.unlockedCreatures,
          id as CreatureType,
        ];
      }

      return { ...prev, ...updates };
    });

    return true;
  };

  const unlockItem = (type: 'coral' | 'creature', id: string) => {
    setGameState((prev) => {
      const updates: Partial<GameState> = {};

      if (type === 'coral') {
        if (!prev.userProgress.unlockedCorals.includes(id as CoralType)) {
          updates.userProgress = {
            ...prev.userProgress,
            unlockedCorals: [...prev.userProgress.unlockedCorals, id as CoralType],
          };
        }
      } else if (type === 'creature') {
        if (!prev.userProgress.unlockedCreatures.includes(id as CreatureType)) {
          updates.userProgress = {
            ...prev.userProgress,
            unlockedCreatures: [
              ...prev.userProgress.unlockedCreatures,
              id as CreatureType,
            ],
          };
        }
      }

      return { ...prev, ...updates };
    });
  };

  const resetGame = () => {
    setGameState(getDefaultGameState());
  };

  const value: GameContextType = {
    gameState,
    startSession,
    completeSession,
    failSession,
    purchaseItem,
    unlockItem,
    resetGame,
  };

  return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
};
