import { retion, varrett, donbas, gesan, hyperion, letios } from "./data/arrays/ship/shipClasses.js";
import { earth, mars, rings, l2, europa, luna, shipyards } from "./data/arrays/ship/shipyards.js";
import { massProduceShips } from "./functions/massProduceShips.js";
import { Ship } from "./data/classes/Ship.js";

let ships = massProduceShips(5, gesan);

let crewMembers = ships.map((ship) => ship.crewMembers.deckMasters);

let shipIds = ships.map((ship) => ship.shipId);

console.log(crewMembers);
