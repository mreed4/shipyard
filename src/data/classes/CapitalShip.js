// Capital Ship Base Class
class CapitalShip {
  constructor(variant) {
    this.type = "Capital Ship";
    this.baseHitPoints = 28000;
    this.baseDamageOutput = 2400;
    this.displacement = 650_000_000;
    this.crewCapacity = 7_000;

    // Apply variant-specific properties
    Object.assign(this, variant);
  }
}

// Capital Ship Variants
export const CapitalShipVariants = {
  Varrett: new CapitalShip({
    name: "Varrett",
    manufacturer: "Luna",
    displacement: 650_000_000,
    crewCapacity: 7_000,
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
  }),

  Donbas: new CapitalShip({
    name: "Donbas",
    manufacturer: "Luna",
    displacement: 663_000_000,
    crewCapacity: 7_140,
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
  }),

  Nairobi: new CapitalShip({
    name: "Nairobi",
    manufacturer: "Lagrange 2",
    displacement: 682_500_000,
    crewCapacity: 7_350,
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
  }),

  Bangkok: new CapitalShip({
    name: "Bangkok",
    manufacturer: "Rings of Saturn",
    displacement: 630_500_000,
    crewCapacity: 6_790,
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
  }),

  Singapore: new CapitalShip({
    name: "Singapore",
    manufacturer: "Europa",
    displacement: 643_500_000,
    crewCapacity: 6_930,
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
  }),
};

export default CapitalShip;
