export class Donbas {
  static getInfo() {
    return {
      name: "Donbas",
      type: "Capital",
      displacement: 660_000_000,
      crewCapacity: 5_900,
      info: "",
      keyCrew: {},
      /**/
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
