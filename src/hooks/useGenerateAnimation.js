import { useState, useCallback } from "react";

export function useGenerateAnimation(generateFn, batchSize = 5, delayMs = 50) {
  const [isAnimating, setIsAnimating] = useState(false);
  const [items, setItems] = useState([]);

  const animatedGenerate = useCallback(
    (count) => {
      setIsAnimating(true);
      setItems([]);

      const allItems = generateFn(count);
      let currentIndex = 0;

      const addBatch = () => {
        if (currentIndex >= allItems.length) {
          setIsAnimating(false);
          return;
        }

        const nextBatch = allItems.slice(currentIndex, currentIndex + batchSize);
        setItems((prev) => [...prev, ...nextBatch]);
        currentIndex += batchSize;

        setTimeout(addBatch, delayMs);
      };

      addBatch();
    },
    [generateFn, batchSize, delayMs]
  );

  const instantGenerate = useCallback(
    (count) => {
      const allItems = generateFn(count);
      setItems(allItems);
      setIsAnimating(false);
    },
    [generateFn]
  );

  return {
    items,
    isAnimating,
    animatedGenerate,
    instantGenerate,
    setItems,
  };
}
