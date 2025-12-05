export const rarityTiers = {
  common: {
    name: "Common",
    dropRate: 0.5,
    statMultiplier: 1.0,
    crewGradeWeights: { F: 0.4, D: 0.4, C: 0.2, B: 0, A: 0, S: 0 },
  },
  uncommon: {
    name: "Uncommon",
    dropRate: 0.3,
    statMultiplier: 1.2,
    crewGradeWeights: { F: 0.2, D: 0.3, C: 0.3, B: 0.2, A: 0, S: 0 },
  },
  rare: {
    name: "Rare",
    dropRate: 0.15,
    statMultiplier: 1.5,
    crewGradeWeights: { F: 0, D: 0.2, C: 0.3, B: 0.3, A: 0.2, S: 0 },
  },
  epic: {
    name: "Epic",
    dropRate: 0.04,
    statMultiplier: 2.0,
    crewGradeWeights: { F: 0, D: 0, C: 0.2, B: 0.3, A: 0.4, S: 0.1 },
  },
  legendary: {
    name: "Legendary",
    dropRate: 0.01,
    statMultiplier: 3.0,
    crewGradeWeights: { F: 0, D: 0, C: 0, B: 0.2, A: 0.5, S: 0.3 },
  },
};

export function getRarityValue(rarity) {
  const values = { common: 1, uncommon: 2, rare: 3, epic: 4, legendary: 5 };
  return values[rarity] || 0;
}
