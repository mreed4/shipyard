import { createShip } from "./createShip.js";

export function massProduceShips(desiredAmount = 5, desiredClass, desiredShipyard) {
  const ships = [];

  for (let i = 1; i <= desiredAmount; i++) {
    const newShip = createShip(desiredClass, desiredShipyard);
    ships.push(newShip);
  }

  return ships;
}
