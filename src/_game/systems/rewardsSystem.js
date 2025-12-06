export function calculateMissionRewards(mission, performance) {
  const baseRewards = {
    credits: mission.difficulty * 500,
    scrap: mission.difficulty * 10,
    dataSlates: mission.difficulty * 5,
  };

  return {
    credits: baseRewards.credits,
    scrap: baseRewards.scrap,
    dataSlates: baseRewards.dataSlates,
  };
}

export function calculateDailyCurrency() {
  return {
    scrap: 100,
    dataSlates: 50,
  };
}

export function calculatePerformance(playerFleet, enemyFleet, shipsLost, won) {
  if (!won) return "poor";

  const totalShips = playerFleet.length;
  const lossPercentage = shipsLost / totalShips;

  if (lossPercentage === 0) return "perfect";
  if (lossPercentage <= 0.2) return "excellent";
  if (lossPercentage <= 0.4) return "good";
  return "average";
}

export function earnCurrency(currentCurrency, rewards) {
  return {
    credits: (currentCurrency.credits || 0) + (rewards.credits || 0),
    scrap: (currentCurrency.scrap || 0) + (rewards.scrap || 0),
    dataSlates: (currentCurrency.dataSlates || 0) + (rewards.dataSlates || 0),
  };
}
