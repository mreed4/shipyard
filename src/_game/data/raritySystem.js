export const rarityTiers = {
  common: {
    name: "Common",
    dropRate: 0.5,
    color: "hsl(0, 0%, 60%)",
    statMultiplier: 1.0,
    crewGradeWeights: { F: 0.4, D: 0.4, C: 0.2, B: 0, A: 0, S: 0 },
  },
  uncommon: {
    name: "Uncommon",
    dropRate: 0.3,
    color: "hsl(120, 40%, 50%)",
    statMultiplier: 1.2,
    crewGradeWeights: { F: 0.2, D: 0.3, C: 0.3, B: 0.2, A: 0, S: 0 },
  },
  rare: {
    name: "Rare",
    dropRate: 0.15,
    color: "hsl(210, 60%, 55%)",
    statMultiplier: 1.5,
    crewGradeWeights: { F: 0, D: 0.2, C: 0.3, B: 0.3, A: 0.2, S: 0 },
  },
  epic: {
    name: "Epic",
    dropRate: 0.04,
    color: "hsl(280, 70%, 60%)",
    statMultiplier: 2.0,
    crewGradeWeights: { F: 0, D: 0, C: 0.2, B: 0.3, A: 0.4, S: 0.1 },
  },
  legendary: {
    name: "Legendary",
    dropRate: 0.01,
    color: "hsl(45, 100%, 55%)",
    statMultiplier: 3.0,
    crewGradeWeights: { F: 0, D: 0, C: 0, B: 0.2, A: 0.5, S: 0.3 },
  },
};

export const shipRarityDistribution = {
  Letios: { common: 0.6, uncommon: 0.3, rare: 0.09, epic: 0.009, legendary: 0.001 },
  Hyperion: { common: 0.5, uncommon: 0.35, rare: 0.12, epic: 0.025, legendary: 0.005 },
  Retion: { common: 0.4, uncommon: 0.35, rare: 0.18, epic: 0.06, legendary: 0.01 },
  Gesan: { common: 0.3, uncommon: 0.4, rare: 0.2, epic: 0.08, legendary: 0.02 },
  Varrett: { common: 0.2, uncommon: 0.35, rare: 0.3, epic: 0.12, legendary: 0.03 },
  Donbas: { common: 0.1, uncommon: 0.3, rare: 0.35, epic: 0.2, legendary: 0.05 },
};

export function getRarityValue(rarity) {
  const values = { common: 1, uncommon: 2, rare: 3, epic: 4, legendary: 5 };
  return values[rarity] || 0;
}
