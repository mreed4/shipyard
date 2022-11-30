export class Ship {
  constructor(shipClass, shipyard, yearBuilt, alignment) {
    this.shipClass = shipClass;
    this.shipId = this.generateShipId(this.shipClass.name);
    this.engineSerials = this.generateEngineSerials(this.shipClass.engines.count);
    this.shipyard = shipyard;
    this.yearBuilt = yearBuilt;
    this.alignment = alignment;
  }

  setShipName(string) {
    this.shipName = string;
  }

  generateShipId(name) {
    const letter = name.slice(0, 2);
    const min = 10000;
    const max = 100000;
    const num = Math.floor(Math.random() * (max - min)) + min;
    return `${letter}${num}`;
  }

  generateEngineSerials(numEngines) {
    let engineSerials = [];
    const min = 100000000;
    const max = 1000000000;
    for (let i = 1; i <= numEngines; i++) {
      const num = Math.floor(Math.random() * (max - min)) + min;
      engineSerials.push(`${String.fromCharCode(i + 64)}:${num}`);
    }
    return engineSerials;
  }
}
