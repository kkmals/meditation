import type { CoralType, CoralInstance } from '../types';

export const calculatePearlsForSession = (durationMinutes: number): number => {
  // Base: 1 pearl per 5 minutes
  const basePearls = Math.floor(durationMinutes / 5);

  // Bonus for longer sessions (1.5x for 50+ minutes)
  const bonus = durationMinutes >= 50 ? Math.floor(basePearls * 0.5) : 0;

  return basePearls + bonus;
};

export const calculateStreakBonus = (streak: number): number => {
  if (streak >= 7) return 1.2; // 20% bonus for week streak
  if (streak >= 30) return 1.5; // 50% bonus for month streak
  return 1.0;
};

export const calculateExperiencePoints = (durationMinutes: number): number => {
  return durationMinutes * 10; // 10 XP per minute
};

export const calculateLevel = (xp: number): number => {
  // Level = sqrt(XP / 100), rounded down, minimum 1
  return Math.max(1, Math.floor(Math.sqrt(xp / 100)));
};

export const getRandomCoralType = (unlockedCorals: CoralType[]): CoralType => {
  if (unlockedCorals.length === 0) return 'tube';
  const randomIndex = Math.floor(Math.random() * unlockedCorals.length);
  return unlockedCorals[randomIndex];
};

export const generateCoralPosition = (
  zone: 'shallow' | 'mid' | 'deep',
  existingCorals: CoralInstance[]
): { x: number; y: number } => {
  // Generate position based on zone
  let yRange: [number, number];
  switch (zone) {
    case 'shallow':
      yRange = [60, 80];
      break;
    case 'mid':
      yRange = [35, 60];
      break;
    case 'deep':
      yRange = [10, 35];
      break;
  }

  // Try to find a non-overlapping position (simple approach)
  let attempts = 0;
  let position: { x: number; y: number };

  do {
    position = {
      x: Math.random() * 80 + 10, // 10-90% of width
      y: Math.random() * (yRange[1] - yRange[0]) + yRange[0],
    };
    attempts++;
  } while (
    attempts < 10 &&
    existingCorals.some((coral) => {
      const dx = coral.position.x - position.x;
      const dy = coral.position.y - position.y;
      return Math.sqrt(dx * dx + dy * dy) < 5; // Minimum 5% distance
    })
  );

  return position;
};

export const determineReefZone = (totalCorals: number): 'shallow' | 'mid' | 'deep' => {
  if (totalCorals < 10) return 'shallow';
  if (totalCorals < 30) return 'mid';
  return 'deep';
};

export const checkAndUpdateStreak = (
  lastFocusDate: string,
  currentStreak: number
): { newStreak: number; isNewDay: boolean } => {
  const today = new Date().toISOString().split('T')[0];

  if (!lastFocusDate) {
    return { newStreak: 1, isNewDay: true };
  }

  if (lastFocusDate === today) {
    return { newStreak: currentStreak, isNewDay: false };
  }

  const lastDate = new Date(lastFocusDate);
  const todayDate = new Date(today);
  const diffTime = todayDate.getTime() - lastDate.getTime();
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays === 1) {
    // Consecutive day
    return { newStreak: currentStreak + 1, isNewDay: true };
  } else {
    // Streak broken
    return { newStreak: 1, isNewDay: true };
  }
};

export const getMotivationalMessage = (
  phase: 'start' | 'midpoint' | 'complete' | 'failed',
  _sessionMinutes: number,
  streak?: number
): string => {
  const messages = {
    start: [
      'A coral polyp is settling in your reef – help it grow by staying focused!',
      'Dive in! Your reef flourishes when you stay on task.',
      'Time to nurture your sanctuary. Stay focused!',
      'The ocean is calm. Channel that calm and focus.',
    ],
    midpoint: [
      'Halfway there – your coral is growing strong!',
      'Keep going! The fish are excited to see a new coral.',
      'Excellent focus! Your reef is thriving.',
      'Steady progress! Your sanctuary grows with each moment.',
    ],
    complete: [
      'Success! A beautiful coral has grown in your reef.',
      'Well done – you stayed focused and your reef just got more vibrant!',
      'Magnificent! Your dedication shines like a pearl.',
      'Your coral has bloomed! The reef celebrates your focus.',
    ],
    failed: [
      'The coral couldn\'t survive the interruption. It happens – let\'s try again!',
      'The coral bleached, but you can revive your reef with another session.',
      'Don\'t worry – even the ocean has rough waves. Try again!',
      'The polyp needs continuous care. You\'ve got this next time!',
    ],
  };

  const messageList = messages[phase];
  let message = messageList[Math.floor(Math.random() * messageList.length)];

  // Add streak bonus message if applicable
  if (phase === 'complete' && streak && streak > 1) {
    message += ` You're on a ${streak}-day streak!`;
  }

  return message;
};

export const formatTime = (seconds: number): string => {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
};

export const formatDuration = (minutes: number): string => {
  if (minutes < 60) {
    return `${minutes}m`;
  }
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return mins > 0 ? `${hours}h ${mins}m` : `${hours}h`;
};
