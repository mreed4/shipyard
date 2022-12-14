export default class Letios {
  static getInfo() {
    return {
      name: "Letios",
      type: "Fighter",
      displacement: 60_000,
      crewCapacity: 2,
      info: "The 'Letios' class fighter is one of the main multi-role platforms of the fleet. Small and nimble, it is generally deployed from the Gesan class carrier ship.",
      keyCrew: {
        pilot: "", // To be pouplated in each Ship instance
        coPilot: "", // To be pouplated in each Ship instance
      },
      /**/
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
