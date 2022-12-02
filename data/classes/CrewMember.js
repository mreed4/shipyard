export class CrewMember {
  constructor() {
    this.id = "(Will be calculated based on the below)";
    this.name = "(Will be randomized based on gender and external arrays)";
    this.birthplace = "(Will be randomized based on external array)";
    this.age = this.generateAge();
    this.gender = this.generateGender();
    this.rating = this.generateRating();
    this.scoreTRE = this.generateScoreTRE();
  }

  generateId(name) {}

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
