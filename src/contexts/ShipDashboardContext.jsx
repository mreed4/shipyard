import { createContext, useState, useEffect, useContext } from "react";
import { massProduceShips } from "../functions/massProduceShips";
import { DashboardContext } from "../App";
import { useHighlight } from "../hooks/useHighlight";
import { useGenerateAnimation } from "../hooks/useGenerateAnimation";
import { shipClasses } from "../data/shipClasses";
import { shipyards } from "../data/shipyards";

export const ShipDashboardContext = createContext();

export function ShipDashboardProvider({ children }) {
  const { shipState, setShipState } = useContext(DashboardContext);
  const [animationKey, setAnimationKey] = useState(0);
  const [sortMode, setSortMode] = useState(() => localStorage.getItem("shipSortMode") || "count");
  const [showColors, setShowColors] = useState(() => localStorage.getItem("shipShowColors") === "true");
  const [enableHighlight, setEnableHighlight] = useState(() => localStorage.getItem("shipEnableHighlight") !== "false");
  const [enableAnimation, setEnableAnimation] = useState(() => localStorage.getItem("shipEnableAnimation") === "true");
  const [viewMode, setViewMode] = useState(() => localStorage.getItem("shipViewMode") || "class");
  const { highlightedItem, lockedItem, highlight, clearHighlight, toggleLock, clearLock, isHighlighted, isDimmed } = useHighlight();
  const { items: animatedShips, isAnimating, animatedGenerate, instantGenerate, setItems } = useGenerateAnimation(massProduceShips, 5, 50);

  const ships = isAnimating ? animatedShips : shipState.ships || [];
  const totalShips = ships.length;

  const generateShips = () => {
    const count = shipState.shipCount;

    if (enableAnimation) {
      animatedGenerate(count);
    } else {
      const newShips = massProduceShips(count);
      setShipState({ ...shipState, ships: newShips });
    }
    setAnimationKey((prevKey) => prevKey + 1);
  };

  const handleViewChange = (mode) => {
    setViewMode(mode);
    localStorage.setItem("shipViewMode", mode);
    setAnimationKey((prevKey) => prevKey + 1);
  };

  const handleSortChange = (mode) => {
    setSortMode(mode);
    localStorage.setItem("shipSortMode", mode);
    setAnimationKey((prevKey) => prevKey + 1);
  };

  const setShipCount = (count) => {
    setShipState({ ...shipState, shipCount: count });
  };

  const toggleShowColors = (value) => {
    setShowColors(value);
  };

  // Sync animated ships with state when animation completes
  useEffect(() => {
    if (enableAnimation && !isAnimating && animatedShips.length > 0) {
      setShipState({ ...shipState, ships: animatedShips });
    }
  }, [isAnimating]);

  // Auto-generate ships on first visit
  useEffect(() => {
    if (!shipState.ships || shipState.ships.length === 0) {
      generateShips();
    }
  }, []);

  // Persist showColors to localStorage
  useEffect(() => {
    localStorage.setItem("shipShowColors", showColors);
  }, [showColors]);

  // Persist enableHighlight to localStorage
  useEffect(() => {
    localStorage.setItem("shipEnableHighlight", enableHighlight);
  }, [enableHighlight]);

  // Persist enableAnimation to localStorage
  useEffect(() => {
    localStorage.setItem("shipEnableAnimation", enableAnimation);
  }, [enableAnimation]);

  // Calculate ship counts based on view mode
  const shipCounts = ships.reduce(
    (counts, ship) => {
      const key = viewMode === "class" ? ship.name.split(" ")[0] : ship.shipyard;
      counts[key] = (counts[key] || 0) + 1;
      return counts;
    },
    viewMode === "class"
      ? shipClasses.reduce((acc, sc) => ({ ...acc, [sc.name.split(" ")[0]]: 0 }), {})
      : shipyards.reduce((acc, sy) => ({ ...acc, [sy]: 0 }), {})
  );

  // Get color class for a label
  const getColorClass = (label) => {
    return viewMode === "class" && showColors ? `ship-color-${label.toLowerCase()}` : "";
  };

  const value = {
    ships,
    totalShips,
    shipCount: shipState.shipCount,
    animationKey,
    sortMode,
    showColors,
    enableHighlight,
    enableAnimation,
    isAnimating,
    viewMode,
    shipCounts,
    generateShips,
    handleViewChange,
    handleSortChange,
    setShipCount,
    toggleShowColors,
    toggleEnableHighlight: setEnableHighlight,
    toggleEnableAnimation: setEnableAnimation,
    getColorClass,
    highlightedItem,
    lockedItem,
    highlight,
    clearHighlight,
    toggleLock,
    clearLock,
    isHighlighted,
    isDimmed,
  };

  return <ShipDashboardContext.Provider value={value}>{children}</ShipDashboardContext.Provider>;
}

export function useShipDashboard() {
  const context = useContext(ShipDashboardContext);
  if (!context) {
    throw new Error("useShipDashboard must be used within ShipDashboardProvider");
  }
  return context;
}
