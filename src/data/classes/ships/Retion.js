import { Ship } from "../Ship.js";

export default class Retion extends Ship {
  constructor(shipyard) {
    super(Retion.getInfo(), shipyard);
  }

  static getInfo() {
    return {
      name: "Retion", // This is the ship class (in effect: class.name)
      type: "Cruiser",
      displacement: 16_000_000,
      crewCapacity: 3_025,
      info: "The Retion is a heavy cruiser designed for long-range operations and deep-space exploration. It features advanced shielding and a powerful weapons array, making it a formidable presence in any fleet.",
      keyCrew: {},
      /**/
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
      /**/
      armament: {
        defenses: {},
        weaponry: {},
      },
      specialFeatures: [],
      __gameData: {
        baseHitPoints: 0,
        baseDamageOutput: 0, // Calcluated based on armament, features
      },
    };
  }
}
