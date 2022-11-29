import { shipyards } from "../../data/arrays/shipyards.js";
import { shipClasses } from "../../data/arrays/shipClasses.js";

export function getRandInfo(info) {
  function randomShipClass() {
    return shipClasses[Math.floor(Math.random() * shipClasses.length)];
  }

  function randomShipyard() {
    return shipyards[Math.floor(Math.random() * shipyards.length)];
  }

  const generator = {
    class: randomShipClass(),
    shipyard: randomShipyard(),
  };

  return generator[info] || "ERROR - Enter valid parameter";
}
