export class Donbas {
  static getInfo() {
    return {
      name: "Donbas",
      type: "Capital",
      displacement: 660_000_000,
      crewCapacity: 52_900,
      info: "",
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
      armament: {},
      specialFeatures: {},
      __gameData: {
        baseHitPoints: 0,
        baseDamageOutput: 0, // Calcluated based on armament
      },
    };
  }
}