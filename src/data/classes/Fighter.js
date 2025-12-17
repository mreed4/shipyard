// Fighter Base Class
class Fighter {
  constructor(variant) {
    this.type = "Fighter";
    this.baseHitPoints = 3000;
    this.baseDamageOutput = 250;
    this.displacement = 65_000;
    this.crewCapacity = 2;
    this.baseArmor = 100;
    this.baseSpeed = 850;
    this.basePrecision = 75;

    // Apply variant-specific properties
    Object.assign(this, variant);
  }
}

// Fighter Variants
export const FighterVariants = {
  Letios: new Fighter({
    name: "Letios",
    manufacturer: "Mars Orbit",
    baseHitPoints: 3150,
    baseDamageOutput: 260,
    baseArmor: 105,
    baseSpeed: 870,
    basePrecision: 77,
    displacement: 65_000,
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
  }),

  "Letios-L": new Fighter({
    name: "Letios",
    manufacturer: "Luna",
    baseHitPoints: 2700,
    baseDamageOutput: 230,
    baseArmor: 90,
    baseSpeed: 900,
    basePrecision: 80,
    displacement: 65_000,
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
  }),

  "Letios-EO": new Fighter({
    name: "Letios",
    manufacturer: "Earth Orbit",
    baseHitPoints: 3300,
    baseDamageOutput: 270,
    baseArmor: 110,
    baseSpeed: 820,
    basePrecision: 72,
    displacement: 65_000,
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
  }),

  Drakon: new Fighter({
    name: "Drakon",
    manufacturer: "Luna",
    baseHitPoints: 3400,
    baseDamageOutput: 285,
    baseArmor: 115,
    baseSpeed: 920,
    basePrecision: 85,
    displacement: 63_700,
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
  }),

  Zephyr: new Fighter({
    name: "Zephyr",
    manufacturer: "Titan",
    baseHitPoints: 2850,
    baseDamageOutput: 240,
    baseArmor: 95,
    baseSpeed: 950,
    basePrecision: 82,
    displacement: 68_000,
    crewCapacity: 2,
    info: "An improved fighter design with enhanced speed and maneuverability. A step up from standard fighters, popular among experienced pilots.",
    keyCrew: {
      pilot: "",
      coPilot: "",
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
  }),

  Talos: new Fighter({
    name: "Talos",
    manufacturer: "Titan",
    baseHitPoints: 3200,
    baseDamageOutput: 275,
    baseArmor: 112,
    baseSpeed: 880,
    basePrecision: 78,
    displacement: 70_000,
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
  }),

  Nyx: new Fighter({
    name: "Nyx",
    manufacturer: "Europa",
    baseHitPoints: 2600,
    baseDamageOutput: 265,
    baseArmor: 88,
    baseSpeed: 980,
    basePrecision: 88,
    displacement: 67_600,
    crewCapacity: 2,
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
  }),
};

export default Fighter;
