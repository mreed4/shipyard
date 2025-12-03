import { createCrewMember } from "./createCrewMember.js";

export function generateCrewMembers(desiredAmount = 50) {
  const crewMembers = [];

  for (let i = 1; i <= desiredAmount; i++) {
    crewMembers.push(createCrewMember());
  }

  return crewMembers;
}
