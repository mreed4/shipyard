export default class Hyperion {
  static getInfo() {
    return {
      name: "Hyperion",
      type: "Frigate",
      displacement: 19_400_000,
      crewCapacity: 3_200,
      info: "",
      keyCrew: {},
      /**/
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
