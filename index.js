import { retion, varrett, donbas, gesan, hyperion, letios } from "./data/arrays/shipClasses.js";
import { earth, mars, rings, l2, europa, luna, shipyards } from "./data/arrays/shipyards.js";
import { massProduceShips } from "./functions/massProduceShips.js";
import { Ship } from "./data/classes/Ship.js";

let ships = massProduceShips(10, false, "", luna);

let basicData = ships.map((ship) => {
  let shipName;
  let shipClass;
  let shipyard;
  let info;
  if (ship.length === 2) {
    // Length will be 2 if second argument in massProduceShips is "true"
    shipName = ship[0];
    shipClass = ship[1].shipClass.name;
    shipyard = ship[1].shipyard;
    info = [{ shipName }, { shipClass }, { shipyard }];
  } else {
    shipClass = ship.shipClass.name;
    shipyard = ship.shipyard;
    info = [{ shipClass }, { shipyard }];
  }

  return info;
});

let varrettOnly = basicData.filter((ship) => ship[0].shipClass === "Varrett");

let crewMembers = ships.map((ship) => ship.crewMembers);

let shipIds = ships.map((ship) => ship.shipId);

console.log(shipIds);
