import { CrewMember } from "./CrewMember.js";

export class Ship {
  #shipId;
  #engineSerials;
  #crewMembers;
  #mods;
  #__gameData;

  constructor(shipClass, shipyard) {
    this.shipClass = shipClass;
    this.shipyard = shipyard;
    /* */
    this.#shipId = this.#generateShipId();
    this.#engineSerials = this.#generateEngineSerials();
    this.#crewMembers = this.#generateCrewMembers();
    this.#mods = [];
    this.#__gameData = {
      moddedHitPoints: 0,
      moddedDamageOutput: 0, // Additive to the base damge from the shipClass
    };
  }

  setShipName(desiredShipName) {
    this.shipName = String(desiredShipName);
  }

  setAlignment(desiredAlignment) {
    this.alignment = String(desiredAlignment);
  }

  setYearBuilt(desiredYearBuilt) {
    this.yearBuilt = Number(desiredYearBuilt);
  }

  #generateShipId() {
    const min = 10000000000;
    const max = 100000000000;
    const prefix = String(this.shipClass.name).slice(0, 2);
    const suffix = String(this.shipyard).slice(0, 3).toUpperCase();
    const serial = Math.floor(Math.random() * (max - min)) + min;

    const shipId = `${prefix}/${serial}/${suffix}`;

    return shipId;
  }

  #generateEngineSerials() {
    const engineSerials = [];
    const min = 10000000000;
    const max = 100000000000;

    for (let i = 1; i <= this.shipClass.engines.count; i++) {
      const suffix = String.fromCharCode(i + 64);
      const serial = Math.floor(Math.random() * (max - min)) + min;
      engineSerials.push(`${serial}/${suffix}:`);
    }

    return engineSerials;
  }

  #generateCrewMembers() {
    const keyCrew = Object.entries(this.shipClass.keyCrew);
    let crewMembers = []; // Converted to object at end
    const subCrewMembers = [];

    /*
    The below code will instantiate a new CrewMember at every value in the object 
    */
    keyCrew.forEach((crewMember) => {
      const key = crewMember[0];
      const value = crewMember[1];
      const isString = typeof value === "string";

      if (isString) {
        crewMembers.push([key, new CrewMember()]);
      } else {
        const subKeyCrew = Object.entries(value);

        subKeyCrew.forEach((subCrewMember) => {
          const subKey = subCrewMember[0];
          subCrewMembers.push([subKey, new CrewMember()]);
        });

        crewMembers.push([key, Object.fromEntries(subCrewMembers)]);
      }
    });

    // Convert array back to object
    crewMembers = Object.fromEntries(crewMembers);

    return crewMembers;
  }
}
