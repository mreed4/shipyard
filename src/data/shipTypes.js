// Import ship classes
import { FighterClasses } from "./classes/Fighter";
import { FrigateClasses } from "./classes/Frigate";
import { CruiserClasses } from "./classes/Cruiser";
import { CarrierClasses } from "./classes/Carrier";
import { CapitalShipClasses } from "./classes/CapitalShip";

// NOTE: Procurement cost calculated dynamically: Math.round(displacement / 1000 * 50) CR

// Combine all ship classes into a single export
export const shipTypes = {
  // Fighters
  ...FighterClasses,

  // Frigates
  ...FrigateClasses,

  // Cruisers
  ...CruiserClasses,

  // Carriers
  ...CarrierClasses,

  // Capital Ships
  ...CapitalShipClasses,
};
