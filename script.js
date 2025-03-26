import { generateShips, buildShipStats } from "./shipFunctions.js";
import { generateCrewMembers } from "./functions/generateCrewMembers.js";
import { CrewMember } from "./data/classes/CrewMember.js";

export function getElementById(id) {
  return document.getElementById(id);
}

export function updateInnerHTML(elementId, htmlContent) {
  const element = getElementById(elementId);
  if (element) {
    element.innerHTML = htmlContent;
    if (elementId === "data-list") {
      if (htmlContent) {
        element.classList.add("visible");
        element.classList.remove("hidden");
      } else {
        element.classList.add("hidden");
        element.classList.remove("visible");
      }
    }
  }
}

function populateDropdown() {
  const crewMemberKeys = Object.getOwnPropertyNames(new CrewMember()).filter((key) => !key.startsWith("_"));
  const optionsHtml = crewMemberKeys.map((key) => `<option value="${key}" ${key === "id" ? "selected" : ""}>${key}</option>`).join("");
  updateInnerHTML("info-type-dropdown", optionsHtml);
}

function updateCrewDashboard(crewMembers) {
  const crewDashboard = getElementById("crew-dashboard");
  if (crewDashboard) {
    const crewItems = crewMembers.map((member) => `<li>${member}</li>`).join("");
    crewDashboard.innerHTML = crewItems;
  }
}

function generateCrew() {
  const crewCount = parseInt(getElementById("crew-count-input").value) || 10; // Default to 10 if input is invalid
  const crewMembers = generateCrewMembers(crewCount);
  console.log(crewMembers);
  const crewList = `<ol>${crewMembers.map((crewMember) => `<li>${crewMember.id}</li>`).join("")}</ol>`;

  updateInnerHTML("data-list", crewList);
  updateCrewDashboard(crewMembers); // Update crew dashboard
}

function enableMouseScrollForNumberInput(inputId, min, max) {
  const inputElement = getElementById(inputId);
  if (inputElement) {
    const handleWheel = (event) => {
      event.preventDefault();
      const currentValue = parseInt(inputElement.value) || 0;
      const newValue = currentValue + (event.deltaY < 0 ? 1 : -1);
      inputElement.value = Math.min(Math.max(newValue, min), max);
    };

    inputElement.addEventListener("wheel", handleWheel);

    // Select all text when the input gains focus
    inputElement.addEventListener("focus", () => {
      inputElement.select();
    });
  }
}

getElementById("generate-ships-button").addEventListener("click", generateShips);
getElementById("generate-crew-button").addEventListener("click", generateCrew);

// Populate the dropdown and enable mouse scroll for the input on DOMContentLoaded
document.addEventListener("DOMContentLoaded", () => {
  populateDropdown();
  enableMouseScrollForNumberInput("ship-count-input", 1, 50);
  enableMouseScrollForNumberInput("crew-count-input", 1, 50);
});
