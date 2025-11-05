import type { CreatureDefinition } from '../types';

export const CREATURE_DEFINITIONS: Record<string, CreatureDefinition> = {
  clownfish: {
    id: 'clownfish',
    name: 'Clownfish',
    rarity: 'common',
    cost: 15,
    description: 'A cheerful orange and white fish that brings life to your reef.',
    requiredCorals: 3,
  },
  angelfish: {
    id: 'angelfish',
    name: 'Angelfish',
    rarity: 'common',
    cost: 20,
    description: 'Graceful fish with beautiful patterns.',
    requiredCorals: 5,
  },
  seahorse: {
    id: 'seahorse',
    name: 'Seahorse',
    rarity: 'uncommon',
    cost: 35,
    description: 'Delicate creature that dances through the coral.',
    requiredCorals: 10,
  },
  starfish: {
    id: 'starfish',
    name: 'Starfish',
    rarity: 'uncommon',
    cost: 30,
    description: 'A five-pointed star resting on your reef.',
    requiredCorals: 8,
  },
  turtle: {
    id: 'turtle',
    name: 'Sea Turtle',
    rarity: 'rare',
    cost: 75,
    description: 'Ancient and wise, gliding through your sanctuary.',
    requiredCorals: 25,
  },
  octopus: {
    id: 'octopus',
    name: 'Octopus',
    rarity: 'rare',
    cost: 80,
    description: 'Intelligent creature with eight graceful arms.',
    requiredCorals: 30,
  },
  'manta-ray': {
    id: 'manta-ray',
    name: 'Manta Ray',
    rarity: 'rare',
    cost: 100,
    description: 'Majestic ray soaring through the deep waters.',
    requiredCorals: 40,
  },
  dolphin: {
    id: 'dolphin',
    name: 'Dolphin',
    rarity: 'legendary',
    cost: 150,
    description: 'Playful and intelligent companion of the seas.',
    requiredCorals: 75,
  },
  shark: {
    id: 'shark',
    name: 'Reef Shark',
    rarity: 'legendary',
    cost: 200,
    description: 'The apex predator, guardian of your sanctuary.',
    requiredCorals: 100,
  },
};

export const getCreatureDefinition = (type: string): CreatureDefinition | undefined => {
  return CREATURE_DEFINITIONS[type];
};

export const getAvailableCreatures = (
  unlockedTypes: string[],
  totalCorals: number
): CreatureDefinition[] => {
  return Object.values(CREATURE_DEFINITIONS).filter((creature) => {
    if (!unlockedTypes.includes(creature.id)) return false;
    if (creature.requiredCorals && totalCorals < creature.requiredCorals) return false;
    return true;
  });
};
