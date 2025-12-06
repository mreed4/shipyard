import { shipTypes } from "./shipTypes.js";

// Used in an external randomizer to randomly return a ship class
export const shipClasses = [
  shipTypes.Retion,
  shipTypes.Varrett,
  shipTypes.Donbas,
  shipTypes.Gesan,
  shipTypes.Hyperion,
  shipTypes.Letios,
  shipTypes.Drakon,
  shipTypes.Jakarta,
  shipTypes.Zephyr,
  shipTypes.Lagos,
  shipTypes.Moros,
  shipTypes.Thessia,
  shipTypes.Kronos,
  shipTypes.Olympus,
  shipTypes.Nairobi,
  shipTypes.Talos,
  shipTypes.Kyoto,
  shipTypes.Cairo,
  shipTypes.Sydney,
  shipTypes.Bangkok,
  shipTypes.Nyx,
  shipTypes.Mumbai,
  shipTypes.Erebus,
  shipTypes.Havana,
  shipTypes.Singapore,
];

// Destructure original ships for backwards compatibility
export const [retion, varrett, donbas, gesan, hyperion, letios] = shipClasses;
