export default class Varrett {
  static getInfo() {
    return {
      name: "Varrett",
      type: "Dreadnought",
      displacement: 63_000_000,
      crewCapacity: 1_575,
      info: "The 'Varrett' class dreadnought is nicknamed 'The Angel of Death'. It is the most heavily armed ship type ino the fleet.",
      keyCrew: {
        captain: "",
        firstOfficer: "",
        weaponsOfficers: {
          first: "",
          second: "",
        },
        navigators: {
          first: "",
          second: "",
        },
        engineers: {
          first: "",
          second: "",
        },
      },
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
