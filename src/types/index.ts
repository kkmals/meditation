// Coral and Marine Life Types
export type CoralRarity = 'common' | 'uncommon' | 'rare' | 'legendary';
export type CoralType =
  | 'tube'
  | 'brain'
  | 'staghorn'
  | 'fan'
  | 'pillar'
  | 'blue'
  | 'red-fan'
  | 'black'
  | 'golden-fan';

export type CreatureType =
  | 'clownfish'
  | 'angelfish'
  | 'seahorse'
  | 'starfish'
  | 'turtle'
  | 'octopus'
  | 'manta-ray'
  | 'dolphin'
  | 'shark';

export interface CoralDefinition {
  id: CoralType;
  name: string;
  rarity: CoralRarity;
  cost: number;
  description: string;
  color: string;
  minSessionMinutes?: number; // Minimum session length to unlock
  requiredStreak?: number; // Streak required to unlock
}

export interface CreatureDefinition {
  id: CreatureType;
  name: string;
  rarity: CoralRarity;
  cost: number;
  description: string;
  requiredCorals?: number; // Number of corals needed before this creature appears
}

// Reef Types
export interface CoralInstance {
  id: string;
  type: CoralType;
  position: { x: number; y: number };
  zone: 'shallow' | 'mid' | 'deep';
  timestamp: number;
  sessionDuration: number; // Minutes
  isHealthy: boolean; // false if session was abandoned
}

export interface CreatureInstance {
  id: string;
  type: CreatureType;
  position: { x: number; y: number };
}

export interface ReefState {
  corals: CoralInstance[];
  creatures: CreatureInstance[];
  totalCorals: number;
  healthyCorals: number;
  failedCorals: number;
}

// Session Types
export interface FocusSession {
  id: string;
  startTime: number;
  endTime?: number;
  duration: number; // in minutes
  completed: boolean;
  coralType: CoralType;
  pearlsEarned: number;
}

// User Progress Types
export interface UserProgress {
  pearls: number;
  totalFocusTime: number; // in minutes
  currentStreak: number;
  longestStreak: number;
  lastFocusDate: string; // ISO date string
  unlockedCorals: CoralType[];
  unlockedCreatures: CreatureType[];
  sessions: FocusSession[];
  level: number;
  experiencePoints: number;
}

// Game State
export interface GameState {
  userProgress: UserProgress;
  reefState: ReefState;
  currentSession: FocusSession | null;
}

// Milestone Types
export interface Milestone {
  id: string;
  name: string;
  description: string;
  requirement: number;
  type: 'sessions' | 'hours' | 'streak' | 'corals';
  reward: {
    pearls?: number;
    unlockCoral?: CoralType;
    unlockCreature?: CreatureType;
  };
  achieved: boolean;
}

// Settings Types
export interface AppSettings {
  soundEnabled: boolean;
  musicVolume: number;
  sfxVolume: number;
  notificationsEnabled: boolean;
  defaultSessionLength: number; // in minutes
  breakLength: number; // in minutes
  longBreakLength: number;
  sessionsUntilLongBreak: number;
  deepFocusMode: boolean; // Strict mode - no leaving app
}

// Timer State
export type TimerStatus = 'idle' | 'running' | 'paused' | 'completed' | 'failed';

export interface TimerState {
  status: TimerStatus;
  remainingSeconds: number;
  totalSeconds: number;
  sessionType: 'focus' | 'break' | 'longBreak';
}
