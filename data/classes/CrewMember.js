import { firstNamesFemale } from "../arrays/crew/firstNames.js";
import { firstNamesMale } from "../arrays/crew/firstNames.js";
import { lastNames } from "../arrays/crew/lastNames.js";

export class CrewMember {
  constructor() {
    this.id = "(Will be calculated based on the below)";
    this.gender = this.generateGender();
    this.name = this.generateName(this.gender);
    this.age = this.generateAge();
    this.birthplace = "(Will be randomized based on external array)";

    this.rating = this.generateRating();
    this.scoreTRE = this.generateScoreTRE();
  }

  generateId(name) {}

  generateName(gender) {
    let firstName;
    let lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
    if (gender === "m") {
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
