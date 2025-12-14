// Shipyard Procurement System
// Handles ship procurement from orbital shipyards with specialty bonuses and relationship tracking

import { shipyards } from "../../data/shipyards";

const SHIP_TYPES = ["Fighter", "Frigate", "Cruiser", "Carrier", "Capital Ship"];

const SHIPYARDS = shipyards; // ["Earth Orbit", "Mars Orbit", "Rings of Saturn", "Lagrange 2", "Europa", "Luna"]

// Relationship tier thresholds
const RELATIONSHIP_TIERS = {
  "New Vendor": { min: 0, max: 24 },
  Trusted: { min: 25, max: 49 },
  Preferred: { min: 50, max: 74 },
  "Elite Vendor": { min: 75, max: 100 },
};

// Calculate procurement cost based on ship displacement
export const calculateProcurementCost = (displacement) => {
  return Math.round((displacement / 1000) * 50);
};

// Calculate bulk discount percentage
export const calculateBulkDiscount = (shipCount) => {
  if (shipCount >= 10) return 30;
  if (shipCount >= 5) return 20;
  if (shipCount >= 3) return 10;
  return 0;
};

// Calculate specialty bonus (+5% HP/DMG if ship type matches shipyard specialty)
export const calculateSpecialtyBonus = (shipType, shipyardSpecialties) => {
  return shipyardSpecialties.includes(shipType) ? 0.05 : 0;
};

// Calculate relationship bonus based on trust level
export const calculateRelationshipBonus = (trust) => {
  if (trust >= 75) return 0.15;
  if (trust >= 50) return 0.1;
  return 0;
};

// Get relationship tier label from trust value
export const getRelationshipTier = (trust) => {
  for (const [tier, range] of Object.entries(RELATIONSHIP_TIERS)) {
    if (trust >= range.min && trust <= range.max) {
      return tier;
    }
  }
  return "New Vendor";
};

// Calculate trust gain from procurement
export const calculateTrustGain = (ship, shipyardSpecialties) => {
  const baseTrust = 3;
  const specialtyBonus = shipyardSpecialties.includes(ship.type) ? 2 : 0;
  return baseTrust + specialtyBonus;
};

// Initialize or retrieve shipyard specialties from localStorage
export const initializeShipyardSpecialties = () => {
  const stored = localStorage.getItem("shipyard_specialties");
  if (stored) {
    const parsed = JSON.parse(stored);
    // Check if stored data has correct shipyard names (validate first key)
    const storedKeys = Object.keys(parsed);
    const hasCorrectKeys = storedKeys.length > 0 && SHIPYARDS.includes(storedKeys[0]);

    if (hasCorrectKeys) {
      console.log("Loaded shipyard specialties from localStorage:", parsed);
      return parsed;
    } else {
      console.log("Old shipyard specialties format detected, regenerating...");
      localStorage.removeItem("shipyard_specialties");
    }
  }

  // Generate random specialties (2 per shipyard)
  const specialties = {};
  SHIPYARDS.forEach((shipyard) => {
    const shuffled = [...SHIP_TYPES].sort(() => Math.random() - 0.5);
    specialties[shipyard] = shuffled.slice(0, 2);
  });

  console.log("Generated new shipyard specialties:", specialties);
  localStorage.setItem("shipyard_specialties", JSON.stringify(specialties));
  return specialties;
};

// Calculate final ship stats with all bonuses applied
export const calculateFinalStats = (ship, shipyardName, shipyardSpecialties, relationshipTrust) => {
  const baseHP = ship.__gameData.baseHitPoints;
  const baseDMG = ship.__gameData.baseDamageOutput;

  const specialtyBonus = calculateSpecialtyBonus(ship.type, shipyardSpecialties[shipyardName] || []);
  const relationshipBonus = calculateRelationshipBonus(relationshipTrust);

  const totalMultiplier = 1 + specialtyBonus + relationshipBonus;

  return {
    finalHP: Math.round(baseHP * totalMultiplier),
    finalDMG: Math.round(baseDMG * totalMultiplier),
    specialtyBonus,
    relationshipBonus,
  };
};

export { SHIPYARDS, SHIP_TYPES, RELATIONSHIP_TIERS };
