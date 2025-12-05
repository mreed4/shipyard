import { shipTypes } from "./shipTypes.js";

// Used in an external randomizer to randomly return a ship class
export const shipClasses = [
  shipTypes.Retion,
  shipTypes.Varrett,
  shipTypes.Donbas,
  shipTypes.Gesan,
  shipTypes.Hyperion,
  shipTypes.Letios,
  shipTypes.Kestrel,
  shipTypes.Corsair,
  shipTypes.Falcon,
  shipTypes.Sentinel,
  shipTypes.Tempest,
  shipTypes.Valkyrie,
  shipTypes.Titan,
  shipTypes.Phoenix,
  shipTypes.Nemesis,
];

// Destructure original ships for backwards compatibility
export const [retion, varrett, donbas, gesan, hyperion, letios] = shipClasses;
