export class Retion {
  static getInfo() {
    return {
      name: "Retion", // This is the ship class (in effect: class.name)
      type: "Cruiser",
      displacement: 16_000_000,
      crewCapacity: 3_025,
      info: "",
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
      armament: {},
    };
  }
}
