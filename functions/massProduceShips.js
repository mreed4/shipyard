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
    let newShip;

    if (!desiredClass && !desiredShipyard) {
      newShip = new Ship(getRandInfo("class"), getRandInfo("shipyard"));
    } else if (!desiredShipyard) {
      newShip = new Ship(desiredClass, getRandInfo("shipyard"));
    } else if (!desiredClass) {
      newShip = new Ship(getRandInfo("class"), desiredShipyard);
    } else {
      newShip = new Ship(desiredClass, desiredShipyard);
    }

    ships.push(newShip);
  }

  return ships;
}
