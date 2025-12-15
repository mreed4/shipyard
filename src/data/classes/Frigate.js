// Frigate Base Class
class Frigate {
  constructor(variant) {
    this.type = "Frigate";
    this.baseHitPoints = 9000;
    this.baseDamageOutput = 650;
    this.displacement = 10_000_000;
    this.crewCapacity = 800;

    // Apply variant-specific properties
    Object.assign(this, variant);
  }
}

// Frigate Variants
export const FrigateVariants = {
  Hyperion: new Frigate({
    name: "Hyperion",
    manufacturer: "Mars Orbit",
    displacement: 9_900_000,
    crewCapacity: 792,
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
  }),

  "Hyperion-L2": new Frigate({
    name: "Hyperion",
    manufacturer: "Lagrange 2",
    displacement: 9_900_000,
    crewCapacity: 792,
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
  }),

  "Hyperion-EO": new Frigate({
    name: "Hyperion",
    manufacturer: "Earth Orbit",
    displacement: 9_900_000,
    crewCapacity: 792,
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
  }),

  "Hyperion-EU": new Frigate({
    name: "Hyperion",
    manufacturer: "Europa",
    displacement: 9_900_000,
    crewCapacity: 792,
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
  }),

  Jakarta: new Frigate({
    name: "Jakarta",
    manufacturer: "Ceres",
    displacement: 10_440_000,
    crewCapacity: 840,
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
  }),

  Lagos: new Frigate({
    name: "Lagos",
    manufacturer: "Ceres",
    displacement: 10_260_000,
    crewCapacity: 800,
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
  }),

  Kyoto: new Frigate({
    name: "Kyoto",
    manufacturer: "Ceres",
    displacement: 10_080_000,
    crewCapacity: 824,
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
  }),

  Mumbai: new Frigate({
    name: "Mumbai",
    manufacturer: "Luna",
    displacement: 9_600_000,
    crewCapacity: 768,
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
  }),
};

export default Frigate;
