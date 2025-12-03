import { createShip } from "./createShip.js";
import { getRandInfo } from "./helpers/getRandInfo.js";

export function massProduceShips(desiredAmount = 5, desiredClass, desiredShipyard) {
  const ships = [];

  for (let i = 1; i <= desiredAmount; i++) {
    const shipType = desiredClass || getRandInfo("class");
    const shipyard = desiredShipyard || getRandInfo("shipyard");
    const yearBuilt = getRandInfo("year");

    const newShip = createShip(shipType, shipyard, yearBuilt);

    ships.push(newShip);
  }

  return ships;
}
