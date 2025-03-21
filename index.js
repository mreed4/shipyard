import { retion, varrett, donbas, gesan, hyperion, letios } from "./data/arrays/ship/shipClasses.js";
import { earth, mars, rings, l2, europa, luna, shipyards } from "./data/arrays/ship/shipyards.js";
import { massProduceShips } from "./functions/massProduceShips.js";
import { generateCrewMembers } from "./functions/getCrewInfo.js";
import { Ship } from "./data/classes/Ship.js";
import { CrewMember } from "./data/classes/CrewMember.js";
import { getRandInfo } from "./functions/helpers/getRandInfo.js";

let ships = massProduceShips(30, gesan);
let crewMembers = generateCrewMembers(25, "id");

console.log(crewMembers);
