export const shipTypes = {
  Retion: {
    name: "Retion",
    type: "Cruiser",
    rarity: "rare",
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
      baseHitPoints: 12000,
      baseDamageOutput: 850,
      // TODO: Implement star/upgrade system for stat progression
    },
  },

  Varrett: {
    name: "Varrett",
    type: "Dreadnought",
    rarity: "epic",
    displacement: 63_000_000,
    crewCapacity: 1_575,
    info: "The 'Varrett' class dreadnought is nicknamed 'The Angel of Death'. It is the most heavily armed ship type in the fleet.",
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
      baseHitPoints: 28000,
      baseDamageOutput: 2400,
      // TODO: Implement star/upgrade system for stat progression
    },
  },

  Donbas: {
    name: "Donbas",
    type: "Capital",
    rarity: "legendary",
    displacement: 660_000_000,
    crewCapacity: 5_900,
    info: "The Donbas-class capital ship represents the pinnacle of naval engineering. A command vessel capable of leading entire fleets into battle.",
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
      baseHitPoints: 45000,
      baseDamageOutput: 3500,
      // TODO: Implement star/upgrade system for stat progression
    },
  },

  Gesan: {
    name: "Gesan",
    type: "Carrier",
    rarity: "epic",
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
      baseHitPoints: 24000,
      baseDamageOutput: 1800,
      // TODO: Implement star/upgrade system for stat progression
    },
  },

  Hyperion: {
    name: "Hyperion",
    type: "Frigate",
    rarity: "uncommon",
    displacement: 19_400_000,
    crewCapacity: 3_200,
    info: "A versatile frigate-class vessel designed for patrol and escort duties. Fast and maneuverable with respectable firepower.",
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
      baseHitPoints: 7500,
      baseDamageOutput: 500,
      // TODO: Implement star/upgrade system for stat progression
    },
  },

  Letios: {
    name: "Letios",
    type: "Fighter",
    rarity: "common",
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
      baseHitPoints: 3000,
      baseDamageOutput: 250,
      // TODO: Implement star/upgrade system for stat progression
    },
  },

  // NEW SHIPS

  Kestrel: {
    name: "Kestrel",
    type: "Fighter",
    rarity: "common",
    displacement: 55_000,
    crewCapacity: 2,
    info: "A lightweight interceptor designed for rapid response and dogfighting. Popular among rookie pilots for its forgiving handling.",
    keyCrew: {
      pilot: "",
      coPilot: "",
    },
    engines: {
      count: 2,
      make: "Velocity Corp.",
      model: "Sprint-2",
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
      baseHitPoints: 2800,
      baseDamageOutput: 280,
      // TODO: Implement star/upgrade system for stat progression
    },
  },

  Corsair: {
    name: "Corsair",
    type: "Corvette",
    rarity: "common",
    displacement: 1_200_000,
    crewCapacity: 45,
    info: "A small patrol vessel used for system security and anti-piracy operations. Often the first command position for new captains.",
    keyCrew: {},
    engines: {
      count: 3,
      make: "Stellar Drives",
      model: "Compact-8",
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
      baseHitPoints: 4500,
      baseDamageOutput: 350,
      // TODO: Implement star/upgrade system for stat progression
    },
  },

  Falcon: {
    name: "Falcon",
    type: "Interceptor",
    rarity: "uncommon",
    displacement: 85_000,
    crewCapacity: 3,
    info: "An advanced fighter craft with enhanced speed and maneuverability. Features cutting-edge avionics and weapon systems.",
    keyCrew: {
      pilot: "",
      navigator: "",
      gunner: "",
    },
    engines: {
      count: 3,
      make: "Velocity Corp.",
      model: "Raptor-X",
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
      baseHitPoints: 3500,
      baseDamageOutput: 400,
      // TODO: Implement star/upgrade system for stat progression
    },
  },

  Sentinel: {
    name: "Sentinel",
    type: "Destroyer",
    rarity: "uncommon",
    displacement: 8_500_000,
    crewCapacity: 850,
    info: "A reliable destroyer-class vessel designed for fleet support and convoy protection. Balanced armament and defenses.",
    keyCrew: {},
    engines: {
      count: 4,
      make: "Medin Industries",
      model: "Guardian-II",
      features: {
        warpDrive: true,
        slipSpace: false,
        atmos: false,
      },
    },
    armament: {
      defenses: {},
      weaponry: {},
    },
    specialFeatures: [],
    __gameData: {
      baseHitPoints: 9000,
      baseDamageOutput: 650,
      // TODO: Implement star/upgrade system for stat progression
    },
  },

  Tempest: {
    name: "Tempest",
    type: "Heavy Cruiser",
    rarity: "rare",
    displacement: 22_000_000,
    crewCapacity: 4_100,
    info: "A heavy cruiser optimized for sustained combat operations. Features reinforced armor and powerful broadside weapons.",
    keyCrew: {},
    engines: {
      count: 6,
      make: "Novadyne Ltd.",
      model: "Thunderbolt",
      features: {
        warpDrive: true,
        slipSpace: false,
        atmos: false,
      },
    },
    armament: {
      defenses: {},
      weaponry: {},
    },
    specialFeatures: [],
    __gameData: {
      baseHitPoints: 15000,
      baseDamageOutput: 1100,
      // TODO: Implement star/upgrade system for stat progression
    },
  },

  Valkyrie: {
    name: "Valkyrie",
    type: "Battlecruiser",
    rarity: "rare",
    displacement: 38_000_000,
    crewCapacity: 5_200,
    info: "A fast battlecruiser that sacrifices some armor for superior speed and firepower. Excels at hit-and-run tactics.",
    keyCrew: {},
    engines: {
      count: 8,
      make: "Pelius Pty.",
      model: "Mjolnir-V",
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
      baseHitPoints: 18000,
      baseDamageOutput: 1500,
      // TODO: Implement star/upgrade system for stat progression
    },
  },

  Titan: {
    name: "Titan",
    type: "Battleship",
    rarity: "epic",
    displacement: 85_000_000,
    crewCapacity: 6_800,
    info: "A massive battleship bristling with weapons. The backbone of any serious fleet engagement.",
    keyCrew: {},
    engines: {
      count: 10,
      make: "Jinto Corp.",
      model: "Colossus",
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
      baseHitPoints: 32000,
      baseDamageOutput: 2800,
      // TODO: Implement star/upgrade system for stat progression
    },
  },

  Phoenix: {
    name: "Phoenix",
    type: "Supercarrier",
    rarity: "legendary",
    displacement: 450_000_000,
    crewCapacity: 12_500,
    info: "An enormous supercarrier capable of deploying entire fighter wings. Features advanced repair bays and manufacturing facilities.",
    keyCrew: {},
    engines: {
      count: 16,
      make: "Lumos Systems",
      model: "Infinity Drive",
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
      baseHitPoints: 50000,
      baseDamageOutput: 4000,
      // TODO: Implement star/upgrade system for stat progression
    },
  },

  Nemesis: {
    name: "Nemesis",
    type: "Capital",
    rarity: "legendary",
    displacement: 720_000_000,
    crewCapacity: 8_200,
    info: "The Nemesis-class represents the cutting edge of military technology. Equipped with experimental weapons and unmatched tactical systems.",
    keyCrew: {},
    engines: {
      count: 12,
      make: "Novadyne Ltd.",
      model: "Harbinger-X",
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
      baseHitPoints: 48000,
      baseDamageOutput: 4200,
      // TODO: Implement star/upgrade system for stat progression
    },
  },
};
