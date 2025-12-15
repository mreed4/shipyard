// Cruiser Base Class
class Cruiser {
  constructor(variant) {
    this.type = "Cruiser";
    this.baseHitPoints = 12000;
    this.baseDamageOutput = 850;
    this.displacement = 18_000_000;
    this.crewCapacity = 3_500;

    // Apply variant-specific properties
    Object.assign(this, variant);
  }
}

// Cruiser Variants
export const CruiserVariants = {
  Retion: new Cruiser({
    name: "Retion",
    manufacturer: "Mars Orbit",
    displacement: 18_000_000,
    crewCapacity: 3_500,
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
  }),

  Moros: new Cruiser({
    name: "Moros",
    manufacturer: "Titan",
    displacement: 17_640_000,
    crewCapacity: 3_430,
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
  }),

  Thessia: new Cruiser({
    name: "Thessia",
    manufacturer: "Titan",
    displacement: 18_360_000,
    crewCapacity: 3_395,
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
  }),

  Cairo: new Cruiser({
    name: "Cairo",
    manufacturer: "Earth Orbit",
    displacement: 18_720_000,
    crewCapacity: 3_640,
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
  }),

  Erebus: new Cruiser({
    name: "Erebus",
    manufacturer: "Europa",
    displacement: 18_360_000,
    crewCapacity: 3_570,
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
  }),
};

export default Cruiser;
