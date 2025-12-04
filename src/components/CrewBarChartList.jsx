import BarChart from "./BarChart";
import StackedBarChart from "./StackedBarChart";
import { useCrewDashboard } from "../contexts/CrewDashboardContext";

export default function CrewBarChartList() {
  const {
    crewCounts,
    totalCrew,
    animationKey,
    sortMode,
    customSortFunction,
    highlight,
    clearHighlight,
    isDimmed,
    enableHighlight,
    enableAnimation,
    isAnimating,
    toggleLock,
  } = useCrewDashboard();

  const sortedStats = Object.entries(crewCounts).sort((a, b) => customSortFunction(a, b, sortMode));

  return (
    <div className="crew-dashboard-inner">
      <div className="total-crew">
        <span className="label">Total</span>
        <span className="crew-total-count">{totalCrew}</span>
      </div>
      <ul className="crew-dashboard-list">
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
              total={totalCrew}
              animationKey={animationKey}
              colorClass=""
              enableAnimation={enableAnimation}
            />
          </div>
        ))}
        <StackedBarChart
          key={`stacked-${animationKey}`}
          sortedStats={sortedStats}
          total={totalCrew}
          animationKey={animationKey}
          getColorClass={null}
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
