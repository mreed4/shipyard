export class GuaranteeSystem {
  constructor(initialState = null) {
    this.thresholds = {
      standardShipPool: { rare: 50, epic: 200, legendary: 500 },
      premiumShipPool: { epic: 100, legendary: 300 },
      standardCrewPool: { rare: 50, epic: 200, legendary: 500 },
      eliteCrewPool: { epic: 100, legendary: 300 },
      mixedPool: { rare: 75, epic: 250, legendary: 600 },
    };

    // Migrate old counter format (number) to new format (object per rarity)
    if (initialState?.counters) {
      this.counters = {};
      Object.keys(this.thresholds).forEach((poolKey) => {
        const oldCounter = initialState.counters[poolKey];
        if (typeof oldCounter === "number") {
          // Migrate: set all rarity counters to the old single counter value
          this.counters[poolKey] = {};
          Object.keys(this.thresholds[poolKey]).forEach((rarity) => {
            this.counters[poolKey][rarity] = oldCounter;
          });
        } else if (typeof oldCounter === "object") {
          // Already new format
          this.counters[poolKey] = { ...oldCounter };
        } else {
          // Initialize new pool
          this.counters[poolKey] = {};
          Object.keys(this.thresholds[poolKey]).forEach((rarity) => {
            this.counters[poolKey][rarity] = 0;
          });
        }
      });
    } else {
      // Initialize fresh counters
      this.counters = {
        standardShipPool: { rare: 0, epic: 0, legendary: 0 },
        premiumShipPool: { epic: 0, legendary: 0 },
        standardCrewPool: { rare: 0, epic: 0, legendary: 0 },
        eliteCrewPool: { epic: 0, legendary: 0 },
        mixedPool: { rare: 0, epic: 0, legendary: 0 },
      };
    }
  }

  // Increment all counters by 1 and return which guarantees (if any) were triggered
  // Only resets the specific rarity counter that triggered
  processPull(poolKey) {
    if (!this.counters[poolKey]) return [];

    const thresholds = this.thresholds[poolKey];
    if (!thresholds) return [];

    const triggered = [];

    // Increment all counters for this pool
    Object.keys(this.counters[poolKey]).forEach((rarity) => {
      this.counters[poolKey][rarity]++;
    });

    // Check each rarity threshold (highest to lowest)
    const rarityOrder = ["legendary", "epic", "rare"];
    for (const rarity of rarityOrder) {
      if (thresholds[rarity] && this.counters[poolKey][rarity] >= thresholds[rarity]) {
        triggered.push(rarity);
        this.counters[poolKey][rarity] = 0; // Reset only this rarity's counter
      }
    }

    return triggered; // Return array of triggered guarantees
  }

  getState() {
    return { counters: JSON.parse(JSON.stringify(this.counters)) };
  }

  getCounters(poolKey) {
    return this.counters[poolKey] || {};
  }

  getNextThresholds(poolKey) {
    const thresholds = this.thresholds[poolKey];
    const counters = this.counters[poolKey];

    if (!thresholds || !counters) return [];

    const result = [];
    const rarityOrder = ["rare", "epic", "legendary"];

    for (const rarity of rarityOrder) {
      if (thresholds[rarity] && counters[rarity] !== undefined) {
        result.push({
          rarity,
          threshold: thresholds[rarity],
          current: counters[rarity],
        });
      }
    }

    return result;
  }
}
