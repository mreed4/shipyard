import { useState } from "react";

export function useHighlight() {
  const [highlightedItem, setHighlightedItem] = useState(null);
  const [lockedItem, setLockedItem] = useState(null);

  const highlight = (item) => {
    if (!lockedItem) {
      setHighlightedItem(item);
    }
  };

  const clearHighlight = () => {
    if (!lockedItem) {
      setHighlightedItem(null);
    }
  };

  const toggleLock = (item) => {
    setLockedItem(item);
    setHighlightedItem(item);
  };

  const clearLock = () => {
    setLockedItem(null);
    setHighlightedItem(null);
  };

  const isHighlighted = (item) => {
    if (!highlightedItem) return false;
    return item === highlightedItem;
  };

  const isDimmed = (item) => {
    if (!highlightedItem) return false;
    return item !== highlightedItem;
  };

  return {
    highlightedItem,
    lockedItem,
    highlight,
    clearHighlight,
    toggleLock,
    clearLock,
    isHighlighted,
    isDimmed,
  };
}
