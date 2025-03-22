import { massProduceShips } from "./functions/massProduceShips.js";
import { generateCrewMembers } from "./functions/generateCrewMembers.js";
import { CrewMember } from "./data/classes/CrewMember.js";

function populateDropdown() {
  const infoTypeDropdown = document.getElementById("infoTypeDropdown");
  const crewMemberKeys = Object.getOwnPropertyNames(new CrewMember()).filter((key) => !key.startsWith("_"));
  infoTypeDropdown.innerHTML = crewMemberKeys.map((key) => `<option value="${key}">${key}</option>`).join("");
}

function generateShips() {
  const shipListDiv = document.getElementById("shipList");
  const shipCountInput = document.getElementById("shipCountInput");
  const shipCount = parseInt(shipCountInput.value) || 20; // Default to 20 if input is invalid
  const ships = massProduceShips(shipCount);
  shipListDiv.innerHTML = `<h2>Generated Ship IDs:</h2><ul>${ships.map((id) => `<li>${id}</li>`).join("")}</ul>`;
}

function generateCrew() {
  const crewListDiv = document.getElementById("shipList");
  const infoTypeDropdown = document.getElementById("infoTypeDropdown");
  const selectedInfoType = infoTypeDropdown.value;
  const crewMembers = generateCrewMembers(10, selectedInfoType);
  crewListDiv.innerHTML = `<h2>Generated Crew Members (${selectedInfoType}):</h2><ul>${crewMembers
    .map((info) => `<li>${info}</li>`)
    .join("")}</ul>`;
}

document.getElementById("generateShipsButton").addEventListener("click", generateShips);
document.getElementById("generateCrewButton").addEventListener("click", generateCrew);
document.addEventListener("DOMContentLoaded", populateDropdown);
