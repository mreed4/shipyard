export class Ship {
  constructor(shipClass, shipyard) {
    this.shipClass = shipClass;
    this.shipId = this.generateShipId(this.shipClass.name);
    this.engineSerials = this.generateEngineSerials(this.shipClass.engines.count);
    this.shipyard = shipyard;
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

  generateShipId(shipClassName) {
    const min = 100000;
    const max = 1000000;
    const prefix = String(shipClassName).slice(0, 2);
    const serial = Math.floor(Math.random() * (max - min)) + min;
    return `${prefix}/${serial}`;
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
}
