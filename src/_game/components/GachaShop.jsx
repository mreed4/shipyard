import { useGacha } from "../contexts/GachaContext";
import { useGameState } from "../contexts/GameStateContext";
import { gachaPools } from "../systems/gachaSystem";
import { rarityTiers } from "../systems/raritySystem";
import { Coins, Wrench, Database, Rocket, Users, Ticket, Award } from "lucide-react";
import { toSentenceCase } from "../utils/stringHelpers";
import { useState, useEffect, useRef } from "react";
import "./GachaShop.css";

function GuaranteeCountdown({ poolKey, guaranteeSystem }) {
  const thresholds = guaranteeSystem.getNextThresholds(poolKey);

  if (thresholds.length === 0) return null;

  return (
    <>
      {thresholds.map(({ rarity, threshold, current }) => (
        <div key={rarity} className={`guarantee-info gacha-rarity-${rarity}`}>
          Guaranteed {rarity.charAt(0).toUpperCase() + rarity.slice(1)}: {current}/{threshold} pulls
        </div>
      ))}
    </>
  );
}

function PoolActions({ poolKey, canAfford, pulling, handleSinglePull, handleMultiPull }) {
  const buttons = [
    { label: "Pull Once", count: 1, className: "pull-button" },
    { label: "Pull 10x", count: 10, className: "pull-button multi-pull" },
    { label: "Pull 100x", count: 100, className: "pull-button multi-pull-100" },
  ];

  return (
    <div className="pool-actions">
      {buttons.map(({ label, count, className }) => (
        <button
          key={label}
          className={className}
          onClick={() => (count === 1 ? handleSinglePull(poolKey) : handleMultiPull(poolKey, count))}
          disabled={pulling || !canAfford}>
          {label}
        </button>
      ))}
    </div>
  );
}

function LedgerTabs({ ledgerTab, setLedgerTab, lastPull }) {
  const tabs = [
    {
      id: "ships",
      label: "Ships",
      icon: Rocket,
      disabled: lastPull && !lastPull.pulls?.some((p) => p.pullType === "ship") && lastPull.pullType !== "ship",
    },
    {
      id: "crew",
      label: "Crew",
      icon: Users,
      disabled: lastPull && !lastPull.pulls?.some((p) => p.pullType === "crew") && lastPull.pullType !== "crew",
    },
    { id: "all", label: "All", icon: null, disabled: false },
  ];

  return (
    <div className="ledger-tabs">
      {tabs.map(({ id, label, icon: Icon, disabled }) => (
        <button key={id} className={`ledger-tab ${ledgerTab === id ? "active" : ""}`} onClick={() => setLedgerTab(id)} disabled={disabled}>
          {Icon && <Icon size={14} />}
          {label}
        </button>
      ))}
    </div>
  );
}

function MultiPullHistory({ pulls, ledgerTab, animationKey }) {
  const filteredPulls =
    ledgerTab === "all"
      ? pulls
      : pulls.filter((pull) => {
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
        guaranteedCount: 0,
        firstSeen: pullIndex,
      };
    }
    aggregated[key].count++;
    // Track how many were guaranteed
    if (pull.isGuaranteePull) {
      aggregated[key].guaranteedCount++;
    }
  });

  const getRarityValue = (rarity) => {
    const values = { legendary: 5, epic: 4, rare: 3, uncommon: 2, common: 1 };
    return values[rarity] || 0;
  };

  const aggregatedArray = Object.values(aggregated).sort((a, b) => getRarityValue(b.rarity) - getRarityValue(a.rarity));

  if (aggregatedArray.length === 0) {
    return <p className="no-history">No {ledgerTab} in last pull.</p>;
  }

  return aggregatedArray.map((entry) => (
    <div key={entry.itemKey} className="history-item" data-first-seen={`${animationKey}-${entry.firstSeen}`}>
      {entry.pullType === "ship" ? (
        <Rocket size={16} className={`gacha-rarity-${entry.rarity}`} />
      ) : (
        <Users size={16} className={`gacha-rarity-${entry.rarity}`} />
      )}
      <span className={`gacha-rarity-${entry.rarity}`}>{entry.itemName}</span>
      {entry.guaranteedCount > 0 && entry.count === 1 && <span className="guarantee-indicator">GUARANTEED</span>}
      {entry.guaranteedCount > 0 && entry.count > 1 && <span className="guarantee-indicator">GUARANTEED ×{entry.guaranteedCount}</span>}
      {entry.count > 1 && (
        <span key={entry.count} className="pull-count">
          ×{entry.count}
        </span>
      )}
    </div>
  ));
}

