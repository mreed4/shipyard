import BarChart from "./BarChart";
import StackedBarChart from "./StackedBarChart";
import { useShipDashboard } from "../contexts/ShipDashboardContext";

export default function ShipBarChartList() {
  const { shipCounts, totalShips, animationKey, sortMode, getColorClass } = useShipDashboard();

  const sortedStats = Object.entries(shipCounts).sort((a, b) => {
    if (sortMode === "name") {
      return a[0].localeCompare(b[0]);
    } else {
      return b[1] - a[1];
    }
  });

  return (
    <div className="ships-dashboard-inner">
      <div className="total-ships">
        <span className="label">Total</span>
        <span className="ships-total-count">{totalShips}</span>
      </div>
      <ul className="ship-dashboard-list">
        {sortedStats.map(([itemLabel, count]) => (
          <BarChart
            key={`${itemLabel}-${animationKey}`}
            label={itemLabel}
            count={count}
            total={totalShips}
            animationKey={animationKey}
            colorClass={getColorClass(itemLabel)}
          />
        ))}
        <StackedBarChart
          key={`stacked-${animationKey}`}
          sortedStats={sortedStats}
          total={totalShips}
          animationKey={animationKey}
          getColorClass={getColorClass}
        />
      </ul>
    </div>
  );
}
