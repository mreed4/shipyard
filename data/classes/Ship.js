import { CrewMember } from "./CrewMember.js";

export class Ship {
  constructor(shipClass, shipyard) {
    this.shipClass = shipClass;
    this.shipyard = shipyard;
    /* */
    this.shipId = this.generateShipId();
    this.engineSerials = this.generateEngineSerials();
    this.crewMembers = this.generateCrewMembers();
    this.mods = [];
    this.__gameData = {
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

  generateShipId() {
    const min = 10000000000;
    const max = 100000000000;
    const prefix = String(this.shipClass.name).slice(0, 2);
    const suffix = String(this.shipyard).slice(0, 3).toUpperCase();
    const serial = Math.floor(Math.random() * (max - min)) + min;
    return `${prefix}/${serial}/${suffix}`;
  }

  generateEngineSerials() {
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

  generateCrewMembers() {
    const keyCrewRoles = Object.entries(this.shipClass.keyCrew);
    let crewMembers = [];
    const subCrewMembers = [];

    keyCrewRoles.forEach((crewMember) => {
      const crewMemberRole = crewMember[0];
      const crewMemberName = crewMember[1];
      const isString = typeof crewMemberName === "string";
      if (isString) {
        crewMembers.push([crewMemberRole, new CrewMember()]);
      } else {
        const blankSubCrewMembers = Object.entries(crewMemberName);
        blankSubCrewMembers.forEach((subCrewMember) => {
          const subCrewMemberRole = subCrewMember[0];
          subCrewMembers.push([subCrewMemberRole, new CrewMember()]);
        });
        crewMembers.push([crewMemberRole, Object.fromEntries(subCrewMembers)]);
      }
    });

    crewMembers = Object.fromEntries(crewMembers);

    return crewMembers;
  }
}
