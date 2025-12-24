// Fighter Base Class
class Fighter {
  constructor(shipClassData) {
    this.type = "Fighter";
    this.baseHitPoints = 3000;
    this.baseDamageOutput = 250;
    this.displacement = 65_000;
    this.crewCapacity = 2;
    this.baseArmor = 100;
    this.baseSpeed = 850;
    this.basePrecision = 75;

    // Apply class-specific properties
    Object.assign(this, shipClassData);
  }
}

// Fighter Classes
export const FighterClasses = {
  Letios: new Fighter({
    className: "Letios",
    shipyard: "Mars Orbit",
    baseHitPoints: 3000,
    baseDamageOutput: 250,
    baseArmor: 100,
    baseSpeed: 850,
    basePrecision: 75,
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
    className: "Letios",
    shipyard: "Luna",
    baseHitPoints: 3000,
    baseDamageOutput: 250,
    baseArmor: 100,
    baseSpeed: 850,
    basePrecision: 75,
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
    className: "Letios",
    shipyard: "Earth Orbit",
    baseHitPoints: 3000,
    baseDamageOutput: 250,
    baseArmor: 100,
    baseSpeed: 850,
    basePrecision: 75,
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
    className: "Drakon",
    shipyard: "Luna",
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
    className: "Zephyr",
    shipyard: "Titan",
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
    className: "Talos",
    shipyard: "Titan",
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
    className: "Nyx",
    shipyard: "Europa",
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