function SinglePullHistory({ pull, ledgerTab }) {
  if (ledgerTab !== "all") {
    const filterType = ledgerTab === "ships" ? "ship" : "crew";
    if (pull.pullType !== filterType) {
      return <p className="no-history">No {ledgerTab} in last pull.</p>;
    }
  }

  const itemName = pull.item?.name || pull.item?.firstName + " " + pull.item?.lastName || "Unknown";

  return (
    <div className="history-item">
      {pull.pullType === "ship" ? (
        <Rocket size={16} className={`gacha-rarity-${pull.rarity}`} />
      ) : (
        <Users size={16} className={`gacha-rarity-${pull.rarity}`} />
      )}
      <span className={`gacha-rarity-${pull.rarity}`}>{itemName}</span>
      {pull.isGuaranteePull && <span className="guarantee-indicator">GUARANTEED</span>}
    </div>
  );
}

function AnimatedCurrency({ currencyKey, icon: Icon, value, premium }) {
  const [displayValue, setDisplayValue] = useState(value ?? 0);
  const prevValueRef = useRef(value ?? 0);

  useEffect(() => {
    const actualValue = value ?? 0;
    if (actualValue < prevValueRef.current) {
      // Currency decreased - animate countdown
      const diff = prevValueRef.current - actualValue;
      const duration = 40; // ms - short duration to match 50ms pull iteration
      const steps = 4;
      const stepValue = diff / steps;
      const stepDuration = duration / steps;

      let currentStep = 0;
      const interval = setInterval(() => {
        currentStep++;
        if (currentStep >= steps) {
          setDisplayValue(actualValue);
          clearInterval(interval);
        } else {
          setDisplayValue(prevValueRef.current - stepValue * currentStep);
        }
      }, stepDuration);

      return () => clearInterval(interval);
    } else {
      setDisplayValue(actualValue);
    }
    prevValueRef.current = actualValue;
  }, [value]);

  return (
    <div className={`currency-item ${premium ? "premium-currency" : ""}`}>
      <Icon size={16} />
      <span>
        {toSentenceCase(currencyKey)}: {Math.round(displayValue).toLocaleString()}
      </span>
    </div>
  );
}

