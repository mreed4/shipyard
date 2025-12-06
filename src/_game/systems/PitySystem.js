export class PitySystem {
  constructor(initialState = null) {
    this.counters = initialState?.counters || {
      standardShipPool: 0,
      premiumShipPool: 0,
      standardCrewPool: 0,
      eliteCrewPool: 0,
      mixedPool: 0,
    };

    this.thresholds = {
      standardShipPool: { rare: 50, epic: 200, legendary: 500 },
      premiumShipPool: { epic: 100, legendary: 300 },
      standardCrewPool: { rare: 50, epic: 200, legendary: 500 },
      eliteCrewPool: { epic: 100, legendary: 300 },
      mixedPool: { rare: 75, epic: 250, legendary: 600 },
    };
  }

  incrementCounter(poolKey) {
    if (this.counters.hasOwnProperty(poolKey)) {
      this.counters[poolKey]++;
    }
  }

  checkPity(poolKey, pulledRarity) {
    const thresholds = this.thresholds[poolKey];
    const counter = this.counters[poolKey];

    if (!thresholds || counter === undefined) return null;

    // If legendary pulled, reset counter
    if (pulledRarity === "legendary") {
      this.counters[poolKey] = 0;
      return null;
    }

    // Check if player hit pity threshold
    const rarityOrder = ["rare", "epic", "legendary"];
    for (const rarity of rarityOrder) {
      if (thresholds[rarity] && counter >= thresholds[rarity]) {
        this.counters[poolKey] = 0;
        return rarity;
      }
    }

    return null;
  }

  resetCounter(poolKey) {
    if (this.counters.hasOwnProperty(poolKey)) {
      this.counters[poolKey] = 0;
    }
  }

  getState() {
    return {
      counters: { ...this.counters },
    };
  }

  getCounter(poolKey) {
    return this.counters[poolKey] || 0;
  }

  getNextPityThreshold(poolKey) {
    const thresholds = this.thresholds[poolKey];
    const counter = this.counters[poolKey];

    if (!thresholds) return null;

    const rarityOrder = ["rare", "epic", "legendary"];
    for (const rarity of rarityOrder) {
      if (thresholds[rarity] && counter < thresholds[rarity]) {
        return {
          rarity,
          threshold: thresholds[rarity],
          remaining: thresholds[rarity] - counter,
        };
      }
    }

    return null;
  }
}
