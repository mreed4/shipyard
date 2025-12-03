import { useState, useEffect } from "react";

export default function BarChart({ label, count, total, animationKey, colorClass, enableAnimation = true }) {
  const targetWidth = `${(count / total) * 100}%`;
  const [barWidth, setBarWidth] = useState(enableAnimation ? "0%" : targetWidth);

  useEffect(() => {
    if (enableAnimation) {
      setBarWidth("0%");
      const timeout = setTimeout(() => setBarWidth(targetWidth), 0);
      return () => clearTimeout(timeout);
    } else {
      setBarWidth(targetWidth);
    }
  }, [animationKey, count, total, enableAnimation, targetWidth]);

  return (
    <li className="bar-chart-item">
      <span className="bar-chart-label">{label}</span>
      <div className="bar-chart-container">
        <div className="bar-chart-background"></div>
        <div className={`bar-chart ${colorClass || ""}`} style={{ width: barWidth }}></div>
      </div>
      <span>
        {count < 10 ? `0${count}` : count}/{total}
      </span>
    </li>
  );
}
