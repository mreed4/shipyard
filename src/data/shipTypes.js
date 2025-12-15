// Import ship class variants
import { FighterVariants } from "./classes/Fighter";
import { FrigateVariants } from "./classes/Frigate";
import { CruiserVariants } from "./classes/Cruiser";
import { CarrierVariants } from "./classes/Carrier";
import { CapitalShipVariants } from "./classes/CapitalShip";

// Base stats for each ship type
export const baseShipStats = {
  Fighter: { baseHitPoints: 3000, baseDamageOutput: 250, displacement: 65_000, crewCapacity: 2 },
  Frigate: { baseHitPoints: 9000, baseDamageOutput: 650, displacement: 10_000_000, crewCapacity: 800 },
  Cruiser: { baseHitPoints: 12000, baseDamageOutput: 850, displacement: 18_000_000, crewCapacity: 3_500 },
  Carrier: { baseHitPoints: 24000, baseDamageOutput: 1800, displacement: 75_000_000, crewCapacity: 4_000 },
  "Capital Ship": { baseHitPoints: 28000, baseDamageOutput: 2400, displacement: 650_000_000, crewCapacity: 7_000 },
};

// NOTE: Procurement cost calculated dynamically: Math.round(displacement / 1000 * 50) CR

// Combine all ship variants into a single export
export const shipTypes = {
  // Fighters
  ...FighterVariants,

  // Frigates
  ...FrigateVariants,

  // Cruisers
  ...CruiserVariants,

  // Carriers
  ...CarrierVariants,

  // Capital Ships
  ...CapitalShipVariants,
};
