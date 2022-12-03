export class Gesan {
  static getInfo() {
    return {
      name: "Gesan",
      type: "Carrier",
      displacement: 72_000_000,
      crewCapacity: 3_400,
      info: "The 'Gesan' class carrier is a medium-large ship capable of FTL travel. It is loosely based on the similar ocean-going ships of pre-SCE Earth.",
      keyCrew: {
        captain: "",
        firstOfficer: "",
        deckMasters: {
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
