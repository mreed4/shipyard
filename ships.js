const shipyard = ["Earth Orbit", "Mars Orbit", "Rings of Saturn", "Lagrange 2", "Europa", "Luna"];

const shipClassInfo = [
  // https://en.wikipedia.org/wiki/Ship_class
  {
    // Retion
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

class Ship {
  constructor() {}
}

const ship1 = {
  shipName: "H.M.S. Ferdinand II",
  shipClassInfo: retion,
  shipyard: "Mars Orbit",
  yearBuilt: 2472,
  alignment: "EDF",
  faction: null,

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

console.log(retion === ship1.shipClassInfo);
