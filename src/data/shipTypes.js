// Base stats for each ship type (common rarity)
const baseShipStats = {
  Fighter: { baseHitPoints: 3000, baseDamageOutput: 250 },
  Frigate: { baseHitPoints: 9000, baseDamageOutput: 650 },
  Cruiser: { baseHitPoints: 12000, baseDamageOutput: 850 },
  Carrier: { baseHitPoints: 24000, baseDamageOutput: 1800 },
  "Capital Ship": { baseHitPoints: 28000, baseDamageOutput: 2400 },
};

const rarityMultipliers = {
  common: 1.0,
  uncommon: 1.2,
  rare: 1.5,
  epic: 2.0,
  legendary: 3.0,
};

// Helper functions to calculate stats
const calculateHitpoints = (shipType, rarity) => baseShipStats[shipType].baseHitPoints * rarityMultipliers[rarity];
const calculateDamage = (shipType, rarity) => baseShipStats[shipType].baseDamageOutput * rarityMultipliers[rarity];

export const shipTypes = {
  Retion: {
    name: "Retion",
    type: "Cruiser",
    rarity: "common",
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
      baseHitPoints: calculateHitpoints("Cruiser", "common"),
      baseDamageOutput: calculateDamage("Cruiser", "common"),
    },
  },

  Varrett: {
    name: "Varrett",
    type: "Capital Ship",
    rarity: "common",
    displacement: 63_000_000,
    crewCapacity: 1_575,
    info: "The 'Varrett' class capital ship is nicknamed 'The Angel of Death'. A heavily armed vessel serving as the backbone of capital fleet operations.",
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
      baseHitPoints: calculateHitpoints("Capital Ship", "common"),
      baseDamageOutput: calculateDamage("Capital Ship", "common"),
    },
  },

  Donbas: {
    name: "Donbas",
    type: "Capital Ship",
    rarity: "rare",
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
      baseHitPoints: calculateHitpoints("Capital Ship", "rare"),
      baseDamageOutput: calculateDamage("Capital Ship", "rare"),
    },
  },

  Gesan: {
    name: "Gesan",
    type: "Carrier",
    rarity: "common",
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
      baseHitPoints: calculateHitpoints("Carrier", "common"),
      baseDamageOutput: calculateDamage("Carrier", "common"),
    },
  },

  Hyperion: {
    name: "Hyperion",
    type: "Frigate",
    rarity: "legendary",
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
      baseHitPoints: calculateHitpoints("Frigate", "legendary"),
      baseDamageOutput: calculateDamage("Frigate", "legendary"),
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
      baseHitPoints: calculateHitpoints("Fighter", "common"),
      baseDamageOutput: calculateDamage("Fighter", "common"),
    },
  },

  // NEW SHIPS

  Drakon: {
    name: "Drakon",
    type: "Fighter",
    rarity: "legendary",
    displacement: 55_000,
    crewCapacity: 2,
    info: "The pinnacle of fighter design. A legendary craft with unmatched agility and devastating firepower. Only the most elite pilots are entrusted with its controls.",
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
      baseHitPoints: calculateHitpoints("Fighter", "legendary"),
      baseDamageOutput: calculateDamage("Fighter", "legendary"),
    },
  },

  Jakarta: {
    name: "Jakarta",
    type: "Frigate",
    rarity: "epic",
    displacement: 1_200_000,
    crewCapacity: 45,
    info: "An exceptional frigate featuring cutting-edge technology and superior combat capabilities. Highly sought after for critical missions requiring both speed and firepower.",
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
      baseHitPoints: calculateHitpoints("Frigate", "epic"),
      baseDamageOutput: calculateDamage("Frigate", "epic"),
    },
  },

  Zephyr: {
    name: "Zephyr",
    type: "Fighter",
    rarity: "uncommon",
    displacement: 85_000,
    crewCapacity: 3,
    info: "An improved fighter design with enhanced speed and maneuverability. A step up from standard fighters, popular among experienced pilots.",
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
      baseHitPoints: calculateHitpoints("Fighter", "uncommon"),
      baseDamageOutput: calculateDamage("Fighter", "uncommon"),
    },
  },

  Lagos: {
    name: "Lagos",
    type: "Frigate",
    rarity: "common",
    displacement: 8_500_000,
    crewCapacity: 850,
    info: "A reliable frigate-class vessel designed for patrol duties and fleet support. Standard issue for convoy protection with balanced armament.",
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
      baseHitPoints: calculateHitpoints("Frigate", "common"),
      baseDamageOutput: calculateDamage("Frigate", "common"),
    },
  },

  Moros: {
    name: "Moros",
    type: "Cruiser",
    rarity: "uncommon",
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
      baseHitPoints: calculateHitpoints("Cruiser", "uncommon"),
      baseDamageOutput: calculateDamage("Cruiser", "uncommon"),
    },
  },

  Thessia: {
    name: "Thessia",
    type: "Cruiser",
    rarity: "legendary",
    displacement: 38_000_000,
    crewCapacity: 5_200,
    info: "A legendary cruiser that represents the perfect balance of speed, armor, and devastating firepower. Feared across known space for its combat prowess.",
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
      baseHitPoints: calculateHitpoints("Cruiser", "legendary"),
      baseDamageOutput: calculateDamage("Cruiser", "legendary"),
    },
  },

  Kronos: {
    name: "Kronos",
    type: "Carrier",
    rarity: "uncommon",
    displacement: 85_000_000,
    crewCapacity: 6_800,
    info: "An improved carrier design with enhanced fighter bays and better launch systems. A solid choice for fleet support operations.",
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
      baseHitPoints: calculateHitpoints("Carrier", "uncommon"),
      baseDamageOutput: calculateDamage("Carrier", "uncommon"),
    },
  },

  Olympus: {
    name: "Olympus",
    type: "Carrier",
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
      baseHitPoints: calculateHitpoints("Carrier", "legendary"),
      baseDamageOutput: calculateDamage("Carrier", "legendary"),
    },
  },

  Nairobi: {
    name: "Nairobi",
    type: "Capital Ship",
    rarity: "epic",
    displacement: 720_000_000,
    crewCapacity: 8_200,
    info: "An exceptional capital ship featuring cutting-edge military technology. Equipped with advanced weapons systems and superior tactical capabilities.",
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
      baseHitPoints: calculateHitpoints("Capital Ship", "epic"),
      baseDamageOutput: calculateDamage("Capital Ship", "epic"),
    },
  },

  // ADDITIONAL SHIPS

  Talos: {
    name: "Talos",
    type: "Fighter",
    rarity: "rare",
    displacement: 72_000,
    crewCapacity: 2,
    info: "An elite fighter with superior maneuverability and firepower. Equipped with advanced targeting systems and energy shields.",
    keyCrew: {
      pilot: "",
      coPilot: "",
    },
    engines: {
      count: 2,
      make: "Velocity Corp.",
      model: "Phantom-X",
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
      baseHitPoints: calculateHitpoints("Fighter", "rare"),
      baseDamageOutput: calculateDamage("Fighter", "rare"),
    },
  },

  Kyoto: {
    name: "Kyoto",
    type: "Frigate",
    rarity: "uncommon",
    displacement: 9_800_000,
    crewCapacity: 720,
    info: "An advanced frigate with enhanced sensors and long-range weapons. Ideal for reconnaissance and forward operations.",
    keyCrew: {},
    engines: {
      count: 4,
      make: "Pelius Pty.",
      model: "Pathfinder",
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
      baseHitPoints: calculateHitpoints("Frigate", "uncommon"),
      baseDamageOutput: calculateDamage("Frigate", "uncommon"),
    },
  },

  Cairo: {
    name: "Cairo",
    type: "Cruiser",
    rarity: "rare",
    displacement: 35_000_000,
    crewCapacity: 4_800,
    info: "A formidable heavy cruiser with reinforced hull plating and devastating broadside cannons. Built for extended campaigns.",
    keyCrew: {},
    engines: {
      count: 7,
      make: "Medin Industries",
      model: "Titan-VII",
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
      baseHitPoints: calculateHitpoints("Cruiser", "rare"),
      baseDamageOutput: calculateDamage("Cruiser", "rare"),
    },
  },

  Sydney: {
    name: "Sydney",
    type: "Carrier",
    rarity: "epic",
    displacement: 68_000_000,
    crewCapacity: 3_100,
    info: "An elite carrier featuring revolutionary fighter deployment systems. Exceptional launch efficiency combined with advanced tactical coordination capabilities.",
    keyCrew: {},
    engines: {
      count: 8,
      make: "Lumos Systems",
      model: "Apex",
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
      baseHitPoints: calculateHitpoints("Carrier", "epic"),
      baseDamageOutput: calculateDamage("Carrier", "epic"),
    },
  },

  Bangkok: {
    name: "Bangkok",
    type: "Capital Ship",
    rarity: "uncommon",
    displacement: 580_000_000,
    crewCapacity: 7_200,
    info: "A massive capital ship designed for fleet command and strategic operations. Houses advanced tactical systems and command centers.",
    keyCrew: {},
    engines: {
      count: 13,
      make: "Jinto Corp.",
      model: "Imperator",
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
      baseHitPoints: calculateHitpoints("Capital Ship", "uncommon"),
      baseDamageOutput: calculateDamage("Capital Ship", "uncommon"),
    },
  },

  Nyx: {
    name: "Nyx",
    type: "Fighter",
    rarity: "epic",
    displacement: 95_000,
    crewCapacity: 1,
    info: "A remarkable stealth fighter featuring advanced cloaking technology and exceptional agility. Single-pilot craft designed for the most dangerous missions.",
    keyCrew: {
      pilot: "",
    },
    engines: {
      count: 3,
      make: "Novadyne Ltd.",
      model: "Ghost",
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
      baseHitPoints: calculateHitpoints("Fighter", "epic"),
      baseDamageOutput: calculateDamage("Fighter", "epic"),
    },
  },

  // MISSING SHIPS TO COMPLETE 5x5 MATRIX

  Mumbai: {
    name: "Mumbai",
    type: "Frigate",
    rarity: "rare",
    displacement: 11_500_000,
    crewCapacity: 920,
    info: "A battle-tested frigate known for its reliability in extended campaigns. Features enhanced shields and improved crew accommodations.",
    keyCrew: {},
    engines: {
      count: 4,
      make: "Stellar Drives",
      model: "Endurance-V",
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
      baseHitPoints: calculateHitpoints("Frigate", "rare"),
      baseDamageOutput: calculateDamage("Frigate", "rare"),
    },
  },

  Erebus: {
    name: "Erebus",
    type: "Cruiser",
    rarity: "epic",
    displacement: 42_000_000,
    crewCapacity: 5_400,
    info: "A massive cruiser with overwhelming firepower. Heavily armored and capable of sustained fleet engagements.",
    keyCrew: {},
    engines: {
      count: 8,
      make: "Jinto Corp.",
      model: "Titan-IX",
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
      baseHitPoints: calculateHitpoints("Cruiser", "epic"),
      baseDamageOutput: calculateDamage("Cruiser", "epic"),
    },
  },

  Havana: {
    name: "Havana",
    type: "Carrier",
    rarity: "rare",
    displacement: 75_000_000,
    crewCapacity: 3_800,
    info: "A versatile carrier designed for long-range expeditions. Features advanced navigation systems and extended supply capacity.",
    keyCrew: {},
    engines: {
      count: 9,
      make: "Lumos Systems",
      model: "Voyager",
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
      baseHitPoints: calculateHitpoints("Carrier", "rare"),
      baseDamageOutput: calculateDamage("Carrier", "rare"),
    },
  },

  Singapore: {
    name: "Singapore",
    type: "Capital Ship",
    rarity: "legendary",
    displacement: 850_000_000,
    crewCapacity: 9_500,
    info: "The ultimate capital ship. A mobile fortress with unparalleled firepower and defensive capabilities. Legends speak of entire fleets retreating at its arrival.",
    keyCrew: {},
    engines: {
      count: 16,
      make: "Novadyne Ltd.",
      model: "Omega-Class",
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
      baseHitPoints: calculateHitpoints("Capital Ship", "legendary"),
      baseDamageOutput: calculateDamage("Capital Ship", "legendary"),
    },
  },
};
