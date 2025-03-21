import { Ship } from "../data/classes/Ship.js";
import { getRandInfo } from "./helpers/getRandInfo.js";

export function massProduceShips(
  desiredAmount = 5,
  // After this point are the class constructors
  desiredClass,
  desiredShipyard
) {
  const ships = [];

  for (let i = 1; i <= desiredAmount; i++) {
    const shipClass = desiredClass || getRandInfo("class");
    const shipyard = desiredShipyard || getRandInfo("shipyard");
    const newShip = new Ship(shipClass, shipyard);

    ships.push(newShip);
  }

  return ships.map((ship) => ship.getShipId());
}
