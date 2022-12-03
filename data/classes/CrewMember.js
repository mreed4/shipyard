import { firstNamesFemale } from "../arrays/crew/firstNames.js";
import { firstNamesMale } from "../arrays/crew/firstNames.js";
import { lastNames } from "../arrays/crew/lastNames.js";

export class CrewMember {
  constructor() {
    this.gender = this.generateGender();
    this.name = this.generateName();
    this.age = this.generateAge();
    this.birthplace = "(Will be randomized based on external array)";
    this.rating = this.generateRating();
    this.scoreTRE = this.generateScoreTRE();
    this.id = this.generateId();
  }

  generateId() {
    const namePartFirst = this.name.split("")[0][0];
    const lastIsShort = this.name.split(" ")[1].length < 3;
    const namePartlastShort = this.name.split(" ")[1].slice(0, 3).toUpperCase() + "x";
    const namePartLastNormal = this.name.split(" ")[1].slice(0, 3).toUpperCase();
    let namePartLast = lastIsShort ? namePartlastShort : namePartLastNormal;
    const namePart = namePartFirst + namePartLast;

    const ratingPart = this.rating;

    const min = 10000000000;
    const max = 100000000000;
    const serial = Math.floor(Math.random() * (max - min)) + min;

    const allParts = [namePart, ratingPart, serial].join("/");

    return allParts;
  }

  generateName() {
    let firstName;
    const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
    if (this.gender === "m") {
      firstName = firstNamesMale[Math.floor(Math.random() * firstNamesMale.length)];
    } else {
      firstName = firstNamesFemale[Math.floor(Math.random() * firstNamesFemale.length)];
    }
    return `${firstName} ${lastName}`;
  }

  generateGender() {
    return Math.random() < 0.5 ? "f" : "m";
  }

  generateAge() {
    const min = 20;
    const max = 66;
    const age = Math.floor(Math.random() * (max - min)) + min;
    return age;
  }

  generateRating() {
    const min = 1;
    const max = 10;
    const rating = Math.floor(Math.random() * (max - min)) + min;
    return rating;
  }

  generateScoreTRE() {
    const min = 2999;
    const max = 4501;
    const scoreTRE = Math.floor(Math.random() * (max - min)) + min;
    return scoreTRE;
  }
}