export default function GachaShop() {
  const { gameState, resetGameState } = useGameState();
  const { pulling, lastPull, ledgerTab, animationKey, lastPulledPool, handleSinglePull, handleMultiPull, canAffordPool, setLedgerTab } =
    useGacha();

  return (
    <div className="gacha-shop">
      <div className="gacha-header">
        <h2>Salvage & Requisition</h2>
        <div className="currency-display">
          {[
            { key: "credits", icon: Coins, value: gameState.currency.credits, premium: false },
            { key: "scrap", icon: Wrench, value: gameState.currency.scrap, premium: false },
            { key: "dataSlates", icon: Database, value: gameState.currency.dataSlates, premium: false },
            { key: "priorityTokens", icon: Ticket, value: gameState.currency.priorityTokens, premium: true },
            { key: "eliteVouchers", icon: Award, value: gameState.currency.eliteVouchers, premium: true },
          ].map(({ key, icon, value, premium }) => (
            <AnimatedCurrency key={key} currencyKey={key} icon={icon} value={value} premium={premium} />
          ))}
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
        <LedgerTabs ledgerTab={ledgerTab} setLedgerTab={setLedgerTab} lastPull={lastPull} />
        <div className="pull-history-list">
          {lastPull && lastPull.pulls ? (
            <MultiPullHistory pulls={lastPull.pulls} ledgerTab={ledgerTab} animationKey={animationKey} />
          ) : lastPull && lastPull.pullType ? (
            <SinglePullHistory pull={lastPull} ledgerTab={ledgerTab} />
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

                return (
                  <div key={key} className="gacha-pool-card">
                    <div className="pool-header">
                      <h3>{pool.name}</h3>
                      <div className="pool-cost">
                        {Object.entries(pool.cost).map(([currency, amount]) => (
                          <span
                            key={currency}
                            className={`cost-item ${
                              currency === "priorityTokens" || currency === "eliteVouchers" ? "premium-currency" : ""
                            }`}>
                            {currency === "credits" && <Coins size={14} />}
                            {currency === "scrap" && <Wrench size={14} />}
                            {currency === "dataSlates" && <Database size={14} />}
                            {currency === "priorityTokens" && <Ticket size={14} />}
                            {currency === "eliteVouchers" && <Award size={14} />}
                            {amount}
                          </span>
                        ))}
                      </div>
                    </div>
                    <p className="pool-description">{pool.description}</p>

                    <PoolActions
                      poolKey={key}
                      canAfford={canAfford}
                      pulling={pulling}
                      handleSinglePull={handleSinglePull}
                      handleMultiPull={handleMultiPull}
                    />

                    <GuaranteeCountdown poolKey={key} guaranteeSystem={gameState.guaranteeSystem} />
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

                return (
                  <div key={key} className="gacha-pool-card">
                    <div className="pool-header">
                      <h3>{pool.name}</h3>
                      <div className="pool-cost">
                        {Object.entries(pool.cost).map(([currency, amount]) => (
                          <span
                            key={currency}
                            className={`cost-item ${
                              currency === "priorityTokens" || currency === "eliteVouchers" ? "premium-currency" : ""
                            }`}>
                            {currency === "credits" && <Coins size={14} />}
                            {currency === "scrap" && <Wrench size={14} />}
                            {currency === "dataSlates" && <Database size={14} />}
                            {currency === "priorityTokens" && <Ticket size={14} />}
                            {currency === "eliteVouchers" && <Award size={14} />}
                            {amount}
                          </span>
                        ))}
                      </div>
                    </div>
                    <p className="pool-description">{pool.description}</p>

                    <PoolActions
                      poolKey={key}
                      canAfford={canAfford}
                      pulling={pulling}
                      handleSinglePull={handleSinglePull}
                      handleMultiPull={handleMultiPull}
                    />

                    <GuaranteeCountdown poolKey={key} guaranteeSystem={gameState.guaranteeSystem} />
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

                return (
                  <div key={key} className="gacha-pool-card">
                    <div className="pool-header">
                      <h3>{pool.name}</h3>
                      <div className="pool-cost">
                        {Object.entries(pool.cost).map(([currency, amount]) => (
                          <span
                            key={currency}
                            className={`cost-item ${
                              currency === "priorityTokens" || currency === "eliteVouchers" ? "premium-currency" : ""
                            }`}>
                            {currency === "credits" && <Coins size={14} />}
                            {currency === "scrap" && <Wrench size={14} />}
                            {currency === "dataSlates" && <Database size={14} />}
                            {currency === "priorityTokens" && <Ticket size={14} />}
                            {currency === "eliteVouchers" && <Award size={14} />}
                            {amount}
                          </span>
                        ))}
                      </div>
                    </div>
                    <p className="pool-description">{pool.description}</p>

                    <PoolActions
                      poolKey={key}
                      canAfford={canAfford}
                      pulling={pulling}
                      handleSinglePull={handleSinglePull}
                      handleMultiPull={handleMultiPull}
                    />

                    <GuaranteeCountdown poolKey={key} guaranteeSystem={gameState.guaranteeSystem} />
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    </div>
  );
}
