import { massProduceShips } from "./functions/massProduceShips.js";
import { generateCrewMembers } from "./functions/generateCrewMembers.js";
import { CrewMember } from "./data/classes/CrewMember.js";

function getElementById(id) {
  return document.getElementById(id);
}

function updateInnerHTML(elementId, htmlContent) {
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

function generateShips() {
  const shipCount = parseInt(getElementById("ship-count-input").value) || 20; // Defaolt to 20 if input is invalid
  const ships = massProduceShips(shipCount);
  const shipsList = `<ol>${ships.map((id) => `<li>${id}</li>`).join("")}</ol>`;

  updateInnerHTML("data-list", shipsList);
}

function generateCrew() {
  const selectedInfoType = getElementById("info-type-dropdown").value;
  const crewMembers = generateCrewMembers(10, selectedInfoType);
  const crewList = `<ol>${crewMembers.map((info) => `<li>${info}</li>`).join("")}</ol>`;

  updateInnerHTML("data-list", crewList);
}

function enableMouseScrollForInput() {
  const shipCountInput = getElementById("ship-count-input");
  if (shipCountInput) {
    const handleWheel = (event) => {
      event.preventDefault();
      const currentValue = parseInt(shipCountInput.value) || 0;
      const min = parseInt(shipCountInput.min) || 1;
      const max = parseInt(shipCountInput.max) || 20;
      const newValue = currentValue + (event.deltaY < 0 ? 1 : -1);
      shipCountInput.value = Math.min(Math.max(newValue, min), max);
    };

    shipCountInput.addEventListener("wheel", handleWheel);

    // Select all text when the input gains focus
    shipCountInput.addEventListener("focus", () => {
      shipCountInput.select();
    });

    // Remove the event listener when the input is no longer needed
    shipCountInput.addEventListener("blur", () => {
      shipCountInput.removeEventListener("wheel", handleWheel);
    });
  }
}

getElementById("generate-ships-button").addEventListener("click", generateShips);
getElementById("generate-crew-button").addEventListener("click", generateCrew);

// Popolate the dropdown and enable mouse scroll for the input on DOMContentLoaded
document.addEventListener("DOMContentLoaded", () => {
  populateDropdown();
  enableMouseScrollForInput();
});
