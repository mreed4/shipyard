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
}) {
  const [segments, setSegments] = useState([]);

  useEffect(() => {
    setSegments([]);
    const timeout = setTimeout(() => {
      const newSegments = sortedStats.map(([label, count]) => ({
        label,
        percentage: (count / total) * 100,
      }));
      setSegments(newSegments);
    }, 0);
    return () => clearTimeout(timeout);
  }, [animationKey, sortedStats, total]);

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
                  transition: "opacity 0.2s ease-in-out",
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
