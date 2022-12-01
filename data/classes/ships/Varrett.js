export class Varrett {
  static getInfo() {
    return {
      name: "Varrett",
      type: "Dreadnought",
      displacement: 63_000_000,
      crewCapacity: 1_575,
      info: "",
      /**/
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
