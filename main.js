import { shipyards } from "./shipyards";

const shipClasses = [
  // https://en.wikipedia.org/wiki/Ship_class
  /*
   */
  /* Retion */ {
    name: "Retion",
    type: "Cruiser",
    displacement: 3000000,
    crewCapacity: 3025,
    info: "",
    /*
     */
    engines: {
      count: 6,
      make: "Medin Industries",
      model: "Gibraltar IV",
      features: {
        warpDrive: true,
        slipSpace: false,
        atmos: true,
      },
    },
    /*
     */
    armament: {},
  },
  /* Varrett */ {
    name: "Varrett",
    type: "Dreadnought",
    displacement: 6000000,
    crewCapacity: 1575,
    info: "",
    /*
     */
    engines: {
      count: 7,
      make: "Novadyne Ltd.",
      model: "Mk. 2",
      features: {
        warpDrive: true,
        slipSpace: true,
        atmos: false,
      },
    },
    /*
     */
    armament: {},
  },
  "Donbas",
  "Gesan",
  "Hyperion",
];

const [retion, varrett, donbas, gesan, hyperion] = shipClasses;

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
  constructor(name, shipClass, shipyard, yearBuilt, alignment) {
    this._name = name;
    this._shipClass = shipClass;
    this._shipyard = shipyard;
    this._yearBuilt = yearBuilt;
    this._alignment = alignment;
  }

  get name() {
    return this._name;
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

  set name(string) {
    this._name = string;
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
      newShip = new Ship((shipName = `Test${i}`), desiredClass, desiredShipyard, randYearBuilt, "USN");
    } else if (yardNoClass) {
      newShip = new Ship((shipName = `Test${i}`), randShipClass, desiredShipyard, randYearBuilt, "USN");
    } else if (classNoYard) {
      newShip = new Ship((shipName = `Test${i}`), desiredClass, randShipyard, randYearBuilt, "USN");
    } else {
      newShip = new Ship((shipName = `Test${i}`), randShipClass, randShipyard, randYearBuilt, "USN");
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
