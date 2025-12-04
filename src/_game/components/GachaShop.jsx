import { useState } from "react";
import { useGameState } from "../contexts/GameStateContext";
import { performGachaPull, performMultiPull, deductCurrency } from "../functions/gachaPull";
import { gachaPools } from "../data/gachaSystem";
import { rarityTiers } from "../data/raritySystem";

export default function GachaShop() {
  const { gameState, updateGameState, addShip, addCrew, updateCurrency, addPullToHistory } = useGameState();
  const [pulling, setPulling] = useState(false);
  const [lastPull, setLastPull] = useState(null);
  const [showMultiPull, setShowMultiPull] = useState(false);

  const canAffordPool = (poolKey) => {
    const pool = gachaPools[poolKey];
    return Object.entries(pool.cost).every(([currency, amount]) => gameState.currency[currency] >= amount);
  };

  const handleSinglePull = async (poolKey) => {
    if (pulling) return;

    setPulling(true);

    const result = performGachaPull(poolKey, gameState.currency, { ships: gameState.ships, crew: gameState.crew });

    if (result.success) {
      // Animate pull
      await animatePull(result.animation);

      // Deduct currency
      const newCurrency = deductCurrency(gameState.currency, result.costPaid);

      // Add refund if duplicate
      if (result.refund) {
        Object.entries(result.refund).forEach(([currency, amount]) => {
          newCurrency[currency] += amount;
        });
      }

      // Add item to collection
      if (result.pullType === "ship") {
        addShip(result.item);
      } else {
        addCrew(result.item);
      }

      // Update pity counter
      gameState.pitySystem.incrementCounter(poolKey);

      // Update currency
      updateCurrency(newCurrency);

      // Add to history
      addPullToHistory({
        ...result,
        poolKey,
        timestamp: Date.now(),
      });

      setLastPull(result);
    } else {
      alert(result.error);
    }

    setPulling(false);
  };

  const handleMultiPull = async (poolKey, count = 10) => {
    if (pulling) return;

    setPulling(true);

    const result = performMultiPull(
      poolKey,
      count,
      gameState.currency,
      { ships: gameState.ships, crew: gameState.crew },
      gameState.pitySystem
    );

    if (result.success) {
      // Show multi-pull animation
      await animateMultiPull(result.pulls);

      // Calculate total cost
      const pool = gachaPools[poolKey];
      let newCurrency = { ...gameState.currency };

      result.pulls.forEach((pull) => {
        newCurrency = deductCurrency(newCurrency, pool.cost);

        // Add refunds
        if (pull.refund) {
          Object.entries(pull.refund).forEach(([currency, amount]) => {
            newCurrency[currency] += amount;
          });
        }

        // Add items
        if (pull.pullType === "ship") {
          addShip(pull.item);
        } else {
          addCrew(pull.item);
        }

        // Add to history
        addPullToHistory({
          ...pull,
          poolKey,
          timestamp: Date.now(),
        });
      });

      updateCurrency(newCurrency);

      setLastPull(result);
      setShowMultiPull(true);
    } else {
      alert(result.error);
    }

    setPulling(false);
  };

  const animatePull = (animation) => {
    return new Promise((resolve) => {
      setTimeout(resolve, animation.duration);
    });
  };

  const animateMultiPull = (pulls) => {
    return new Promise((resolve) => {
      setTimeout(resolve, 2000);
    });
  };

  return (
    <div className="gacha-shop">
      <h1>Salvage & Requisition</h1>

      <div className="currency-display">
        <div className="currency-item">
          <span>💰</span>
          <span>Credits: {gameState.currency.credits.toLocaleString()}</span>
        </div>
        <div className="currency-item">
          <span>🔩</span>
          <span>Scrap: {gameState.currency.scrap.toLocaleString()}</span>
        </div>
        <div className="currency-item">
          <span>📊</span>
          <span>Data Slates: {gameState.currency.dataSlates.toLocaleString()}</span>
        </div>
      </div>

      <div className="gacha-pools">
        {Object.entries(gachaPools).map(([key, pool]) => {
          const canAfford = canAffordPool(key);
          const pityInfo = gameState.pitySystem.getNextPityThreshold(key);

          return (
            <div key={key} className="gacha-pool-card">
              <h3>{pool.name}</h3>
              <p className="pool-description">{pool.description}</p>

              <div className="pool-cost">
                {Object.entries(pool.cost).map(([currency, amount]) => (
                  <span key={currency} className="cost-item">
                    {amount} {currency}
                  </span>
                ))}
              </div>

              {pool.guaranteedRarity && (
                <div className="pool-guarantee" style={{ color: rarityTiers[pool.guaranteedRarity].color }}>
                  ★ Guaranteed {rarityTiers[pool.guaranteedRarity].name}+
                </div>
              )}

              {pityInfo && (
                <div className="pity-info">
                  Next {rarityTiers[pityInfo.rarity].name} in {pityInfo.remaining} pulls
                </div>
              )}

              <div className="pool-actions">
                <button className="pull-button" onClick={() => handleSinglePull(key)} disabled={pulling || !canAfford}>
                  Pull Once
                </button>

                <button className="pull-button multi-pull" onClick={() => handleMultiPull(key, 10)} disabled={pulling || !canAfford}>
                  Pull 10x
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {lastPull && !showMultiPull && <PullResultModal result={lastPull} onClose={() => setLastPull(null)} />}

      {lastPull && showMultiPull && (
        <MultiPullResultModal
          result={lastPull}
          onClose={() => {
            setLastPull(null);
            setShowMultiPull(false);
          }}
        />
      )}
    </div>
  );
}

function PullResultModal({ result, onClose }) {
  const tier = rarityTiers[result.rarity];

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="pull-result-modal" onClick={(e) => e.stopPropagation()} style={{ borderColor: tier.color }}>
        <h2 style={{ color: tier.color }}>
          {tier.name} {result.pullType.toUpperCase()}!
        </h2>

        <div className="pull-result-item">
          {result.pullType === "ship" ? (
            <div className="ship-result">
              <h3>{result.item.shipId}</h3>
              <p>{result.item.name}</p>
              {result.item.__gameData && (
                <div className="ship-stats">
                  <div>HP: {result.item.__gameData.baseHitPoints}</div>
                  <div>DMG: {result.item.__gameData.baseDamageOutput}</div>
                </div>
              )}
            </div>
          ) : (
            <div className="crew-result">
              <h3>
                {result.item.lastName}, {result.item.firstName}
              </h3>
              <p>Grade: {result.item.grade}</p>
              <p>TRE Score: {result.item.scoreTRE}</p>
            </div>
          )}
        </div>

        {result.refund && (
          <div className="duplicate-refund">
            ⚠️ Duplicate! Refunded:{" "}
            {Object.entries(result.refund)
              .map(([currency, amount]) => `${amount} ${currency}`)
              .join(", ")}
          </div>
        )}

        {result.isPityPull && <div className="pity-indicator">🎁 Pity System Activated!</div>}

        <button className="close-button" onClick={onClose}>
          Continue
        </button>
      </div>
    </div>
  );
}

function MultiPullResultModal({ result, onClose }) {
  const sortedPulls = [...result.pulls].sort((a, b) => {
    const aValue = getRarityValue(a.rarity);
    const bValue = getRarityValue(b.rarity);
    return bValue - aValue;
  });

  const rarityCounts = result.pulls.reduce((acc, pull) => {
    acc[pull.rarity] = (acc[pull.rarity] || 0) + 1;
    return acc;
  }, {});

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="multi-pull-modal" onClick={(e) => e.stopPropagation()}>
        <h2>10x Pull Results</h2>

        <div className="pull-summary">
          {Object.entries(rarityCounts).map(([rarity, count]) => (
            <div key={rarity} className="rarity-count" style={{ color: rarityTiers[rarity].color }}>
              {rarityTiers[rarity].name}: {count}
            </div>
          ))}
        </div>

        <div className="best-pull" style={{ borderColor: rarityTiers[result.bestPull.rarity].color }}>
          <h3>Best Pull!</h3>
          <p style={{ color: rarityTiers[result.bestPull.rarity].color }}>
            {rarityTiers[result.bestPull.rarity].name} {result.bestPull.pullType}
          </p>
        </div>

        <div className="all-pulls">
          {sortedPulls.map((pull, index) => (
            <div key={index} className="pull-item" style={{ borderLeftColor: rarityTiers[pull.rarity].color }}>
              <span style={{ color: rarityTiers[pull.rarity].color }}>{rarityTiers[pull.rarity].name}</span>
              <span>{pull.pullType === "ship" ? pull.item.shipId : `${pull.item.lastName}, ${pull.item.firstName}`}</span>
            </div>
          ))}
        </div>

        <button className="close-button" onClick={onClose}>
          Continue
        </button>
      </div>
    </div>
  );
}

function getRarityValue(rarity) {
  const values = { common: 1, uncommon: 2, rare: 3, epic: 4, legendary: 5 };
  return values[rarity] || 0;
}
