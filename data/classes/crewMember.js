const ship0 = {
  shipName: "H.M.S. Ferdinand II",
  id: 90010,
  shipClass: retion,
  shipyard: "Mars Orbit",
  yearBuilt: 2472,
  alignment: "EDF",
  // faction: null,

  crewMembers: {
    captain: {
      name: "Geland Frode",
      age: 57,
      gender: "f",
      rating: 7,
      scoreTRE: 3102,
    },
    firstOfficer: {},
    navigators: {
      first: {
        name: "Johan Dermio",
        age: 27,
        gender: "m",
        rating: 5,
        scoreTRE: 3043,
      },
      second: {},
    },
    engineers: {
      first: {
        name: "Relana Regara",
        age: 25,
        gender: "t",
        rating: 7,
        scoreTRE: 2997,
      },
      second: {},
    },
  },
};

export class CrewMember {
  constructor(name, age, gender, role, rating, scoringTRE) {
    this._name = name;
    this._age = age;
    this._gender = gender;
    this._role = role;
    this._rating = rating;
    this._scoringTRE = scoringTRE;
  }
}
