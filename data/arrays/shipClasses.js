import { Donbas } from "../classes/ships/Donbas.js";
import { Gesan } from "../classes/ships/Gesan.js";
import { Hyperion } from "../classes/ships/Hyperion.js";
import { Retion } from "../classes/ships/Retion.js";
import { Varrett } from "../classes/ships/Varrett.js";

export const shipClasses = [Retion.getInfo(), Varrett.getInfo(), Donbas.getInfo(), Gesan.getInfo(), Hyperion.getInfo()];

export const [retion, varrett, donbas, gesan, hyperion] = shipClasses;
