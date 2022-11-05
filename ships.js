const shipyard = ["Earth Orbit", "Mars Orbit", "Rings of Saturn", "Lagrange 2", "Europa", "Luna"];

const shipClassInfo = [
  {
    shipClassName: "Retion",
    type: "Cruiser",
    displacement: 3000000,
    crewCapacity: 25,
    engines: {
      count: 6,
      make: "Medin Industries",
      model: "Gibraltar",
      features: {
        warpDrive: true,
        slipSpace: false,
        inAtmosphere: true,
      },
    },
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
  name: "H.M.S. Ferdinand II",
  shipClassInfo: shipClassInfo[0],
  shipyard: "Mars Orbit",
  yearBuilt: 2472,
  alignment: "EDF",
  faction: null,

  crewMembers: {
    captain: {
      name: "Geland Frode",
      age: 36,
    },
    navigator: {
      name: "Johan Dermio",
      age: 27,
    },
    engineer: {
      name: "Relana Regara",
      age: 25,
    },
  },
};
