export class Ship {
  constructor(shipName, shipClass, shipyard, yearBuilt, alignment) {
    this.shipName = shipName; // e.g. "HMS Victory"
    this.shipClass = shipClass; // See data\arrays\shipClasses.js--an array of objects
    this.shipId = this.generateShipId();
    this.engineSerials = this.generateEngineSerials(this.shipClass.engines.count);
    this.shipyard = shipyard; // See data\arrays\shipyards.js--an array of objects
    this.yearBuilt = yearBuilt;
    this.alignment = alignment;
  }

  generateShipId() {
    const letter = this.shipClass.name.slice(0, 2);
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
