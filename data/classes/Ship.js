export class Ship {
  constructor(shipName, shipClass, shipyard, alignment) {
    this._shipName = shipName; // e.g. "HMS Victory"
    this._shipClass = shipClass; // See data\arrays\shipClasses.js--an array of objects
    this._shipyard = shipyard; // See data\arrays\shipyards.js--an array of objects
    this._alignment = alignment;
  }

  get shipName() {
    return this._shipName;
  }

  get shipClass() {
    return this._shipClass; // This will be an object
  }

  get shipyard() {
    return this._shipyard;
  }

  get alignment() {
    return this._alignment;
  }

  set shipName(string) {
    this._shipName = string;
  }

  set shipClass(objectOrString) {
    this._shipClass = objectOrString;
  }

  set shipyard(string) {
    this._shipyard = string;
  }

  set alignment(string) {
    this._alignment = string;
  }

  generateYearBuilt() {
    const min = 2300;
    const max = 2501;
    return Math.floor(Math.random() * (max - min)) + min;
  }

  generateShipId() {
    const letter = this._shipClass.name.slice(0, 2);
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
