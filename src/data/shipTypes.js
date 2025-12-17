// Import ship class variants
import { FighterVariants } from "./classes/Fighter";
import { FrigateVariants } from "./classes/Frigate";
import { CruiserVariants } from "./classes/Cruiser";
import { CarrierVariants } from "./classes/Carrier";
import { CapitalShipVariants } from "./classes/CapitalShip";

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
