import { shipyards, earth, mars, rings, l2, europa, luna } from "./data/shipyards.js";
import { shipClasses, retion, varrett, donbas, gesan, hyperion } from "./data/shipClasses.js";
import { Ship } from "./data/classes/ship.js";

function getRandInfo(info) {
  if (info === "class") {
    return shipClasses[Math.floor(Math.random() * shipClasses.length)];
  } else if (info === "shipyard") {
    return shipyards[Math.floor(Math.random() * shipyards.length)];
  } else if (info === "year") {
    const min = 2300;
    const max = 2501;
    return Math.floor(Math.random() * (max - min)) + min;
  } else {
    const error = "ERROR Enter valid parameter";
    console.log(error);
  }
}

const ship0 = {
  shipName: "H.M.S. Ferdinand II",
  id: 90010,
  shipClass: retion,
  shipyard: "Mars Orbit",
  yearBuilt: 2472,
  alignment: "EDF",
  // faction: null,

  crewMembers: {
    captain: {
      name: "Geland Frode",
      age: 57,
      gender: "f",
      rating: 7,
      scoreTRE: 3102,
    },
    firstOfficer: {},
    navigators: {
      first: {
        name: "Johan Dermio",
        age: 27,
        gender: "m",
        rating: 5,
        scoreTRE: 3043,
      },
      second: {},
    },
    engineers: {
      first: {
        name: "Relana Regara",
        age: 25,
        gender: "t",
        rating: 7,
        scoreTRE: 2997,
      },
      second: {},
    },
  },
};

function massProduceShips(desiredAmount, desiredClass, desiredShipyard) {
  const ships = [];

  for (let i = 1; i <= desiredAmount; i++) {
    let shipName = `Test${i}`;
    let newShip;
    //
    /* Randmizers
     */
    const randYearBuilt = getRandInfo("year");
    const randShipClass = getRandInfo("class");
    const randShipyard = getRandInfo("shipyard");
    //
    /* Pretty logic for conditional class creation
     */
    const classAndYard = desiredClass && desiredShipyard;
    const classNoYard = desiredClass && !desiredShipyard;
    const yardNoClass = !desiredClass && desiredShipyard;
    //
    /* Conditionally Build class instances
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

    //
    /* 
    Use parts from generated class instances as items in array
    There will be a master array of all ships, and a sub-array per ship
     */
    const isObject = typeof newShip.shipClass === "object";
    const shipId = newShip.shipId();
    const shipClass = isObject ? newShip.shipClass.name : newShip.shipClass;
    const shipType = isObject ? newShip.shipClass.type : undefined;
    const shipShipyard = newShip.shipyard;
    const shipYearBuilt = newShip.yearBuilt;

    ships.push([/*shipName*/ shipId, shipClass /*shipType*/, shipShipyard /*shipYearBuilt*/, i]);
  }

  return ships;
}
