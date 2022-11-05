const shipyards = ["Earth Orbit", "Mars Orbit", "Rings of Saturn", "Lagrange 2", "Europa", "Luna"];

const shipClassInfo = [
  // https://en.wikipedia.org/wiki/Ship_class
  /*
   */
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
  /* Varrett */ {
    shipClassName: "Varrett",
    type: "Dreadnought",
    displacement: 6000000,
    crewCapacity: 1575,
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

const randShipClass = () => {
  // return Math.floor(Math.random() * shipClassInfo.length);
  return shipClassInfo[Math.floor(Math.random() * shipClassInfo.length)];
};

const randShipyard = () => {
  return shipyards[Math.floor(Math.random() * shipyards.length)];
};

const randYearBuilt = () => {
  let min = 2300;
  let max = 2800;
  return Math.floor(Math.random() * (max - min)) + min;
};

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

for (let i = 1; i <= 50; i++) {
  let newShip = new Ship("Test", randShipClass(), randShipyard(), randYearBuilt(), "USN");
  let objectOrString = (info) => {
    if (info === "name") {
      return typeof newShip.shipClassInfo === "object" ? newShip.shipClassInfo.shipClassName : newShip.shipClassInfo;
    }
  };
  console.log(objectOrString("name"));
}
