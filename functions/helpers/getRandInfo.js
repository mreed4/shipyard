import { shipyards } from "../../data/arrays/shipyards.js";
import { shipClasses } from "../../data/arrays/shipClasses.js";

export function getRandInfo(info) {
  if (info === "class") {
    return shipClasses[Math.floor(Math.random() * shipClasses.length)];
  } else if (info === "shipyard") {
    return shipyards[Math.floor(Math.random() * shipyards.length)];
  } else if (info === "year") {
    const min = 2300;
    const max = 2501;
    return Math.floor(Math.random() * (max - min)) + min;
  } else {
    const error = "ERROR Enter valid parameter";
    console.log(error);
  }
}
