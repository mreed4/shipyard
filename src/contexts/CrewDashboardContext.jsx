import { createContext, useState, useEffect, useContext } from "react";
import { generateCrewMembers } from "../functions/generateCrewMembers";
import { DashboardContext } from "../App";
import { useHighlight } from "../hooks/useHighlight";
import { useGenerateAnimation } from "../hooks/useGenerateAnimation";
import { crewData } from "../data/crew";

export const CrewDashboardContext = createContext();

export function CrewDashboardProvider({ children }) {
  const { crewState, setCrewState } = useContext(DashboardContext);
  const [animationKey, setAnimationKey] = useState(0);
  const [sortMode, setSortMode] = useState(() => localStorage.getItem("crewSortMode") || "count");
  const [enableHighlight, setEnableHighlight] = useState(() => localStorage.getItem("crewEnableHighlight") !== "false");
  const [enableAnimation, setEnableAnimation] = useState(() => localStorage.getItem("crewEnableAnimation") === "true");
  const [viewMode, setViewMode] = useState(() => localStorage.getItem("crewViewMode") || "grade");
  const { highlightedItem, lockedItem, highlight, clearHighlight, toggleLock, clearLock, isHighlighted, isDimmed } = useHighlight();
  const {
    items: animatedCrew,
    isAnimating,
    animatedGenerate,
    instantGenerate,
    setItems,
  } = useGenerateAnimation(generateCrewMembers, 5, 50);

  const crew = isAnimating ? animatedCrew : crewState.crew || [];
  const totalCrew = crew.length;

  const generateCrew = () => {
    const count = crewState.crewCount || 50;

    if (enableAnimation) {
      animatedGenerate(count);
    } else {
      const newCrew = generateCrewMembers(count);
      setCrewState({ ...crewState, crew: newCrew });
    }
    setAnimationKey((prevKey) => prevKey + 1);
  };

  const handleViewChange = (mode) => {
    setViewMode(mode);
    localStorage.setItem("crewViewMode", mode);
    setAnimationKey((prevKey) => prevKey + 1);
  };

  const handleSortChange = (mode) => {
    setSortMode(mode);
    localStorage.setItem("crewSortMode", mode);
    setAnimationKey((prevKey) => prevKey + 1);
  };

  const setCrewCount = (count) => {
    setCrewState({ ...crewState, crewCount: count });
  };

  // Sync animated crew with state when animation completes
  useEffect(() => {
    if (enableAnimation && !isAnimating && animatedCrew.length > 0) {
      setCrewState({ ...crewState, crew: animatedCrew });
    }
  }, [isAnimating]);

  // Auto-generate crew on first visit
  useEffect(() => {
    if (!crewState.crew || crewState.crew.length === 0) {
      generateCrew();
    }
  }, []);

  // Persist enableHighlight to localStorage
  useEffect(() => {
    localStorage.setItem("crewEnableHighlight", enableHighlight);
  }, [enableHighlight]);

  // Persist enableAnimation to localStorage
  useEffect(() => {
    localStorage.setItem("crewEnableAnimation", enableAnimation);
  }, [enableAnimation]);

  // Calculate crew counts based on view mode
  const getInitialCounts = () => {
    if (viewMode === "grade") {
      return { "Grade S": 0, "Grade A": 0, "Grade B": 0, "Grade C": 0, "Grade D": 0, "Grade F": 0 };
    } else if (viewMode === "gender") {
      return { Male: 0, Female: 0 };
    } else {
      return crewData.birthplace.reduce((acc, place) => ({ ...acc, [place]: 0 }), {});
    }
  };

  const crewCounts = crew.reduce((counts, member) => {
    let key;
    if (viewMode === "grade") {
      key = `Grade ${member.grade}`;
    } else if (viewMode === "gender") {
      key = member.gender === "M" ? "Male" : "Female";
    } else {
      key = member.birthplace;
    }
    counts[key] = (counts[key] || 0) + 1;
    return counts;
  }, getInitialCounts());

  // Custom sort function for crew (special handling for grades)
  const gradeOrder = { "Grade S": 0, "Grade A": 1, "Grade B": 2, "Grade C": 3, "Grade D": 4, "Grade F": 5 };

  const customSortFunction = (a, b, sortMode) => {
    if (sortMode === "name") {
      if (viewMode === "grade" && gradeOrder[a[0]] !== undefined && gradeOrder[b[0]] !== undefined) {
        return gradeOrder[a[0]] - gradeOrder[b[0]];
      }
      return a[0].localeCompare(b[0]);
    } else {
      return b[1] - a[1];
    }
  };

  const value = {
    crew,
    totalCrew,
    crewCount: crewState.crewCount || 50,
    animationKey,
    sortMode,
    enableHighlight,
    enableAnimation,
    isAnimating,
    viewMode,
    crewCounts,
    generateCrew,
    handleViewChange,
    handleSortChange,
    setCrewCount,
    toggleEnableHighlight: setEnableHighlight,
    toggleEnableAnimation: setEnableAnimation,
    customSortFunction,
    highlightedItem,
    lockedItem,
    highlight,
    clearHighlight,
    toggleLock,
    clearLock,
    isHighlighted,
    isDimmed,
  };

  return <CrewDashboardContext.Provider value={value}>{children}</CrewDashboardContext.Provider>;
}

export function useCrewDashboard() {
  const context = useContext(CrewDashboardContext);
  if (!context) {
    throw new Error("useCrewDashboard must be used within CrewDashboardProvider");
  }
  return context;
}
