import { useState, useEffect } from "react";

export default function BarChart({ label, count, total, animationKey, colorClass }) {
  const [barWidth, setBarWidth] = useState("0%");

  useEffect(() => {
    setBarWidth("0%");
    const timeout = setTimeout(() => setBarWidth(`${(count / total) * 100}%`), 0);
    return () => clearTimeout(timeout);
  }, [animationKey, count, total]);

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
