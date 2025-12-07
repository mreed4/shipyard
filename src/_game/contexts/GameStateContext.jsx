import { createContext, useState, useContext, useEffect } from "react";
import { GuaranteeSystem } from "../systems/guaranteeSystem";

export const GameStateContext = createContext();

export function GameStateProvider({ children }) {
  const [gameState, setGameState] = useState(() => {
    const saved = localStorage.getItem("gameState");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        return {
          ...parsed,
          guaranteeSystem: new GuaranteeSystem(parsed.guaranteeSystem || parsed.pitySystem),
        };
      } catch (e) {
        console.error("Failed to parse saved game state", e);
      }
    }

    return {
      currency: {
        credits: 999999999,
        scrap: 999999999,
        dataSlates: 999999999,
        priorityTokens: 999999999,
        eliteVouchers: 999999999,
      },
      ships: [],
      crew: [],
      unlockedShipTypes: ["Letios", "Hyperion"],
      missions: [],
      completedMissions: [],
      guaranteeSystem: new GuaranteeSystem(),
      pullHistory: [],
      lastDailyReward: null,
    };
  });

  // Persist to localStorage
  useEffect(() => {
    const toSave = {
      ...gameState,
      guaranteeSystem: gameState.guaranteeSystem?.getState(),
    };
    localStorage.setItem("gameState", JSON.stringify(toSave));
  }, [gameState]);

  const updateGameState = (updates) => {
    setGameState((prev) => ({
      ...prev,
      ...updates,
    }));
  };

  const addShip = (ship) => {
    setGameState((prev) => ({
      ...prev,
      ships: [...prev.ships, ship],
    }));
  };

  const addCrew = (crew) => {
    setGameState((prev) => ({
      ...prev,
      crew: [...prev.crew, crew],
    }));
  };

  const updateCurrency = (newCurrency) => {
    setGameState((prev) => ({
      ...prev,
      currency: newCurrency,
    }));
  };

  const addPullToHistory = (pull) => {
    setGameState((prev) => ({
      ...prev,
      pullHistory: [pull, ...(prev.pullHistory || [])].slice(0, 100),
    }));
  };

  const triggerGuaranteeUpdate = () => {
    setGameState((prev) => {
      // Create a new GuaranteeSystem instance with current state to trigger re-render
      const newGuaranteeSystem = new GuaranteeSystem(prev.guaranteeSystem.getState());
      return {
        ...prev,
        guaranteeSystem: newGuaranteeSystem,
      };
    });
  };

  const claimDailyReward = () => {
    const today = new Date().toDateString();
    if (gameState.lastDailyReward === today) {
      return { success: false, error: "Already claimed today" };
    }

    const dailyRewards = {
      scrap: 100,
      dataSlates: 50,
    };

    setGameState((prev) => ({
      ...prev,
      currency: {
        credits: prev.currency.credits,
        scrap: prev.currency.scrap + dailyRewards.scrap,
        dataSlates: prev.currency.dataSlates + dailyRewards.dataSlates,
      },
      lastDailyReward: today,
    }));

    return { success: true, rewards: dailyRewards };
  };

  const resetGameState = () => {
    localStorage.removeItem("gameState");
    setGameState({
      currency: {
        credits: 999999999,
        scrap: 999999999,
        dataSlates: 999999999,
        priorityTokens: 999999999,
        eliteVouchers: 999999999,
      },
      ships: [],
      crew: [],
      unlockedShipTypes: ["Letios", "Hyperion"],
      missions: [],
      completedMissions: [],
      guaranteeSystem: new GuaranteeSystem(),
      pullHistory: [],
      lastDailyReward: null,
    });
  };

  const value = {
    gameState,
    setGameState,
    updateGameState,
    addShip,
    addCrew,
    updateCurrency,
    addPullToHistory,
    triggerGuaranteeUpdate,
    claimDailyReward,
    resetGameState,
  };

  return <GameStateContext.Provider value={value}>{children}</GameStateContext.Provider>;
}

export function useGameState() {
  const context = useContext(GameStateContext);
  if (!context) {
    throw new Error("useGameState must be used within GameStateProvider");
  }
  return context;
}
