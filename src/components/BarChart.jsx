import { useState, useEffect } from "react";
import "./BarChart.css";

export default function BarChart({
  label,
  count,
  total,
  animationKey,
  colorClass,
  enableAnimation = true,
  pendingCount = 0,
  padDigits = 2,
}) {
  const [barWidth, setBarWidth] = useState("0%");
  const [pendingWidth, setPendingWidth] = useState("0%");

  useEffect(() => {
    const targetWidth = `${(count / total) * 100}%`;
    const targetPendingWidth = `${((count + pendingCount) / total) * 100}%`;
    if (enableAnimation) {
      setBarWidth("0%");
      setPendingWidth("0%");
      const timeout = setTimeout(() => {
        setBarWidth(targetWidth);
        setPendingWidth(targetPendingWidth);
      }, 0);
      return () => clearTimeout(timeout);
    } else {
      setBarWidth(targetWidth);
      setPendingWidth(targetPendingWidth);
    }
  }, [animationKey, count, total, enableAnimation, pendingCount]);

  return (
    <li className="bar-chart-item">
      <span className="bar-chart-label">{label}</span>
      <div className="bar-chart-container">
        <div className="bar-chart-background"></div>
        <div className={`bar-chart ${colorClass || ""}`} style={{ width: barWidth }}></div>
        {pendingCount > 0 && <div className="bar-chart pending-gain" style={{ width: pendingWidth }}></div>}
      </div>
      <span className={pendingCount > 0 ? "pending-total" : ""}>
        {pendingCount > 0 ? <>{String(count + pendingCount).padStart(padDigits, "0")}</> : <>{String(count).padStart(padDigits, "0")}</>}/
        {total}
      </span>
    </li>
  );
}
