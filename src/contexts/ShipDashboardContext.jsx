import { createContext, useState, useEffect, useContext } from "react";
import { massProduceShips } from "../functions/massProduceShips";
import { DashboardContext } from "../App";
import { useHighlight } from "../hooks/useHighlight";

export const ShipDashboardContext = createContext();

export function ShipDashboardProvider({ children }) {
  const { shipState, setShipState } = useContext(DashboardContext);
  const [animationKey, setAnimationKey] = useState(0);
  const [sortMode, setSortMode] = useState(() => localStorage.getItem("shipSortMode") || "count");
  const [showColors, setShowColors] = useState(() => localStorage.getItem("shipShowColors") === "true");
  const [enableHighlight, setEnableHighlight] = useState(() => localStorage.getItem("shipEnableHighlight") !== "false");
  const [viewMode, setViewMode] = useState(() => localStorage.getItem("shipViewMode") || "class");
  const { highlightedItem, lockedItem, highlight, clearHighlight, toggleLock, clearLock, isHighlighted, isDimmed } = useHighlight();

  const ships = shipState.ships || [];
  const totalShips = ships.length;

  const generateShips = () => {
    const newShips = massProduceShips(shipState.shipCount);
    setShipState({ ...shipState, ships: newShips });
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

  // Calculate ship counts based on view mode
  const shipCounts = ships.reduce((counts, ship) => {
    const key = viewMode === "class" ? ship.shipClass.name.split(" ")[0] : ship.shipyard;
    counts[key] = (counts[key] || 0) + 1;
    return counts;
  }, {});

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
    viewMode,
    shipCounts,
    generateShips,
    handleViewChange,
    handleSortChange,
    setShipCount,
    toggleShowColors,
    toggleEnableHighlight: setEnableHighlight,
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
