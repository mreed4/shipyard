export class Letios {
  static getInfo() {
    return {
      name: "Letios",
      type: "Fighter",
      displacement: 60_000,
      crewCapacity: 2,
      info: "",
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
      armament: {},
      specialFeatures: {},
      __gameData: {
        baseHitPoints: 0,
        baseDamageOutput: 0, // Calcluated based on armament
      },
    };
  }
}
