import type { Milestone } from '../types';

export const MILESTONES: Milestone[] = [
  {
    id: 'first-session',
    name: 'First Dive',
    description: 'Complete your first focus session',
    requirement: 1,
    type: 'sessions',
    reward: { pearls: 10 },
    achieved: false,
  },
  {
    id: 'ten-sessions',
    name: 'Growing Reef',
    description: 'Complete 10 focus sessions',
    requirement: 10,
    type: 'sessions',
    reward: { pearls: 25, unlockCoral: 'brain' },
    achieved: false,
  },
  {
    id: 'five-hours',
    name: 'Dedicated Caretaker',
    description: 'Focus for 5 hours total',
    requirement: 5,
    type: 'hours',
    reward: { pearls: 30 },
    achieved: false,
  },
  {
    id: 'week-streak',
    name: 'Weekly Warrior',
    description: 'Maintain a 7-day focus streak',
    requirement: 7,
    type: 'streak',
    reward: { pearls: 50, unlockCreature: 'clownfish' },
    achieved: false,
  },
  {
    id: 'fifty-corals',
    name: 'Reef Builder',
    description: 'Grow 50 corals',
    requirement: 50,
    type: 'corals',
    reward: { pearls: 75, unlockCoral: 'blue' },
    achieved: false,
  },
  {
    id: 'ten-hours',
    name: 'Focus Master',
    description: 'Focus for 10 hours total',
    requirement: 10,
    type: 'hours',
    reward: { pearls: 100 },
    achieved: false,
  },
  {
    id: 'month-streak',
    name: 'Monthly Champion',
    description: 'Maintain a 30-day focus streak',
    requirement: 30,
    type: 'streak',
    reward: { pearls: 200, unlockCoral: 'golden-fan', unlockCreature: 'dolphin' },
    achieved: false,
  },
  {
    id: 'hundred-corals',
    name: 'Sanctuary Guardian',
    description: 'Grow 100 corals',
    requirement: 100,
    type: 'corals',
    reward: { pearls: 250, unlockCreature: 'shark' },
    achieved: false,
  },
];

export const checkMilestones = (
  milestones: Milestone[],
  sessions: number,
  hours: number,
  streak: number,
  corals: number
): Milestone[] => {
  return milestones.map((milestone) => {
    if (milestone.achieved) return milestone;

    let requirementMet = false;
    switch (milestone.type) {
      case 'sessions':
        requirementMet = sessions >= milestone.requirement;
        break;
      case 'hours':
        requirementMet = hours >= milestone.requirement;
        break;
      case 'streak':
        requirementMet = streak >= milestone.requirement;
        break;
      case 'corals':
        requirementMet = corals >= milestone.requirement;
        break;
    }

    return { ...milestone, achieved: requirementMet };
  });
};
