let shipClass = ["Retion", "Varret", "Donbas", "Gesan", "Hyperion"];

class Ship {
  constructor() {}
}

let ship1 = {
  name: "H.M.S. Ferdinand II",
  classInfo: {
    className: "Retion",
    displacement: 3000000,
    crewCapacity: 25,
    type: "Cruiser",
  },
  shipyard: "Mars Orbit",
  yearBuilt: 2472,
  alignment: "EDF",
  faction: null,

  engines: {
    count: 6,
    make: "Medin Industries",
    model: "Gibraltar",
    features: {
      warpDrive: true,
      slipSpace: false,
    },
  },

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

  armament: {},
};
