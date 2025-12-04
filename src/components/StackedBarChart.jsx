import { useState, useEffect } from "react";

export default function StackedBarChart({
  sortedStats,
  total,
  animationKey,
  getColorClass,
  onSegmentHover,
  onSegmentLeave,
  onSegmentClick,
  isDimmed,
  enableAnimation = true,
  isAnimating = false,
}) {
  const targetSegments = sortedStats.map(([label, count]) => ({
    label,
    percentage: (count / total) * 100,
  }));

  const [segments, setSegments] = useState(() => targetSegments.map((seg) => ({ ...seg, percentage: 0 })));

  useEffect(() => {
    if (isAnimating) {
      // Immediately reset to new structure with 0 percentages
      setSegments(targetSegments.map((seg) => ({ ...seg, percentage: 0 })));
    } else if (enableAnimation) {
      // Ensure we have the correct structure at 0
      setSegments(targetSegments.map((seg) => ({ ...seg, percentage: 0 })));

      // Animate each segment sequentially
      const timeouts = targetSegments.map((targetSeg, index) =>
        setTimeout(() => {
          setSegments((prevSegments) => prevSegments.map((seg, i) => (i === index ? { ...seg, percentage: targetSeg.percentage } : seg)));
        }, index * 350)
      );

      return () => timeouts.forEach(clearTimeout);
    } else {
      setSegments(targetSegments);
    }
  }, [animationKey, isAnimating, enableAnimation]);

  return (
    <li className="bar-chart-item stacked-bar-item">
      <span className="bar-chart-label">All</span>
      <div className="bar-chart-container">
        <div className="bar-chart-background"></div>
        <div className="stacked-bar-chart">
          {segments.map(({ label, percentage }) => {
            const colorClass = getColorClass ? getColorClass(label) : "";
            const opacity = isDimmed?.(label) ? 0.4 : 1;
            return (
              <div
                key={label}
                className={`stacked-segment ${colorClass}`}
                style={{
                  width: `${percentage}%`,
                  opacity,
                  transition: "width 0.5s ease-in-out, opacity 0.2s ease-in-out",
                  cursor: onSegmentClick ? "pointer" : "default",
                }}
                title={`${label}: ${Math.round(percentage)}%`}
                onMouseEnter={() => onSegmentHover?.(label)}
                onMouseLeave={onSegmentLeave}
                onClick={() => onSegmentClick?.(label)}
              />
            );
          })}
        </div>
      </div>
      <span>
        {total}/{total}
      </span>
    </li>
  );
}
