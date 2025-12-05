import { useState } from "react";
import { useGameState } from "../contexts/GameStateContext";
import { performGachaPull, performMultiPull, deductCurrency } from "../functions/gachaPull";
import { gachaPools } from "../data/gachaSystem";
import { rarityTiers } from "../data/raritySystem";
import { Coins, Wrench, Database, Rocket, Users } from "lucide-react";
import "./GachaShop.css";

export default function GachaShop() {
  const { gameState, updateGameState, addShip, addCrew, updateCurrency, addPullToHistory, resetGameState } = useGameState();
  const [pulling, setPulling] = useState(false);
  const [lastPull, setLastPull] = useState(null);
  const [ledgerTab, setLedgerTab] = useState("ships");
  const [animationKey, setAnimationKey] = useState(0);

  const canAffordPool = (poolKey) => {
    const pool = gachaPools[poolKey];
    return Object.entries(pool.cost).every(([currency, amount]) => gameState.currency[currency] >= amount);
  };

  const handleSinglePull = async (poolKey) => {
    if (pulling) return;

    setPulling(true);

    // Auto-switch ledger tab based on pool type
    const pool = gachaPools[poolKey];
    if (pool.pullTypes.length === 1) {
      setLedgerTab(pool.pullTypes[0] === "ship" ? "ships" : "crew");
    }

    const result = performGachaPull(poolKey, gameState.currency, { ships: gameState.ships, crew: gameState.crew });

    if (result.success) {
      // Deduct currency
      const newCurrency = deductCurrency(gameState.currency, result.costPaid);

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
      setAnimationKey((prev) => prev + 1);
    } else {
      alert(result.error);
    }

    setPulling(false);
  };

  const handleMultiPull = async (poolKey, count = 10) => {
    if (pulling) return;

    setPulling(true);

    // Auto-switch ledger tab based on pool type (for single-type pools)
    const pool = gachaPools[poolKey];
    if (pool.pullTypes.length === 1) {
      setLedgerTab(pool.pullTypes[0] === "ship" ? "ships" : "crew");
    }

    const result = performMultiPull(
      poolKey,
      count,
      gameState.currency,
      { ships: gameState.ships, crew: gameState.crew },
      gameState.pitySystem
    );

    if (result.success) {
      // Calculate total cost
      const pool = gachaPools[poolKey];
      let newCurrency = { ...gameState.currency };

      // Process all currency deductions and add items to collection
      result.pulls.forEach((pull) => {
        newCurrency = deductCurrency(newCurrency, pool.cost);

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

      // Animate items appearing sequentially in ledger
      setLastPull({ pulls: [] });
      setAnimationKey((prev) => prev + 1);

      for (let i = 0; i < result.pulls.length; i++) {
        await new Promise((resolve) => setTimeout(resolve, 50));
        setLastPull({ pulls: result.pulls.slice(0, i + 1) });
        setAnimationKey((prev) => prev + 1);
      }
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
      <div className="gacha-header">
        <h1>Salvage & Requisition</h1>

        <div className="currency-display">
          <div className="currency-item">
            <Coins size={16} />
            <span>Credits: {gameState.currency.credits.toLocaleString()}</span>
          </div>
          <div className="currency-item">
            <Wrench size={16} />
            <span>Scrap: {gameState.currency.scrap.toLocaleString()}</span>
          </div>
          <div className="currency-item">
            <Database size={16} />
            <span>Data Slates: {gameState.currency.dataSlates.toLocaleString()}</span>
          </div>
          <button
            className="reset-button"
            onClick={() => {
              if (confirm("Reset game state? This will clear all progress and restore unlimited currency.")) {
                resetGameState();
              }
            }}>
            Reset Game
          </button>
        </div>
      </div>

      <div className="pull-history-section">
        <h2>Last Pull</h2>
        <div className="ledger-tabs">
          <button className={`ledger-tab ${ledgerTab === "ships" ? "active" : ""}`} onClick={() => setLedgerTab("ships")}>
            <Rocket size={14} />
            Ships
          </button>
          <button className={`ledger-tab ${ledgerTab === "crew" ? "active" : ""}`} onClick={() => setLedgerTab("crew")}>
            <Users size={14} />
            Crew
          </button>
          <button className={`ledger-tab ${ledgerTab === "all" ? "active" : ""}`} onClick={() => setLedgerTab("all")}>
            All
          </button>
        </div>
        <div className="pull-history-list">
          {lastPull && lastPull.pulls ? (
            // Multi-pull results
            (() => {
              const filteredPulls =
                ledgerTab === "all"
                  ? lastPull.pulls
                  : lastPull.pulls.filter((pull) => {
                      const filterType = ledgerTab === "ships" ? "ship" : "crew";
                      return pull.pullType === filterType;
                    });

              // Aggregate duplicates
              const aggregated = {};
              filteredPulls.forEach((pull, pullIndex) => {
                const itemName = pull.item?.name || pull.item?.firstName + " " + pull.item?.lastName || "Unknown";
                const key = `${itemName}-${pull.rarity}`;
                if (!aggregated[key]) {
                  aggregated[key] = {
                    ...pull,
                    itemName,
                    itemKey: key,
                    count: 0,
                    firstSeen: pullIndex,
                  };
                }
                aggregated[key].count++;
              });

              const aggregatedArray = Object.values(aggregated).sort((a, b) => getRarityValue(b.rarity) - getRarityValue(a.rarity));

              return aggregatedArray.length > 0 ? (
                aggregatedArray.map((entry, index) => (
                  <div key={entry.itemKey} className="history-item" data-first-seen={`${animationKey}-${entry.firstSeen}`}>
                    {entry.pullType === "ship" ? (
                      <Rocket size={16} className={`gacha-rarity-${entry.rarity}`} />
                    ) : (
                      <Users size={16} className={`gacha-rarity-${entry.rarity}`} />
                    )}
                    <span className={`gacha-rarity-${entry.rarity}`}>{entry.itemName}</span>
                    {entry.count > 1 && (
                      <span key={entry.count} className="pull-count">
                        ×{entry.count}
                      </span>
                    )}
                  </div>
                ))
              ) : (
                <p className="no-history">No {ledgerTab} in last pull.</p>
              );
            })()
          ) : lastPull && lastPull.pullType ? (
            // Single pull result
            (() => {
              if (ledgerTab !== "all") {
                const filterType = ledgerTab === "ships" ? "ship" : "crew";
                if (lastPull.pullType !== filterType) {
                  return <p className="no-history">No {ledgerTab} in last pull.</p>;
                }
              }

              const itemName = lastPull.item?.name || lastPull.item?.firstName + " " + lastPull.item?.lastName || "Unknown";
              return (
                <div className="history-item">
                  {lastPull.pullType === "ship" ? (
                    <Rocket size={16} className={`gacha-rarity-${lastPull.rarity}`} />
                  ) : (
                    <Users size={16} className={`gacha-rarity-${lastPull.rarity}`} />
                  )}
                  <span className={`gacha-rarity-${lastPull.rarity}`}>{itemName}</span>
                </div>
              );
            })()
          ) : (
            <p className="no-history">No pulls yet. Try your luck below!</p>
          )}
        </div>
      </div>

      <div className="gacha-pools-section">
        {/* <h2>Available Pools</h2> */}

        <div className="pool-group">
          <h3>Ship Pools</h3>
          <div className="gacha-pools">
            {Object.entries(gachaPools)
              .filter(([_, pool]) => pool.pullTypes.includes("ship") && !pool.pullTypes.includes("crew"))
              .map(([key, pool]) => {
                const canAfford = canAffordPool(key);
                const pityInfo = gameState.pitySystem.getNextPityThreshold(key);

                return (
                  <div key={key} className="gacha-pool-card">
                    <div className="pool-header">
                      <h3>{pool.name}</h3>
                      <div className="pool-cost">
                        {Object.entries(pool.cost).map(([currency, amount]) => (
                          <span key={currency} className="cost-item">
                            {currency === "credits" && <Coins size={14} />}
                            {currency === "scrap" && <Wrench size={14} />}
                            {currency === "dataSlates" && <Database size={14} />}
                            {amount}
                          </span>
                        ))}
                      </div>
                    </div>
                    <p className="pool-description">{pool.description}</p>

                    {pool.guaranteedRarity && (
                      <div className={`pool-guarantee gacha-rarity-${pool.guaranteedRarity}`}>
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

                      <button
                        className="pull-button multi-pull-100"
                        onClick={() => handleMultiPull(key, 100)}
                        disabled={pulling || !canAfford}>
                        Pull 100x
                      </button>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>

        <div className="pool-group">
          <h3>Crew Pools</h3>
          <div className="gacha-pools">
            {Object.entries(gachaPools)
              .filter(([_, pool]) => pool.pullTypes.includes("crew") && !pool.pullTypes.includes("ship"))
              .map(([key, pool]) => {
                const canAfford = canAffordPool(key);
                const pityInfo = gameState.pitySystem.getNextPityThreshold(key);

                return (
                  <div key={key} className="gacha-pool-card">
                    <div className="pool-header">
                      <h3>{pool.name}</h3>
                      <div className="pool-cost">
                        {Object.entries(pool.cost).map(([currency, amount]) => (
                          <span key={currency} className="cost-item">
                            {currency === "credits" && <Coins size={14} />}
                            {currency === "scrap" && <Wrench size={14} />}
                            {currency === "dataSlates" && <Database size={14} />}
                            {amount}
                          </span>
                        ))}
                      </div>
                    </div>
                    <p className="pool-description">{pool.description}</p>

                    {pool.guaranteedRarity && (
                      <div className={`pool-guarantee gacha-rarity-${pool.guaranteedRarity}`}>
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

                      <button
                        className="pull-button multi-pull-100"
                        onClick={() => handleMultiPull(key, 100)}
                        disabled={pulling || !canAfford}>
                        Pull 100x
                      </button>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>

        <div className="pool-group">
          <h3>Mixed Pools</h3>
          <div className="gacha-pools">
            {Object.entries(gachaPools)
              .filter(([_, pool]) => pool.pullTypes.includes("ship") && pool.pullTypes.includes("crew"))
              .map(([key, pool]) => {
                const canAfford = canAffordPool(key);
                const pityInfo = gameState.pitySystem.getNextPityThreshold(key);

                return (
                  <div key={key} className="gacha-pool-card">
                    <div className="pool-header">
                      <h3>{pool.name}</h3>
                      <div className="pool-cost">
                        {Object.entries(pool.cost).map(([currency, amount]) => (
                          <span key={currency} className="cost-item">
                            {currency === "credits" && <Coins size={14} />}
                            {currency === "scrap" && <Wrench size={14} />}
                            {currency === "dataSlates" && <Database size={14} />}
                            {amount}
                          </span>
                        ))}
                      </div>
                    </div>
                    <p className="pool-description">{pool.description}</p>

                    {pool.guaranteedRarity && (
                      <div className={`pool-guarantee gacha-rarity-${pool.guaranteedRarity}`}>
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

                      <button
                        className="pull-button multi-pull-100"
                        onClick={() => handleMultiPull(key, 100)}
                        disabled={pulling || !canAfford}>
                        Pull 100x
                      </button>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    </div>
  );
}

function getRarityValue(rarity) {
  const values = { common: 1, uncommon: 2, rare: 3, epic: 4, legendary: 5 };
  return values[rarity] || 0;
}
