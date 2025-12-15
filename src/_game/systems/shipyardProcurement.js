// Shipyard Procurement System
// Handles ship procurement from orbital shipyards with specialty bonuses and relationship tracking

import { shipyards } from "../../data/shipyards";

const SHIP_TYPES = ["Fighter", "Frigate", "Cruiser", "Carrier", "Capital Ship"];

const SHIPYARDS = shipyards; // ["Earth Orbit", "Mars Orbit", "Rings of Saturn", "Lagrange 2", "Europa", "Luna"]

// Relationship tier thresholds (1000 points per tier)
const RELATIONSHIP_TIERS = {
  "New Vendor": { min: 0, max: 999 },
  Trusted: { min: 1000, max: 1999 },
  Preferred: { min: 2000, max: 2999 },
  "Elite Vendor": { min: 3000, max: 4000 },
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
  if (trust >= 3000) return 0.15; // Elite Vendor: +15%
  if (trust >= 2000) return 0.1; // Preferred: +10%
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

// Calculate trust gain from procurement (5 points per ship base)
export const calculateTrustGain = (ship, shipyardSpecialties) => {
  const baseTrust = 5;
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
      return parsed;
    } else {
      localStorage.removeItem("shipyard_specialties");
    }
  }

  // Fixed specialty distribution - each shipyard gets 2 ship types as specialties
  // Distribution ensures each type has 2-3 shipyards specializing in it
  const specialties = {
    "Earth Orbit": ["Carrier", "Capital Ship"],
    "Mars Orbit": ["Fighter", "Frigate"],
    "Rings of Saturn": ["Fighter", "Cruiser"],
    "Lagrange 2": ["Carrier", "Capital Ship"],
    Europa: ["Cruiser", "Capital Ship"],
    Luna: ["Frigate", "Carrier"],
    Titan: ["Fighter", "Cruiser"],
    Ceres: ["Frigate", "Capital Ship"],
  };

  localStorage.setItem("shipyard_specialties", JSON.stringify(specialties));
  return specialties;
};

// Calculate final ship stats with all bonuses applied
export const calculateFinalStats = (ship, shipyardName, shipyardSpecialties, relationshipTrust) => {
  const baseHP = ship.baseHitPoints;
  const baseDMG = ship.baseDamageOutput;

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
