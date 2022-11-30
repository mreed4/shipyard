import { Ship } from "../data/classes/Ship.js";
import { getRandInfo } from "./helpers/getRandInfo.js";

export function massProduceShips(
  desiredAmount = 5,
  includeTestname = false,
  desiredClass = getRandInfo("class"),
  desiredShipyard = getRandInfo("shipyard"),
  desiredYearBuilt = getRandInfo("year"),
  desiredAlignment = "USN"
) {
  if (desiredAmount === "") {
    desiredAmount = 5;
  }
  const ships = [];

  for (let i = 1; i <= desiredAmount; i++) {
    let shipName = `Test${i}`;
    let newShip = new Ship(desiredClass, desiredShipyard, desiredYearBuilt, desiredAlignment);

    if (includeTestname) {
      ships.push([shipName, newShip]);
    } else {
      ships.push(newShip);
    }
  }

  return ships;
}
