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

  function randomEngineIds() {
    const engines = [];
    const min = 100000;
    const max = 1000000;
    for (let i = 1; i <= num; i++) {
      engines.push(Math.floor(Math.random() * (max - min)) + min);
    }
    return engines;
  }

  return (
    {
      class: randomShipClass(),
      shipyard: randomShipClass(),
      year: randomYearBuilt(),
      engines: randomEngineIds(),
    }[info] || "ERROR - Enter valid parameter"
  );
}
