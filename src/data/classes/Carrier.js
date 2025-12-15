// Carrier Base Class
class Carrier {
  constructor(variant) {
    this.type = "Carrier";
    this.baseHitPoints = 24000;
    this.baseDamageOutput = 1800;
    this.displacement = 75_000_000;
    this.crewCapacity = 4_000;

    // Apply variant-specific properties
    Object.assign(this, variant);
  }
}

// Carrier Variants
export const CarrierVariants = {
  Gesan: new Carrier({
    name: "Gesan",
    manufacturer: "Earth Orbit",
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
    manufacturer: "Lagrange 2",
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
    manufacturer: "Lagrange 2",
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
    manufacturer: "Luna",
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
    manufacturer: "Luna",
    displacement: 71_250_000,
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
