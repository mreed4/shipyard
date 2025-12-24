// Frigate Base Class
class Frigate {
  constructor(shipClassData) {
    this.type = "Frigate";
    this.baseHitPoints = 9000;
    this.baseDamageOutput = 650;
    this.displacement = 10_000_000;
    this.crewCapacity = 800;
    this.baseArmor = 300;
    this.baseSpeed = 420;
    this.basePrecision = 65;

    // Apply class-specific properties
    Object.assign(this, shipClassData);
  }
}

// Frigate Classes
export const FrigateClasses = {
  Hyperion: new Frigate({
    className: "Hyperion",
    shipyard: "Mars Orbit",
    baseHitPoints: 9000,
    baseDamageOutput: 650,
    baseArmor: 300,
    baseSpeed: 420,
    basePrecision: 65,
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
    className: "Hyperion",
    shipyard: "Lagrange 2",
    baseHitPoints: 9000,
    baseDamageOutput: 650,
    baseArmor: 300,
    baseSpeed: 420,
    basePrecision: 65,
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
    className: "Hyperion",
    shipyard: "Earth Orbit",
    baseHitPoints: 9000,
    baseDamageOutput: 650,
    baseArmor: 300,
    baseSpeed: 420,
    basePrecision: 65,
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
    className: "Hyperion",
    shipyard: "Europa",
    baseHitPoints: 9000,
    baseDamageOutput: 650,
    baseArmor: 300,
    baseSpeed: 420,
    basePrecision: 65,
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
    className: "Jakarta",
    shipyard: "Ceres",
    baseHitPoints: 10300,
    baseDamageOutput: 740,
    baseArmor: 345,
    baseSpeed: 390,
    basePrecision: 60,
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
    className: "Lagos",
    shipyard: "Ceres",
    baseHitPoints: 9800,
    baseDamageOutput: 700,
    baseArmor: 325,
    baseSpeed: 410,
    basePrecision: 66,
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
    className: "Kyoto",
    shipyard: "Ceres",
    baseHitPoints: 8500,
    baseDamageOutput: 610,
    baseArmor: 285,
    baseSpeed: 480,
    basePrecision: 74,
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
    className: "Mumbai",
    shipyard: "Luna",
    baseHitPoints: 7800,
    baseDamageOutput: 570,
    baseArmor: 265,
    baseSpeed: 490,
    basePrecision: 75,
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
