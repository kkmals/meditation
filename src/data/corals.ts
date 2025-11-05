import type { CoralDefinition } from '../types';

export const CORAL_DEFINITIONS: Record<string, CoralDefinition> = {
  tube: {
    id: 'tube',
    name: 'Tube Coral',
    rarity: 'common',
    cost: 0,
    description: 'A basic coral with cylindrical tubes. Perfect for beginners.',
    color: '#FF6B9D',
  },
  brain: {
    id: 'brain',
    name: 'Brain Coral',
    rarity: 'common',
    cost: 10,
    description: 'Named for its grooved surface resembling a brain.',
    color: '#FFA07A',
  },
  staghorn: {
    id: 'staghorn',
    name: 'Staghorn Coral',
    rarity: 'uncommon',
    cost: 25,
    description: 'Branching coral that grows like antlers.',
    color: '#FFD700',
  },
  fan: {
    id: 'fan',
    name: 'Sea Fan',
    rarity: 'uncommon',
    cost: 30,
    description: 'Delicate fan-shaped coral that sways with the current.',
    color: '#FF69B4',
  },
  pillar: {
    id: 'pillar',
    name: 'Pillar Coral',
    rarity: 'uncommon',
    cost: 35,
    description: 'Tall columns rising from the reef floor.',
    color: '#DDA0DD',
  },
  blue: {
    id: 'blue',
    name: 'Blue Coral',
    rarity: 'rare',
    cost: 50,
    description: 'Rare coral with striking blue coloration.',
    color: '#4169E1',
    minSessionMinutes: 30,
  },
  'red-fan': {
    id: 'red-fan',
    name: 'Red Sea Fan',
    rarity: 'rare',
    cost: 75,
    description: 'Vibrant red fan coral found in deeper waters.',
    color: '#DC143C',
    requiredStreak: 7,
  },
  black: {
    id: 'black',
    name: 'Black Coral',
    rarity: 'rare',
    cost: 100,
    description: 'Mysterious dark coral from the deep reef.',
    color: '#2F4F4F',
    minSessionMinutes: 60,
  },
  'golden-fan': {
    id: 'golden-fan',
    name: 'Golden Sea Fan',
    rarity: 'legendary',
    cost: 200,
    description: 'The rarest coral in the sanctuary, shimmering with golden hues.',
    color: '#FFD700',
    requiredStreak: 30,
  },
};

export const getCoralDefinition = (type: string): CoralDefinition | undefined => {
  return CORAL_DEFINITIONS[type];
};

export const getAvailableCorals = (
  unlockedTypes: string[],
  currentStreak: number,
  totalMinutes: number
): CoralDefinition[] => {
  return Object.values(CORAL_DEFINITIONS).filter((coral) => {
    if (!unlockedTypes.includes(coral.id)) return false;
    if (coral.requiredStreak && currentStreak < coral.requiredStreak) return false;
    if (coral.minSessionMinutes && totalMinutes < coral.minSessionMinutes) return false;
    return true;
  });
};
