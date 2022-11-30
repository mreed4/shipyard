export class Hyperion {
  static getInfo() {
    return {
      name: "Hyperion",
      type: "Frigate",
      displacement: 19_400_000,
      crewCapacity: 3_500,
      info: "",
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
      armament: {},
    };
  }
}
