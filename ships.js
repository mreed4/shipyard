const shipyards = ["Earth Orbit", "Mars Orbit", "Rings of Saturn", "Lagrange 2", "Europa", "Luna"];

const shipClassInfo = [
  // https://en.wikipedia.org/wiki/Ship_class
  /* Retion */ {
    shipClassName: "Retion",
    type: "Cruiser",
    displacement: 3000000,
    crewCapacity: 3025,
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
  "Varret",
  "Donbas",
  "Gesan",
  "Hyperion",
];

const [retion, varret, donbas, gesan, hyperion] = shipClassInfo;

const randShip = () => {
  return shipClassInfo[Math.floor(Math.random() * shipClassInfo.length)];
};

const randShipyard = () => {
  return shipyards[Math.floor(Math.random() * shipyards.length)];
};

const randYearBuilt = () => {
  let min = 2000;
  let max = 2700;
  return Math.floor(Math.random() * (max - min)) + min;
};

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

  set shipClass(string) {
    this._shipClass = string;
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
    },
    navigator: {
      name: "Johan Dermio",
      age: 27,
      gender: "m",
    },
    engineer: {
      name: "Relana Regara",
      age: 25,
      gender: "t",
    },
  },
};

let ship1 = new Ship("Test", randShip(), randShipyard(), randYearBuilt(), "USN");

console.log(ship1.shipClass, ship1.yearBuilt);
