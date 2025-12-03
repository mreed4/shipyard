import { useState, useEffect } from "react";

export default function StackedBarChart({ sortedStats, total, animationKey, getColorClass }) {
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
            return (
              <div
                key={label}
                className={`stacked-segment ${colorClass}`}
                style={{ width: `${percentage}%` }}
                title={`${label}: ${Math.round(percentage)}%`}
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
