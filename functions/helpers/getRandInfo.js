import { shipyards } from "../../data/arrays/shipyards.js";
import { shipClasses } from "../../data/arrays/shipClasses.js";

export function getRandInfo(info, num) {
  if (info === "class") {
    return shipClasses[Math.floor(Math.random() * shipClasses.length)];
  } else if (info === "shipyard") {
    return shipyards[Math.floor(Math.random() * shipyards.length)];
  } else if (info === "year") {
    const min = 2300;
    const max = 2501;
    return Math.floor(Math.random() * (max - min)) + min;
  } else if (info === "engine") {
    const arr = [];
    const min = 100000;
    const max = 1000000;
    for (let i = 1; i <= num; i++) {
      arr.push(Math.floor(Math.random() * (max - min)) + min);
    }
    return arr;
  } else {
    const error = "ERROR Enter valid parameter";
    console.log(error);
  }
}
