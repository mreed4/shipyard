import { crewData } from "../data/crew.js";

export function createCrewMember() {
  // Generate gender first (needed for name generation)
  const generateGender = () => {
    return Math.random() < 0.5 ? "F" : "M";
  };

  const gender = generateGender();

  // Generate birthplace
  const generateBirthplace = () => {
    return crewData.birthplace[Math.floor(Math.random() * crewData.birthplace.length)];
  };

  const birthplace = generateBirthplace();

  // Generate TRE score (depends on birthplace)
  const generateScoreTRE = (birthplace) => {
    const min = 2999;
    const max = 4501;
    let scoreTRE = Math.floor(Math.random() * (max - min)) + min;

    // Adjust score for persons born on "SS3"
    if (birthplace === "SS3") {
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
  };

  const scoreTRE = generateScoreTRE(birthplace);

  // Get grade based on TRE score
  const getGrade = (scoreTRE) => {
    const gradeLookup = {
      S: scoreTRE >= 4400,
      A: scoreTRE >= 4200 && scoreTRE < 4400,
      B: scoreTRE >= 3900 && scoreTRE < 4200,
      C: scoreTRE >= 3500 && scoreTRE < 3900,
      D: scoreTRE >= 3300 && scoreTRE < 3500,
      F: scoreTRE < 3300,
    };

    return Object.keys(gradeLookup).find((grade) => gradeLookup[grade]);
  };

  const grade = getGrade(scoreTRE);

  // Generate name (depends on gender)
  const generateName = (gender) => {
    const lastName = crewData.names.last[Math.floor(Math.random() * crewData.names.last.length)];
    const firstNameKey = gender === "M" ? "male" : "female";
    const firstName = crewData.names.first[firstNameKey][Math.floor(Math.random() * crewData.names.first[firstNameKey].length)];
    return `${firstName} ${lastName}`;
  };

  const name = generateName(gender);

  // Generate age
  const generateAge = () => {
    const min = 20;
    const max = 66;
    let age = Math.floor(Math.random() * (max - min)) + min;

    // Reduce the amount of older people
    if (age >= 39) {
      age = Math.random() < 0.7 ? age - 20 : age;
    }

    return age;
  };

  const age = generateAge();

  // Generate ID (depends on name, grade, and birthplace)
  const generateId = (name, grade, birthplace) => {
    const [firstName, lastName] = name.split(" ");
    const namePartFirst = firstName[0];
    const namePartLast = lastName.slice(0, 3).toUpperCase().padEnd(3, "x");
    const namePart = namePartFirst + namePartLast;

    const gradePart = grade;

    // Generate a random 10-digit serial number
    const serialPart = Math.floor(Math.random() * (100000000000 - 10000000000)) + 10000000000;

    // Birthplace is always 3 characters, so we slice it to ensure consistency
    const birthplacePart = birthplace.slice(0, 3).toUpperCase();

    return [namePart, gradePart, serialPart, birthplacePart].join("/");
  };

  const id = generateId(name, grade, birthplace);

  // Return the crew member instance
  return {
    id,
    name,
    gender,
    age,
    birthplace,
    scoreTRE,
    grade,
  };
}

export function generateShipCrew(keyCrew) {
  const crewMembers = [];
  const subCrewMembers = [];

  Object.entries(keyCrew).forEach(([key, value]) => {
    const isString = typeof value === "string";

    if (isString) {
      crewMembers.push([key, createCrewMember()]);
    } else {
      const subKeyCrew = Object.entries(value);

      subKeyCrew.forEach(([subKey]) => {
        subCrewMembers.push([subKey, createCrewMember()]);
      });

      crewMembers.push([key, Object.fromEntries(subCrewMembers)]);
    }
  });

  return Object.fromEntries(crewMembers);
}
