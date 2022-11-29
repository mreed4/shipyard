export const shipClasses = [
  // https://www.wikiwand.com/en/Ship_class
  // https://www.wikiwand.com/en/List_of_ship_types

  // Retion
  {
    name: "Retion", // This is the ship class (in effect: class.name)
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

  // Varrett
  {
    name: "Varrett",
    type: "Dreadnought",
    displacement: 11_000_000,
    crewCapacity: 1_575,
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

  // Donbas
  {
    name: "Donbas",
    type: "Capital",
    displacement: 660_000_000,
    crewCapacity: 52_900,
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

  // Gesan
  {
    name: "Gesan",
    type: "Carrier",
    displacement: 32_000_000,
    crewCapacity: 6_400,
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

  // Hyperion
  {
    name: "Hyperion",
    type: "Frigate",
    displacement: 19_400_000,
    crewCapacity: 3_500,
    info: "",
    /**/
    engines: {
      count: 2,
      make: "Pelius Pty.",
      model: "P-21",
      features: {
        warpDrive: true,
        slipSpace: false,
        atmos: true,
      },
    },
    /**/
    armament: {},
  },
];

export const [retion, varrett, donbas, gesan, hyperion] = shipClasses;
