export const shipTypes = {
  Retion: {
    name: "Retion",
    type: "Cruiser",
    displacement: 16_000_000,
    crewCapacity: 3_025,
    info: "The Retion is a heavy cruiser designed for long-range operations and deep-space exploration. It features advanced shielding and a powerful weapons array, making it a formidable presence in any fleet.",
    keyCrew: {},
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
    armament: {
      defenses: {},
      weaponry: {},
    },
    specialFeatures: [],
    __gameData: {
      baseHitPoints: 0,
      baseDamageOutput: 0,
    },
  },

  Varrett: {
    name: "Varrett",
    type: "Dreadnought",
    displacement: 63_000_000,
    crewCapacity: 1_575,
    info: "The 'Varrett' class dreadnought is nicknamed 'The Angel of Death'. It is the most heavily armed ship type ino the fleet.",
    keyCrew: {
      captain: "",
      firstOfficer: "",
      weaponsOfficers: {
        first: "",
        second: "",
      },
      navigators: {
        first: "",
        second: "",
      },
      engineers: {
        first: "",
        second: "",
      },
    },
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
    armament: {
      defenses: {},
      weaponry: {},
    },
    specialFeatures: [],
    __gameData: {
      baseHitPoints: 0,
      baseDamageOutput: 0,
    },
  },

  Donbas: {
    name: "Donbas",
    type: "Capital",
    displacement: 660_000_000,
    crewCapacity: 5_900,
    info: "",
    keyCrew: {},
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
    armament: {
      defenses: {},
      weaponry: {},
    },
    specialFeatures: [],
    __gameData: {
      baseHitPoints: 0,
      baseDamageOutput: 0,
    },
  },

  Gesan: {
    name: "Gesan",
    type: "Carrier",
    displacement: 72_000_000,
    crewCapacity: 3_400,
    info: "The 'Gesan' class carrier is a medium-large ship capable of FTL travel. It is loosely based on the similar ocean-going ships of pre-SCE Earth.",
    keyCrew: {
      captain: "",
      firstOfficer: "",
      deckMasters: {
        first: "",
        second: "",
      },
      navigators: {
        first: "",
        second: "",
      },
      engineers: {
        first: "",
        second: "",
      },
    },
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
    armament: {
      defenses: {},
      weaponry: {},
    },
    specialFeatures: [],
    __gameData: {
      baseHitPoints: 0,
      baseDamageOutput: 0,
    },
  },

  Hyperion: {
    name: "Hyperion",
    type: "Frigate",
    displacement: 19_400_000,
    crewCapacity: 3_200,
    info: "",
    keyCrew: {},
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
    armament: {
      defenses: {},
      weaponry: {},
    },
    specialFeatures: [],
    __gameData: {
      baseHitPoints: 0,
      baseDamageOutput: 0,
    },
  },

  Letios: {
    name: "Letios",
    type: "Fighter",
    displacement: 60_000,
    crewCapacity: 2,
    info: "The 'Letios' class fighter is one of the main multi-role platforms of the fleet. Small and nimble, it is generally deployed from the Gesan class carrier ship.",
    keyCrew: {
      pilot: "",
      coPilot: "",
    },
    engines: {
      count: 2,
      make: "Lumos Systems",
      model: "Vierling",
      features: {
        warpDrive: false,
        slipSpace: false,
        atmos: true,
      },
    },
    armament: {
      defenses: {},
      weaponry: {},
    },
    specialFeatures: [],
    __gameData: {
      baseHitPoints: 0,
      baseDamageOutput: 0,
    },
  },
};
