import { CrewMember } from "../data/classes/CrewMember.js";

export function generateCrewMembers(desiredAmount, desiredInfoType) {
  let crewMembers = [];
  for (let i = 1; i <= desiredAmount; i++) {
    crewMembers.push(new CrewMember());
  }

  return !desiredInfoType ? crewMembers : crewMembers.map((crewMember) => crewMember[desiredInfoType]);
}
