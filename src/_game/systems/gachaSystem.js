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
  priorityTokens: {
    name: "Priority Tokens",
    description: "Premium currency for priority salvage operations",
    icon: "🎫",
  },
  eliteVouchers: {
    name: "Elite Vouchers",
    description: "Premium currency for elite crew requisitions",
    icon: "🎖️",
  },
};

export const gachaPools = {
  standardShipPool: {
    name: "Standard Salvage",
    cost: { scrap: 100 },
    guaranteedRarity: null,
    description: "Salvage random ship components. All ship types available.",
    pullTypes: ["ship"],
  },

  premiumShipPool: {
    name: "Priority Salvage",
    cost: { priorityTokens: 10 },
    guaranteedRarity: "rare",
    description: "Premium salvage with guaranteed rare or better ship.",
    pullTypes: ["ship"],
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
    cost: { eliteVouchers: 10 },
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
