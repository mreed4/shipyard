import { generateShipCrew } from "./createCrewMember.js";

export function createShip(shipType, shipyard, yearBuilt) {
  // Generate unique ship ID
  const generateShipId = () => {
    const min = 10000000000;
    const max = 100000000000;
    const prefix = String(shipType.name).slice(0, 2);
    const suffix = String(shipyard).slice(0, 3).toUpperCase();
    const serial = Math.floor(Math.random() * (max - min)) + min;
    return `${prefix}/${serial}/${suffix}`;
  };

  // Generate engine serials
  const generateEngineSerials = () => {
    const engineSerials = [];
    const min = 10000000000;
    const max = 100000000000;

    for (let i = 1; i <= shipType.engines.count; i++) {
      const suffix = String.fromCharCode(i + 64);
      const serial = Math.floor(Math.random() * (max - min)) + min;
      engineSerials.push(`${serial}/${suffix}`);
    }

    return engineSerials;
  };

  // Return the ship instance
  return {
    // Copy all properties from shipType
    ...shipType,

    // Add instance-specific properties
    shipyard,
    yearBuilt,
    shipName: "",
    alignment: "",

    // Generated properties
    shipId: generateShipId(),
    engineSerials: generateEngineSerials(),
    crewMembers: generateShipCrew(shipType.keyCrew),

    // Game data
    mods: [],
    __gameData: {
      ...shipType.__gameData,
      moddedHitPoints: 0,
      moddedDamageOutput: 0,
    },
  };
}
