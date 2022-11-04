let shipClass = ["Retion", "Varret", "Donbas", "Gesan", "Hyperion"];

class Ship {
  constructor() {}
}

let ship1 = {
  general: {
    name: "H.M.S. Ferdinand II",
    class: "Retion",
    type: "Cruiser",
    shipyard: "Mars Orbit",
    yearBuilt: 2472,
    alignment: "EDF",
    faction: null,
  },

  engines: {
    count: 6,
    make: "Medin Industries",
    model: "Gibraltar",
    features: {
      warpDrive: true,
      slipSpace: false,
    },
  },

  crew: {
    capacity: 25,
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
