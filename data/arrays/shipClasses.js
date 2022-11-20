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

export const [retion, varrett, donbas, gesan, hyperion] = shipClasses;
