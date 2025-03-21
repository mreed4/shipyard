import { crewData } from "../arrays/crew/crew.js";

export class CrewMember {
  constructor() {
    this.gender = this.#generateGender(); // Moved before name generation
    this.name = this.#generateName();
    this.age = this.#generateAge();
    this.birthplace = this.#generateBirthplace();
    this.rating = this.#generateRating();
    this.scoreTRE = this.#generateScoreTRE();

    this.id = this.#generateId();
  }

  #generateId() {
    const [firstName, lastName] = this.name.split(" ");
    const namePartFirst = firstName[0];
    const namePartLast = lastName.slice(0, 3).toUpperCase().padEnd(3, "X");
    const namePart = namePartFirst + namePartLast;

    const gradeLookup = {
      S: this.scoreTRE >= 4400,
      A: this.scoreTRE >= 4200 && this.scoreTRE < 4400,
      B: this.scoreTRE >= 3900 && this.scoreTRE < 4200,
      C: this.scoreTRE >= 3500 && this.scoreTRE < 3900,
      D: this.scoreTRE >= 3300 && this.scoreTRE < 3500,
      F: this.scoreTRE < 3300,
    };

    const gradePart = Object.keys(gradeLookup).find((grade) => gradeLookup[grade]);

    // Generate a random 10-digit serial number
    const serialPart = Math.floor(Math.random() * (100000000000 - 10000000000)) + 10000000000;

    // Birthplace is always 3 characters, so we slice it to ensure consistency
    const birthplacePart = this.birthplace.slice(0, 3).toUpperCase();

    return [namePart, gradePart, serialPart, birthplacePart].join("/");
  }

  #generateBirthplace() {
    return crewData.birthplace[Math.floor(Math.random() * crewData.birthplace.length)];
  }

  #generateName() {
    // Generate a random last name and first name based on the gender
    const lastName = crewData.names.last[Math.floor(Math.random() * crewData.names.last.length)];
    const firstNameKey = this.gender === "M" ? "male" : "female";
    const firstName = crewData.names.first[firstNameKey][Math.floor(Math.random() * crewData.names.first[firstNameKey].length)];

    return `${firstName} ${lastName}`;
  }

  #generateGender() {
    return Math.random() < 0.5 ? "F" : "M";
  }

  #generateAge() {
    const min = 20;
    const max = 66;
    let age = Math.floor(Math.random() * (max - min)) + min;

    // Reduce the amount of older people
    if (age >= 39) {
      age = Math.random() < 0.7 ? age - 20 : age; //
    }

    return age;
  }

  #generateRating() {
    const min = 1;
    const max = 10;
    const rating = Math.floor(Math.random() * (max - min)) + min;

    return rating;
  }

  // Used to generate the score for the TRE (Training Readiness Evaluation)
  // The score is based in part on birthplace and age of the crew member
  #generateScoreTRE() {
    const min = 2999;
    const max = 4501;
    let scoreTRE = Math.floor(Math.random() * (max - min)) + min;

    // Adjust score for persons born on "SS3"
    if (this.birthplace === "SS3") {
      const adjustments = [
        { threshold: 3300, increment: 1300 },
        { threshold: 3500, increment: 1100 },
        { threshold: 3900, increment: 750 },
      ];

      for (const { threshold, increment } of adjustments) {
        if (scoreTRE < threshold) {
          scoreTRE += increment;
          break;
        }
      }
    }

    return scoreTRE;
  }
}
