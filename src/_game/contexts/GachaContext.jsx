import { createContext, useState, useContext } from "react";
import { useGameState } from "./GameStateContext";
import { performGachaPull, performMultiPull, deductCurrency, pullShipWithRarity, pullCrewWithRarity } from "../systems/gachaPullSystem";
import { gachaPools } from "../systems/gachaSystem";
import { GuaranteeSystem } from "../systems/guaranteeSystem";

export const GachaContext = createContext();

export function GachaProvider({ children }) {
  const { gameState, setGameState, addShip, addCrew, updateCurrency, addPullToHistory, triggerGuaranteeUpdate } = useGameState();
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
      // Process guarantee (increment counters and check for triggers)
      const triggeredGuarantees = gameState.guaranteeSystem.processPull(poolKey);
      console.log(
        `Single pull - Pool: ${poolKey}, Triggered:`,
        triggeredGuarantees,
        "Counters:",
        gameState.guaranteeSystem.getCounters(poolKey)
      );
      triggerGuaranteeUpdate();

      const itemsToAdd = [result]; // Start with the natural pull

      // Create additional guaranteed items for each triggered guarantee
      if (triggeredGuarantees.length > 0) {
        const pool = gachaPools[poolKey];
        const pullType = result.pullType;

        // Replace the natural pull with guaranteed items
        itemsToAdd.length = 0;

        triggeredGuarantees.forEach((forcedRarity) => {
          const guaranteedItem = pullType === "ship" ? pullShipWithRarity(pool, forcedRarity) : pullCrewWithRarity(forcedRarity);

          itemsToAdd.push({
            ...result,
            rarity: forcedRarity,
            item: guaranteedItem,
            isGuaranteePull: true,
          });
        });
      }

      // Deduct currency
      const newCurrency = deductCurrency(gameState.currency, result.costPaid);

      // Add all items to collection
      itemsToAdd.forEach((item) => {
        if (item.pullType === "ship") {
          addShip(item.item);
        } else {
          addCrew(item.item);
        }

        // Add to history
        addPullToHistory({
          ...item,
          poolKey,
          timestamp: Date.now(),
        });
      });

      // Update currency
      updateCurrency(newCurrency);

      // Set last pull to show guaranteed items if any
      if (itemsToAdd.length === 1) {
        setLastPull(itemsToAdd[0]);
      } else {
        setLastPull({ pulls: itemsToAdd });
      }
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
      null // Don't pass guarantee system - handle it here
    );

    if (result.success) {
      // Do ONE state update with everything
      setGameState((prev) => {
        // Create a working copy of guarantee system
        const workingGuarantee = new GuaranteeSystem(prev.guaranteeSystem.getState());

        // Calculate new currency
        let newCurrency = { ...prev.currency };
        result.pulls.forEach(() => {
          newCurrency = deductCurrency(newCurrency, pool.cost);
        });

        // Collect all new items and process guarantees
        const newShips = [...prev.ships];
        const newCrew = [...prev.crew];
        const newHistory = [...prev.pullHistory];
        const displayPulls = []; // Track all items for display

        result.pulls.forEach((pull, index) => {
          // Process guarantees for this pull
          const triggeredGuarantees = workingGuarantee.processPull(poolKey);

          if (index < 3 || triggeredGuarantees.length > 0) {
            console.log(
              `Multi-pull #${index + 1} - Pool: ${poolKey}, Triggered:`,
              triggeredGuarantees,
              "Counters:",
              workingGuarantee.getCounters(poolKey)
            );
          }

          const itemsToAdd = [pull]; // Start with natural pull

          // If guarantees triggered, replace with guaranteed items
          if (triggeredGuarantees.length > 0) {
            console.log(`Creating ${triggeredGuarantees.length} guaranteed items for rarities:`, triggeredGuarantees);
            itemsToAdd.length = 0;

            triggeredGuarantees.forEach((forcedRarity) => {
              const guaranteedItem = pull.pullType === "ship" ? pullShipWithRarity(pool, forcedRarity) : pullCrewWithRarity(forcedRarity);

              const guaranteedPull = {
                ...pull,
                rarity: forcedRarity,
                item: guaranteedItem,
                isGuaranteePull: true,
              };

              console.log("Created guaranteed pull:", guaranteedPull);
              itemsToAdd.push(guaranteedPull);
            });
          }

          console.log(
            `Items to add for this pull:`,
            itemsToAdd.length,
            itemsToAdd.map((i) => ({ rarity: i.rarity, isGuaranteePull: i.isGuaranteePull }))
          );

          // Add all items from this pull
          itemsToAdd.forEach((item) => {
            if (item.pullType === "ship") {
              newShips.push(item.item);
            } else {
              newCrew.push(item.item);
            }

            newHistory.unshift({
              ...item,
              poolKey,
              timestamp: Date.now(),
            });

            // Add to display array
            displayPulls.push(item);
          });
        });

        console.log("Total display pulls:", displayPulls.length, "Guaranteed:", displayPulls.filter((p) => p.isGuaranteePull).length);

        // Store display pulls for animation
        prev.lastMultiPullDisplay = displayPulls;

        // Return everything in one update
        return {
          ...prev,
          currency: newCurrency,
          ships: newShips,
          crew: newCrew,
          pullHistory: newHistory.slice(0, 100),
          guaranteeSystem: workingGuarantee,
        };
      });

      // Animate items appearing sequentially in ledger
      // Use the display pulls that include guaranteed items
      const displayPulls = gameState.lastMultiPullDisplay || result.pulls;
      console.log("Animating pulls:", displayPulls.length, "items");

      setLastPull({ pulls: [] });
      setAnimationKey((prev) => prev + 1);

      for (let i = 0; i < displayPulls.length; i++) {
        await new Promise((resolve) => setTimeout(resolve, 50));
        setLastPull({ pulls: displayPulls.slice(0, i + 1) });
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
