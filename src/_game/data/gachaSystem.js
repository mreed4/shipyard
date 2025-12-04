export const currencies = {
  credits: {
    name: "Credits",
    description: "Standard fleet currency earned from missions",
    icon: "💰",
  },
  scrap: {
    name: "Scrap Metal",
    description: "Salvaged from destroyed ships, used for ship pulls",
    icon: "🔩",
  },
  dataSlates: {
    name: "Data Slates",
    description: "Recovered crew records, used for crew pulls",
    icon: "📊",
  },
};

export const gachaPools = {
  standardShipPool: {
    name: "Standard Salvage",
    cost: { scrap: 100 },
    guaranteedRarity: null,
    description: "Salvage random ship components. All ship types available.",
    pullTypes: ["ship"],
    shipTypeWeights: {
      Letios: 0.35,
      Hyperion: 0.25,
      Retion: 0.2,
      Gesan: 0.12,
      Varrett: 0.06,
      Donbas: 0.02,
    },
  },

  premiumShipPool: {
    name: "Priority Salvage",
    cost: { scrap: 1000 },
    guaranteedRarity: "rare",
    description: "Premium salvage with guaranteed rare or better ship.",
    pullTypes: ["ship"],
    shipTypeWeights: {
      Letios: 0.1,
      Hyperion: 0.15,
      Retion: 0.25,
      Gesan: 0.25,
      Varrett: 0.2,
      Donbas: 0.05,
    },
  },

  standardCrewPool: {
    name: "Standard Requisition",
    cost: { dataSlates: 50 },
    guaranteedRarity: null,
    description: "Requisition crew from standard personnel records.",
    pullTypes: ["crew"],
  },

  eliteCrewPool: {
    name: "Elite Requisition",
    cost: { dataSlates: 500 },
    guaranteedRarity: "rare",
    description: "Access elite personnel records. Guaranteed rare or better.",
    pullTypes: ["crew"],
  },

  mixedPool: {
    name: "Combined Operations",
    cost: { scrap: 150, dataSlates: 150 },
    guaranteedRarity: null,
    description: "Pull either ships or crew. Higher variety, lower cost.",
    pullTypes: ["ship", "crew"],
    typeWeights: { ship: 0.4, crew: 0.6 },
  },
};

export const refundRates = {
  common: { scrap: 20, dataSlates: 10 },
  uncommon: { scrap: 50, dataSlates: 25 },
  rare: { scrap: 150, dataSlates: 75 },
  epic: { scrap: 500, dataSlates: 250 },
  legendary: { scrap: 2000, dataSlates: 1000 },
};
