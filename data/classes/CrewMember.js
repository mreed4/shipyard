import { firstNamesFemale } from "../arrays/crew/firstNames.js";
import { firstNamesMale } from "../arrays/crew/firstNames.js";
import { lastNames } from "../arrays/crew/lastNames.js";
import { birthplace } from "../arrays/crew/birthplace.js";

export class CrewMember {
  constructor() {
    this.name = this.#generateName();
    this.gender = this.#generateGender();
    this.age = this.#generateAge();
    this.birthplace = this.#generateBirthplace();
    this.rating = this.#generateRating();
    this.scoreTRE = this.#generateScoreTRE();

    this.id = this.#generateId();
  }

  #generateId() {
    const namePartFirst = this.name.split("")[0][0];
    const lastIsShort = this.name.split(" ")[1].length < 3;
    const namePartlastShort = this.name.split(" ")[1].slice(0, 3).toUpperCase() + "x";
    const namePartLastNormal = this.name.split(" ")[1].slice(0, 3).toUpperCase();
    let namePartLast = lastIsShort ? namePartlastShort : namePartLastNormal;
    const namePart = namePartFirst + namePartLast;

    let gradePart;

    if (this.scoreTRE >= 4400) {
      gradePart = "S";
    } else if (this.scoreTRE < 4400 && this.scoreTRE >= 4200) {
      gradePart = "A";
    } else if (this.scoreTRE < 4200 && this.scoreTRE >= 3900) {
      gradePart = "B";
    } else if (this.scoreTRE < 3900 && this.scoreTRE >= 3500) {
      gradePart = "C";
    } else if (this.scoreTRE < 3500 && this.scoreTRE >= 3300) {
      gradePart = "D";
    } else {
      gradePart = "F";
    }

    const min = 10000000000;
    const max = 100000000000;
    const serialPart = Math.floor(Math.random() * (max - min)) + min;

    const birthplacePart = this.birthplace.slice(0, 3).toUpperCase();

    const allParts = [namePart, gradePart, serialPart, birthplacePart].join("/");

    return allParts;
  }

  #generateBirthplace() {
    return birthplace[Math.floor(Math.random() * birthplace.length)];
  }

  #generateName() {
    let firstName;
    const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
    if (this.gender === "m") {
      firstName = firstNamesMale[Math.floor(Math.random() * firstNamesMale.length)];
    } else {
      firstName = firstNamesFemale[Math.floor(Math.random() * firstNamesFemale.length)];
    }

    return `${firstName} ${lastName}`;
  }

  #generateGender() {
    return Math.random() < 0.5 ? "f" : "m";
  }

  #generateAge() {
    const min = 20;
    const max = 66;
    let age = Math.floor(Math.random() * (max - min)) + min;

    // Reduce the amount of older people
    if (age >= 39) {
      age = Math.random() < 0.7 ? age - 20 : age;
    }

    return age;
  }

  #generateRating() {
    const min = 1;
    const max = 10;
    const rating = Math.floor(Math.random() * (max - min)) + min;

    return rating;
  }

  #generateScoreTRE() {
    const min = 2999;
    const max = 4501;
    let scoreTRE = Math.floor(Math.random() * (max - min)) + min;

    // Persons born on "SS3" are all at least grade "B",
    // with much higher chance to be "S" grade
    if (this.birthplace === "SS3") {
      if (scoreTRE < 3300) {
        scoreTRE += 4600 - 3300;
      } else if (scoreTRE < 3500) {
        scoreTRE += 4600 - 3500;
      } else if (scoreTRE < 3900) {
        scoreTRE += 4600 - 3850;
      } else {
        scoreTRE += 0;
      }
    }

    return scoreTRE;
  }
}
