export class Ship {
  constructor(shipName, shipClass, shipyard, yearBuilt, alignment) {
    this._shipName = shipName;
    this._shipClass = shipClass;
    this._shipyard = shipyard;
    this._yearBuilt = yearBuilt;
    this._alignment = alignment;
  }

  get shipName() {
    return this._shipName;
  }

  get shipClass() {
    return this._shipClass;
  }

  get shipyard() {
    return this._shipyard;
  }

  get yearBuilt() {
    return this._yearBuilt;
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

  set yearBuilt(num) {
    this._yearBuilt = num;
  }

  set alignment(string) {
    this._alignment = string;
  }

  shipId() {
    const isObject = typeof this._shipClass === "object";
    const letter = isObject ? this._shipClass.name.slice(0, 2) : this._shipClass.slice(0, 2);
    const min = 10000;
    const max = 100000;
    const num = Math.floor(Math.random() * (max - min)) + min;
    return `${letter}${num}`;
  }

  massProduce() {}
}
