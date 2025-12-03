import BarChart from "./BarChart";
import StackedBarChart from "./StackedBarChart";
import { useCrewDashboard } from "../contexts/CrewDashboardContext";

export default function CrewBarChartList() {
  const { crewCounts, totalCrew, animationKey, sortMode, customSortFunction } = useCrewDashboard();

  const sortedStats = Object.entries(crewCounts).sort((a, b) => customSortFunction(a, b, sortMode));

  return (
    <div className="crew-dashboard-inner">
      <div className="total-crew">
        <span className="label">Total</span>
        <span className="crew-total-count">{totalCrew}</span>
      </div>
      <ul className="crew-dashboard-list">
        {sortedStats.map(([itemLabel, count]) => (
          <BarChart
            key={`${itemLabel}-${animationKey}`}
            label={itemLabel}
            count={count}
            total={totalCrew}
            animationKey={animationKey}
            colorClass=""
          />
        ))}
        <StackedBarChart
          key={`stacked-${animationKey}`}
          sortedStats={sortedStats}
          total={totalCrew}
          animationKey={animationKey}
          getColorClass={null}
        />
      </ul>
    </div>
  );
}
