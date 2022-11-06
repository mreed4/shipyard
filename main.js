import { shipyards, earth, mars, rings, l2, europa, luna } from "./shipyards.js";
import { shipClasses, retion, varrett, donbas, gesan, hyperion } from "./shipClasses.js";

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

class Ship {
  constructor(shipName, shipClass, shipyard, yearBuilt, alignment) {
    this._shipName = shipName;
    this._shipClass = shipClass;
    this._shipyard = shipyard;
    this._yearBuilt = yearBuilt;
    this._alignment = alignment;
  }

  get shipName() {
    return this._shipName;
  }

  get shipClass() {
    return this._shipClass;
  }

  get shipyard() {
    return this._shipyard;
  }

  get yearBuilt() {
    return this._yearBuilt;
  }

  get alignment() {
    return this._alignment;
  }

  set shipName(string) {
    this._shipName = string;
  }

  set shipClass(objectOrString) {
    this._shipClass = objectOrString;
  }

  set shipyard(string) {
    this._shipyard = string;
  }

  set yearBuilt(num) {
    this._yearBuilt = num;
  }

  set alignment(string) {
    this._alignment = string;
  }

  shipId() {
    const isObject = typeof this._shipClass === "object";
    const letter = isObject ? this._shipClass.name.slice(0, 2) : this._shipClass.slice(0, 2);
    const min = 10000;
    const max = 100000;
    const num = Math.floor(Math.random() * (max - min)) + min;
    return `${letter}${num}`;
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
      age: 36,
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

function massProduce(desiredAmount, desiredClass, desiredShipyard) {
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

    ships.push([i, shipId, shipClass /*shipType*/, shipShipyard /*shipYearBuilt*/]);
  }

  return ships;
}

console.log(massProduce(25, "", mars));
