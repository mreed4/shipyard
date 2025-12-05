import { rarityTiers } from "../data/raritySystem";
import { gachaPools, refundRates } from "../data/gachaSystem";
import { shipTypes } from "../../data/shipTypes";
import { createShip } from "../../functions/createShip";
import { createCrewMember } from "../../functions/createCrewMember";

export function performGachaPull(poolKey, playerCurrency, playerCollection = null) {
  const pool = gachaPools[poolKey];

  if (!pool) {
    return { success: false, error: "Invalid pool" };
  }

  // Check if player can afford
  if (!canAfford(pool.cost, playerCurrency)) {
    return { success: false, error: "Insufficient currency" };
  }

  // Determine pull type (ship or crew)
  const pullType = determinePullType(pool);

  // Determine rarity
  const rarity = determineRarity(pool.guaranteedRarity);

  // Pull item
  const item = pullType === "ship" ? pullShip(pool, rarity) : pullCrew(rarity);

  return {
    success: true,
    item,
    rarity,
    pullType,
    animation: generatePullAnimation(rarity),
    costPaid: pool.cost,
  };
}

export function performMultiPull(poolKey, count, playerCurrency, playerCollection, pitySystem) {
  const results = [];
  let updatedCurrency = { ...playerCurrency };
  const pool = gachaPools[poolKey];

  if (!pool) {
    return { success: false, error: "Invalid pool" };
  }

  for (let i = 0; i < count; i++) {
    // Check if can afford
    if (!canAfford(pool.cost, updatedCurrency)) {
      break;
    }

    const result = performGachaPull(poolKey, updatedCurrency, playerCollection);

    if (!result.success) break;

    // Check pity if system provided
    if (pitySystem) {
      const forcedRarity = pitySystem.checkPity(poolKey, result.rarity);
      if (forcedRarity) {
        const pullType = determinePullType(pool);
        result.rarity = forcedRarity;
        result.item = pullType === "ship" ? pullShipWithRarity(pool, forcedRarity) : pullCrewWithRarity(forcedRarity);
        result.isPityPull = true;
      }
      pitySystem.incrementCounter(poolKey);
    }

    results.push(result);

    // Deduct cost
    Object.entries(pool.cost).forEach(([currency, amount]) => {
      updatedCurrency[currency] -= amount;
    });

    // Add item to collection for duplicate checking
    if (playerCollection) {
      if (result.pullType === "ship") {
        playerCollection.ships = [...(playerCollection.ships || []), result.item];
      } else {
        playerCollection.crew = [...(playerCollection.crew || []), result.item];
      }
    }
  }

  return {
    success: true,
    pulls: results,
    bestPull: results.length > 0 ? getBestPull(results) : null,
    totalPulls: results.length,
  };
}

function determineRarity(guaranteedMinimum = null) {
  const roll = Math.random();
  let cumulative = 0;

  const adjustedRarities = guaranteedMinimum ? adjustRaritiesForGuarantee(guaranteedMinimum) : rarityTiers;

  for (const [key, tier] of Object.entries(adjustedRarities)) {
    cumulative += tier.dropRate;
    if (roll <= cumulative) return key;
  }

  return "common";
}

function pullShip(pool, rarity) {
  return pullShipWithRarity(pool, rarity);
}

function pullShipWithRarity(pool, rarity, forcedShipType = null) {
  // Filter ships by the rolled rarity
  const shipsOfRarity = Object.entries(shipTypes).filter(([key, ship]) => ship.rarity === rarity);

  if (shipsOfRarity.length === 0) {
    console.error(`No ships found for rarity: ${rarity}`);
    return null;
  }

  // Randomly select one ship from the filtered list
  const randomIndex = Math.floor(Math.random() * shipsOfRarity.length);
  const [shipKey, baseShipType] = shipsOfRarity[randomIndex];

  const ship = createShip(baseShipType);

  // Set rarity (already has correct base stats from shipTypes.js)
  ship.rarity = rarity;

  return ship;
}

function pullCrew(rarity) {
  return pullCrewWithRarity(rarity);
}

function pullCrewWithRarity(rarity) {
  const crew = createCrewMember();

  // Override grade based on rarity
  const gradeWeights = rarityTiers[rarity].crewGradeWeights;
  const grade = weightedRandomSelect(gradeWeights);

  // Recalculate TRE score to match grade
  crew.grade = grade;
  crew.scoreTRE = generateTREForGrade(grade);
  crew.rarity = rarity;

  return crew;
}

function generateTREForGrade(grade) {
  const ranges = {
    S: [95, 100],
    A: [85, 94],
    B: [70, 84],
    C: [55, 69],
    D: [40, 54],
    F: [0, 39],
  };

  const [min, max] = ranges[grade];
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function weightedRandomSelect(weights) {
  const roll = Math.random();
  let cumulative = 0;

  for (const [key, weight] of Object.entries(weights)) {
    cumulative += weight;
    if (roll <= cumulative) return key;
  }

  return Object.keys(weights)[0];
}

function adjustRaritiesForGuarantee(minimum) {
  const tierOrder = ["common", "uncommon", "rare", "epic", "legendary"];
  const minIndex = tierOrder.indexOf(minimum);

  const adjusted = {};
  let totalProb = 0;

  tierOrder.forEach((tier, index) => {
    if (index >= minIndex) {
      adjusted[tier] = rarityTiers[tier];
      totalProb += rarityTiers[tier].dropRate;
    }
  });

  // Normalize probabilities
  Object.keys(adjusted).forEach((tier) => {
    adjusted[tier] = {
      ...rarityTiers[tier],
      dropRate: rarityTiers[tier].dropRate / totalProb,
    };
  });

  return adjusted;
}

function canAfford(cost, playerCurrency) {
  return Object.entries(cost).every(([currency, amount]) => playerCurrency[currency] >= amount);
}

function determinePullType(pool) {
  if (pool.pullTypes.length === 1) return pool.pullTypes[0];

  const roll = Math.random();
  return roll <= (pool.typeWeights?.ship || 0.5) ? "ship" : "crew";
}

function generatePullAnimation(rarity) {
  const tier = rarityTiers[rarity];
  return {
    duration: rarity === "legendary" ? 3000 : rarity === "epic" ? 2000 : 1500,
    color: tier.color,
    particles: rarity === "legendary" ? 100 : rarity === "epic" ? 50 : 30,
  };
}

function getBestPull(results) {
  return results.reduce((best, curr) => {
    const bestValue = getRarityValue(best.rarity);
    const currValue = getRarityValue(curr.rarity);
    return currValue > bestValue ? curr : best;
  });
}

function getRarityValue(rarity) {
  const values = { common: 1, uncommon: 2, rare: 3, epic: 4, legendary: 5 };
  return values[rarity] || 0;
}

export function deductCurrency(currency, cost) {
  const updated = { ...currency };
  Object.entries(cost).forEach(([type, amount]) => {
    updated[type] = Math.max(0, (updated[type] || 0) - amount);
  });
  return updated;
}

export function addCurrency(currency, rewards) {
  const updated = { ...currency };
  Object.entries(rewards).forEach(([type, amount]) => {
    updated[type] = (updated[type] || 0) + amount;
  });
  return updated;
}
