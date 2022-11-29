import { shipyards } from "../../data/arrays/shipyards.js";
import { shipClasses } from "../../data/arrays/shipClasses.js";

export function getRandInfo(info, num = 6) {
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
