import { shipTypes } from "./shipTypes.js";

// Used in an external randomizer to randomly return a ship class
export const shipClasses = [shipTypes.Retion, shipTypes.Varrett, shipTypes.Donbas, shipTypes.Gesan, shipTypes.Hyperion, shipTypes.Letios];

// Destructure to easily reference each ship class
export const [retion, varrett, donbas, gesan, hyperion, letios] = shipClasses;
