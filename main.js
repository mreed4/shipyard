const shipyards = ["Earth Orbit", "Mars Orbit", "Rings of Saturn", "Lagrange 2", "Europa", "Luna"];

const [earth, mars, rings, l2, europa, luna] = shipyards;

const shipClassInfo = [
  // https://en.wikipedia.org/wiki/Ship_class
  /*
   */
  /* Retion */ {
    shipClassName: "Retion",
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
    shipClassName: "Varrett",
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

const [retion, varrett, donbas, gesan, hyperion] = shipClassInfo;

function getRandInfo(info) {
  if (info === "class") {
    return shipClassInfo[Math.floor(Math.random() * shipClassInfo.length)];
  } else if (info === "shipyard") {
    return shipyards[Math.floor(Math.random() * shipyards.length)];
  } else if (info === "year") {
    const min = 2300;
    const max = 2800;
    return Math.floor(Math.random() * (max - min)) + min;
  } else {
    const error = "ERROR Enter valid parameter";
    console.log(error);
  }
}

class Ship {
  constructor(name, shipClassInfo, shipyard, yearBuilt, alignment) {
    this._name = name;
    this._shipClassInfo = shipClassInfo;
    this._shipyard = shipyard;
    this._yearBuilt = yearBuilt;
    this._alignment = alignment;
  }

  get name() {
    return this._name;
  }

  get shipClassInfo() {
    return this._shipClassInfo;
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

  set shipClassInfo(object) {
    this._shipClassInfo = object;
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
}

const ship0 = {
  shipName: "H.M.S. Ferdinand II",
  shipClassInfo: retion,
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

function massProduce(shipClass, shipyard, amount) {
  const ships = [];

  ships.push(["num", "Ship Name", "Ship Class", "Ship Type", "Shipyard", "Year Built"]);

  for (let i = 1; i <= amount; i++) {
    const randShipClassInfo = getRandInfo("class");
    const randShipyard = getRandInfo("shipyard");
    const randYearBuilt = getRandInfo("year");
    const shipName = `Ship ${i}`;

    const newShip = new Ship(shipName, randShipClassInfo, randShipyard, randYearBuilt, "USN");

    const isObject = typeof newShip.shipClassInfo === "object";

    const shipType = isObject ? newShip.shipClassInfo.type : "TBD";
    const shipClass = isObject ? newShip.shipClassInfo.shipClassName : newShip.shipClassInfo;
    const shipShipyard = newShip.shipyard;
    const shipYearBuilt = newShip.yearBuilt;

    ships.push([i, shipName, shipClass, shipType, shipShipyard, shipYearBuilt]);
  }

  return ships;
}

console.log(massProduce(50));
