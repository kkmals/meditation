import type { GameState, UserProgress, ReefState } from '../types';

const STORAGE_KEY = 'coral-reef-sanctuary';

const DEFAULT_USER_PROGRESS: UserProgress = {
  pearls: 0,
  totalFocusTime: 0,
  currentStreak: 0,
  longestStreak: 0,
  lastFocusDate: '',
  unlockedCorals: ['tube'], // Start with tube coral
  unlockedCreatures: [],
  sessions: [],
  level: 1,
  experiencePoints: 0,
};

const DEFAULT_REEF_STATE: ReefState = {
  corals: [],
  creatures: [],
  totalCorals: 0,
  healthyCorals: 0,
  failedCorals: 0,
};

export const getDefaultGameState = (): GameState => ({
  userProgress: DEFAULT_USER_PROGRESS,
  reefState: DEFAULT_REEF_STATE,
  currentSession: null,
});

export const saveGameState = (state: GameState): void => {
  try {
    const serialized = JSON.stringify(state);
    localStorage.setItem(STORAGE_KEY, serialized);
  } catch (error) {
    console.error('Failed to save game state:', error);
  }
};

export const loadGameState = (): GameState => {
  try {
    const serialized = localStorage.getItem(STORAGE_KEY);
    if (!serialized) {
      return getDefaultGameState();
    }
    const state = JSON.parse(serialized) as GameState;
    // Ensure new properties exist for backward compatibility
    return {
      ...getDefaultGameState(),
      ...state,
      userProgress: {
        ...DEFAULT_USER_PROGRESS,
        ...state.userProgress,
      },
      reefState: {
        ...DEFAULT_REEF_STATE,
        ...state.reefState,
      },
    };
  } catch (error) {
    console.error('Failed to load game state:', error);
    return getDefaultGameState();
  }
};

export const clearGameState = (): void => {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (error) {
    console.error('Failed to clear game state:', error);
  }
};

export const exportGameState = (): string => {
  const state = loadGameState();
  return JSON.stringify(state, null, 2);
};

export const importGameState = (json: string): boolean => {
  try {
    const state = JSON.parse(json) as GameState;
    saveGameState(state);
    return true;
  } catch (error) {
    console.error('Failed to import game state:', error);
    return false;
  }
};
