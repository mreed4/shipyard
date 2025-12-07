import { rarityTiers } from "../systems/raritySystem";
import { gachaPools, refundRates } from "../systems/gachaSystem";
import { shipTypes } from "../../data/shipTypes";
import { createShip } from "../../functions/createShip";
import { crewData } from "../../data/crew";

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

export function performMultiPull(poolKey, count, playerCurrency, playerCollection, guaranteeSystem) {
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

export function pullShipWithRarity(pool, rarity, forcedShipType = null) {
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

export function pullCrewWithRarity(rarity) {
  const crew = createGachaCrewMember(rarity);
  crew.rarity = rarity;
  return crew;
}

function createGachaCrewMember(rarity) {
  // TRE ranges based on rarity - ensures grade aligns with rarity
  const treRangesByRarity = {
    legendary: { min: 4400, max: 4500 }, // S grade only
    epic: { min: 3900, max: 4399 }, // B-A grades
    rare: { min: 3500, max: 3899 }, // C-B grades
    uncommon: { min: 3300, max: 3499 }, // D-C grades
    common: { min: 2999, max: 3299 }, // F-D grades
  };

  const { min, max } = treRangesByRarity[rarity];

  // Generate gender
  const gender = Math.random() < 0.5 ? "F" : "M";

  // Generate birthplace
  const birthplace = crewData.birthplace[Math.floor(Math.random() * crewData.birthplace.length)];

  // Generate TRE score within rarity-constrained range
  let scoreTRE = Math.floor(Math.random() * (max - min + 1)) + min;

  // Apply SS3 birthplace bonus (if applicable and doesn't exceed max)
  if (birthplace === "SS3") {
    const adjustments = [
      { threshold: 3300, increment: 1300 },
      { threshold: 3500, increment: 1100 },
      { threshold: 3900, increment: 750 },
    ];

    for (const { threshold, increment } of adjustments) {
      if (scoreTRE < threshold) {
        scoreTRE = Math.min(scoreTRE + increment, max); // Don't exceed rarity max
        break;
      }
    }
  }

  // Calculate grade from TRE score
  const getGrade = (scoreTRE) => {
    if (scoreTRE >= 4400) return "S";
    if (scoreTRE >= 4200) return "A";
    if (scoreTRE >= 3900) return "B";
    if (scoreTRE >= 3500) return "C";
    if (scoreTRE >= 3300) return "D";
    return "F";
  };

  const grade = getGrade(scoreTRE);

  // Generate name
  const lastName = crewData.names.last[Math.floor(Math.random() * crewData.names.last.length)];
  const firstNameKey = gender === "M" ? "male" : "female";
  const firstName = crewData.names.first[firstNameKey][Math.floor(Math.random() * crewData.names.first[firstNameKey].length)];
  const name = `${firstName} ${lastName}`;

  // Generate age
  let age = Math.floor(Math.random() * (66 - 20)) + 20;
  if (age >= 39) {
    age = Math.random() < 0.7 ? age - 20 : age;
  }

  // Generate ID
  const [firstName_, lastName_] = name.split(" ");
  const namePartFirst = firstName_[0];
  const namePartLast = lastName_.slice(0, 3).toUpperCase().padEnd(3, "x");
  const namePart = namePartFirst + namePartLast;
  const serialPart = Math.floor(Math.random() * (100000000000 - 10000000000)) + 10000000000;
  const birthplacePart = birthplace.slice(0, 3).toUpperCase();
  const id = [namePart, grade, serialPart, birthplacePart].join("/");

  return {
    id,
    name,
    gender,
    age,
    birthplace,
    scoreTRE,
    grade,
  };
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
  return {
    duration: rarity === "legendary" ? 3000 : rarity === "epic" ? 2000 : 1500,
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
