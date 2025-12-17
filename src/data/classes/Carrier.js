// Carrier Base Class
class Carrier {
  constructor(variant) {
    this.type = "Carrier";
    this.baseHitPoints = 24000;
    this.baseDamageOutput = 1800;
    this.displacement = 75_000_000;
    this.crewCapacity = 4_000;
    this.baseArmor = 600;
    this.baseSpeed = 180;
    this.basePrecision = 55;

    // Apply variant-specific properties
    Object.assign(this, variant);
  }
}

// Carrier Variants
export const CarrierVariants = {
  Gesan: new Carrier({
    name: "Gesan",
    manufacturer: "Mars Orbit",
    baseHitPoints: 26500,
    baseDamageOutput: 1950,
    baseArmor: 660,
    baseSpeed: 195,
    basePrecision: 60,
    displacement: 75_000_000,
    crewCapacity: 4_000,
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
  }),

  Kronos: new Carrier({
    name: "Kronos",
    manufacturer: "Earth Orbit",
    baseHitPoints: 22000,
    baseDamageOutput: 1650,
    baseArmor: 540,
    baseSpeed: 210,
    basePrecision: 63,
    displacement: 77_250_000,
    crewCapacity: 4_120,
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
  }),

  Olympus: new Carrier({
    name: "Olympus",
    manufacturer: "Europa",
    baseHitPoints: 27500,
    baseDamageOutput: 2050,
    baseArmor: 690,
    baseSpeed: 165,
    basePrecision: 52,
    displacement: 73_500_000,
    crewCapacity: 3_920,
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
  }),

  Sydney: new Carrier({
    name: "Sydney",
    manufacturer: "Earth Orbit",
    baseHitPoints: 25000,
    baseDamageOutput: 1880,
    baseArmor: 630,
    baseSpeed: 190,
    basePrecision: 58,
    displacement: 75_750_000,
    crewCapacity: 4_040,
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
  }),

  Havana: new Carrier({
    name: "Havana",
    manufacturer: "Titan",
    baseHitPoints: 21500,
    baseDamageOutput: 1600,
    baseArmor: 530,
    baseSpeed: 205,
    basePrecision: 65,
    displacement: 76_500_000,
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
  }),
};

export default Carrier;
