// Fighter Base Class
class Fighter {
  constructor(variant) {
    this.type = "Fighter";
    this.baseHitPoints = 3000;
    this.baseDamageOutput = 250;
    this.displacement = 65_000;
    this.crewCapacity = 2;

    // Apply variant-specific properties
    Object.assign(this, variant);
  }
}

// Fighter Variants
export const FighterVariants = {
  Letios: new Fighter({
    name: "Letios",
    manufacturer: "Mars Orbit",
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
    manufacturer: "Mars Orbit",
    displacement: 66_300,
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
    manufacturer: "Lagrange 2",
    displacement: 63_050,
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
