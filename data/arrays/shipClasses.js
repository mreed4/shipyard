export const shipClasses = [
  // https://en.wikipedia.org/wiki/Ship_class
  {
    name: "Retion",
    type: "Cruiser",
    displacement: 8_000_000,
    crewCapacity: 3_025,
    info: "",
    /**/
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
    /**/
    armament: {},
  },
  {
    name: "Varrett",
    type: "Dreadnought",
    displacement: 11_000_000,
    crewCapacity: 1575,
    info: "",
    /**/
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
    /**/
    armament: {},
  },
  {
    name: "Donbas",
    type: "Capital",
    displacement: 660_000_000,
    crewCapacity: 6400,
    info: "",
    /**/
    engines: {
      count: 14,
      make: "Jinto Corp.",
      model: "G29",
      features: {
        warpDrive: true,
        slipSpace: true,
        atmos: false,
      },
    },
    /**/
    armament: {},
  },
  {
    name: "Gesan",
    type: "Carrier",
    displacement: 32_000_000,
    crewCapacity: 6400,
    info: "",
    /**/
    engines: {
      count: 9,
      make: "Lumos Systems",
      model: "Derringer",
      features: {
        warpDrive: true,
        slipSpace: false,
        atmos: true,
      },
    },
    /**/
    armament: {},
  },
  "Hyperion",
];

export const [retion, varrett, donbas, gesan, hyperion] = shipClasses;
