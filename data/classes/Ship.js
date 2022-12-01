export class Ship {
  constructor(shipClass, shipyard) {
    this.shipClass = shipClass;
    this.shipyard = shipyard;
    // Everything below in the constructor is unique per ship
    this.shipId = this.generateShipId(this.shipClass.name, this.shipyard);
    this.engineSerials = this.generateEngineSerials(this.shipClass.engines.count);
    // this.crewMembers = this.generateCrewMembers(this.shipClass.name);
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

  generateShipId(shipClassName, shipShipyard) {
    const min = 1000000000;
    const max = 10000000000;
    const prefix = String(shipClassName).slice(0, 2);
    const suffix = String(shipShipyard).slice(0, 3).toUpperCase();
    const serial = Math.floor(Math.random() * (max - min)) + min;
    return `${prefix}/${serial}/${suffix}`;
  }

  generateEngineSerials(numEngines) {
    let engineSerials = [];
    const min = 10000000000;
    const max = 100000000000;
    for (let i = 1; i <= numEngines; i++) {
      const suffix = String.fromCharCode(i + 64);
      const serial = Math.floor(Math.random() * (max - min)) + min;
      engineSerials.push(`${serial}/${suffix}:`);
    }
    return engineSerials;
  }

  generateCrewMembers(shipClass) {
    let crewMembers = this.shipClass.keyCrew;
    if (shipClass === "Letios") {
      // crewMembers.pilot = "Test1";
      // crewMembers.coPilot = "Test2";
      return crewMembers;
    }
  }
}
