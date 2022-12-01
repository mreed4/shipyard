export class Gesan {
  static getInfo() {
    return {
      name: "Gesan",
      type: "Carrier",
      displacement: 72_000_000,
      crewCapacity: 3_400,
      info: "",
      keyCrew: {},
      /**/
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
