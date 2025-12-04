import BarChart from "./BarChart";
import StackedBarChart from "./StackedBarChart";
import { useShipDashboard } from "../contexts/ShipDashboardContext";

export default function ShipBarChartList() {
  const {
    shipCounts,
    totalShips,
    animationKey,
    sortMode,
    getColorClass,
    highlight,
    clearHighlight,
    isDimmed,
    enableHighlight,
    enableAnimation,
    isAnimating,
    toggleLock,
  } = useShipDashboard();

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
          <div
            key={`${itemLabel}-${animationKey}`}
            onMouseEnter={enableHighlight ? () => highlight(itemLabel) : undefined}
            onMouseLeave={enableHighlight ? clearHighlight : undefined}
            onClick={enableHighlight ? () => toggleLock(itemLabel) : undefined}
            style={{ opacity: enableHighlight && isDimmed(itemLabel) ? 0.4 : 1, cursor: enableHighlight ? "pointer" : "default" }}>
            <BarChart
              label={itemLabel}
              count={count}
              total={totalShips}
              animationKey={animationKey}
              colorClass={getColorClass(itemLabel)}
              enableAnimation={enableAnimation}
            />
          </div>
        ))}
        <StackedBarChart
          key={`stacked-${animationKey}`}
          sortedStats={sortedStats}
          total={totalShips}
          animationKey={animationKey}
          getColorClass={getColorClass}
          onSegmentHover={enableHighlight ? highlight : undefined}
          onSegmentLeave={enableHighlight ? clearHighlight : undefined}
          onSegmentClick={enableHighlight ? toggleLock : undefined}
          isDimmed={enableHighlight ? isDimmed : undefined}
          enableAnimation={true}
          isAnimating={isAnimating}
        />
      </ul>
    </div>
  );
}
