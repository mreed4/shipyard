import { shipyards } from "../../data/arrays/ship/shipyards.js";
import { shipClasses } from "../../data/arrays/ship/shipClasses.js";

export function getRandInfo(info) {
  function randomShipClass() {
    return shipClasses[Math.floor(Math.random() * shipClasses.length)];
  }

  function randomShipyard() {
    return shipyards[Math.floor(Math.random() * shipyards.length)];
  }

  function randomYearBuilt() {
    const min = 2300;
    const max = 2501;
    return Math.floor(Math.random() * (max - min)) + min;
  }

  const generator = {
    class: randomShipClass(),
    shipyard: randomShipyard(),
    year: randomYearBuilt(),
  };

  return generator[info] || "ERROR - Enter valid parameter";
}
