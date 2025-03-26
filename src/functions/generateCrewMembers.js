import { CrewMember } from "../data/classes/CrewMember.js";

export function generateCrewMembers(desiredAmount, desiredInfoType) {
  let crewMembers = [];
  for (let i = 1; i <= desiredAmount; i++) {
    crewMembers.push(new CrewMember());
  }

  // If no specific info type is desired, return the full crew member objects
  // Otherwise, return an array of the specified info type for each crew member
  return !desiredInfoType ? crewMembers : crewMembers.map((crewMember) => crewMember[desiredInfoType]);
}
