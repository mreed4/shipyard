import { createContext, useState, useContext } from "react";
import { useGameState } from "./GameStateContext";
import { performGachaPull, performMultiPull, deductCurrency } from "../systems/gachaPullSystem";
import { gachaPools } from "../systems/gachaSystem";

export const GachaContext = createContext();

export function GachaProvider({ children }) {
  const { gameState, addShip, addCrew, updateCurrency, addPullToHistory } = useGameState();
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

  const value = {
    // State
    pulling,
    lastPull,
    ledgerTab,
    animationKey,

    // Actions
    handleSinglePull,
    handleMultiPull,
    canAffordPool,
    setLedgerTab,

    // Computed values
    gameState,
  };

  return <GachaContext.Provider value={value}>{children}</GachaContext.Provider>;
}

export function useGacha() {
  const context = useContext(GachaContext);
  if (!context) {
    throw new Error("useGacha must be used within a GachaProvider");
  }
  return context;
}
