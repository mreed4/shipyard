import { Ship } from "../data/classes/ship.js";
import { getRandInfo } from "./helpers/getRandInfo.js";

export function massProduceShips(desiredAmount = 5, desiredClass, desiredShipyard) {
  const ships = [];

  for (let i = 1; i <= desiredAmount; i++) {
    let shipName = `Test${i}`;
    let newShip;
    /* 
    
    Randomizers
     */
    const randYearBuilt = getRandInfo("year");
    const randShipClass = getRandInfo("class");
    const randShipyard = getRandInfo("shipyard");
    /* 

    Pretty logic for conditional class creation
     */
    const classAndYard = desiredClass && desiredShipyard;
    const classNoYard = desiredClass && !desiredShipyard;
    const yardNoClass = !desiredClass && desiredShipyard;
    /* 

    Conditionally build class instances
     */
    if (classAndYard) {
      newShip = new Ship(shipName, desiredClass, desiredShipyard, randYearBuilt, "USN");
    } else if (yardNoClass) {
      newShip = new Ship(shipName, randShipClass, desiredShipyard, randYearBuilt, "USN");
    } else if (classNoYard) {
      newShip = new Ship(shipName, desiredClass, randShipyard, randYearBuilt, "USN");
    } else {
      newShip = new Ship(shipName, randShipClass, randShipyard, randYearBuilt, "USN");
    }
    /* 

    Use parts from generated class instances as items in an array
    There will be a master array of all ships, and a sub-array per ship
     */
    const isObject = typeof newShip.shipClass === "object";
    const shipId = newShip.shipId();
    const shipClass = isObject ? newShip.shipClass.name : newShip.shipClass;
    const shipType = isObject ? newShip.shipClass.type : undefined;
    const shipShipyard = newShip.shipyard;
    const shipYearBuilt = newShip.yearBuilt;

    ships.push([i, shipId, shipClass, shipType, shipShipyard, shipYearBuilt]);
  }

  return ships;
}