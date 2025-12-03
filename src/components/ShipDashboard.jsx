import { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { massProduceShips } from "../functions/massProduceShips";
import { DashboardContext } from "../App";

export default function ShipDashboard() {
  const { shipState, setShipState } = useContext(DashboardContext);
  const [animationKey, setAnimationKey] = useState(0); // Added state for animation key
  const [sortMode, setSortMode] = useState(() => localStorage.getItem("shipSortMode") || "count");
  const [showColors, setShowColors] = useState(() => localStorage.getItem("shipShowColors") === "true");
  const [viewMode, setViewMode] = useState(() => localStorage.getItem("shipViewMode") || "class");

  const generateShips = () => {
    const newShips = massProduceShips(shipState.shipCount);
    setShipState({ ...shipState, ships: newShips });
    setAnimationKey((prevKey) => prevKey + 1); // Increment key to force re-render
  };

  const handleViewChange = (mode) => {
    setViewMode(mode);
    localStorage.setItem("shipViewMode", mode);
    setAnimationKey((prevKey) => prevKey + 1);
  };

  // Auto-generate ships on first visit
  useEffect(() => {
    if (!shipState.ships || shipState.ships.length === 0) {
      generateShips();
    }
  }, []);

  // Persist showColors to localStorage
  useEffect(() => {
    localStorage.setItem("shipShowColors", showColors);
  }, [showColors]);

  const handleSortChange = (mode) => {
    setSortMode(mode);
    localStorage.setItem("shipSortMode", mode);
    setAnimationKey((prevKey) => prevKey + 1); // Trigger animation on sort change
  };

  return (
    <>
      <ShipGeneratorControls
        shipCount={shipState.shipCount}
        setShipCount={(count) => setShipState({ ...shipState, shipCount: count })}
        generateShips={generateShips}
      />
      {shipState.ships &&
        shipState.ships.length > 0 && ( // Add null check for shipState.ships
          <div className="ships-dashboard">
            <div className="dashboard-controls">
              <div className="view-toggle">
                <button onClick={() => handleViewChange("class")} disabled={viewMode === "class"}>
                  By Class
                </button>
                <button onClick={() => handleViewChange("shipyard")} disabled={viewMode === "shipyard"}>
                  By Shipyard
                </button>
              </div>
              <div className="sort-toggle">
                <button onClick={() => handleSortChange("name")} disabled={sortMode === "name"}>
                  Sort by Name
                </button>
                <button onClick={() => handleSortChange("count")} disabled={sortMode === "count"}>
                  Sort by Count
                </button>
              </div>
              <label className="color-toggle">
                <input type="checkbox" checked={showColors} onChange={(e) => setShowColors(e.target.checked)} />
                <span>Show Colors</span>
              </label>
            </div>
            <ShipBarCharts
              ships={shipState.ships}
              animationKey={animationKey}
              sortMode={sortMode}
              showColors={showColors}
              viewMode={viewMode}
            />
            <h3>Ships</h3>
            <ol className="ships-list">
              {shipState.ships.map((ship) => {
                const shipClass = ship.shipClass.name.split(" ")[0].toLowerCase();
                return (
                  <li key={ship.getShipId()} className="ship">
                    <Link
                      to={`/ships/${encodeURIComponent(ship.getShipId())}`}
                      className={`ship-link ${showColors ? `ship-color-${shipClass}` : ""}`}>
                      {ship.getShipId()}
                    </Link>
                  </li>
                );
              })}
            </ol>
          </div>
        )}
    </>
  );
}

function ShipGeneratorControls({ shipCount, setShipCount, generateShips }) {
  return (
    <fieldset>
      <legend>Shipgen</legend>
      <input
        type="number"
        value={shipCount}
        onChange={(e) => setShipCount(e.target.value)}
        min="1"
        max="50"
        title="Enter the number of ships to generate (1-50)" // Added title attribute
      />
      <button type="button" onClick={generateShips}>
        GEN
      </button>
    </fieldset>
  );
}

function ShipBarCharts({ ships, animationKey, sortMode, showColors, viewMode }) {
  const totalShips = ships.length;

  const shipCounts = ships.reduce((counts, ship) => {
    const key = viewMode === "class" ? ship.shipClass.name.split(" ")[0] : ship.shipyard;
    counts[key] = (counts[key] || 0) + 1;
    return counts;
  }, {});

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
        {sortedStats.map(([label, count]) => (
          <ShipBarChart
            key={`${label}-${animationKey}`}
            label={label}
            count={count}
            totalShips={totalShips}
            animationKey={animationKey}
            showColors={showColors}
            viewMode={viewMode}
          />
        ))}
        <StackedBarChart
          key={`stacked-${animationKey}`}
          sortedStats={sortedStats}
          total={totalShips}
          animationKey={animationKey}
          showColors={showColors}
          viewMode={viewMode}
        />
      </ul>
    </div>
  );
}

function ShipBarChart({ label, count, totalShips, animationKey, showColors, viewMode }) {
  const [barWidth, setBarWidth] = useState("0%"); // Start with 0% width

  useEffect(() => {
    setBarWidth("0%"); // Reset width to 0% on animationKey change
    const timeout = setTimeout(() => setBarWidth(`${(count / totalShips) * 100}%`), 0); // Animate to target width
    return () => clearTimeout(timeout);
  }, [animationKey, count, totalShips]);

  const colorClass = viewMode === "class" && showColors ? `ship-color-${label.toLowerCase()}` : "";

  return (
    <li className="bar-chart-item">
      <span className="bar-chart-label">{label}</span>
      <div className="bar-chart-container">
        <div className="bar-chart-background"></div>
        <div className={`bar-chart ${colorClass}`} style={{ width: barWidth }}></div>
      </div>
      <span>
        {count < 10 ? `0${count}` : count}/{totalShips}
      </span>
    </li>
  );
}

function StackedBarChart({ sortedStats, total, animationKey, showColors, viewMode }) {
  const [segments, setSegments] = useState([]);

  useEffect(() => {
    setSegments([]); // Reset segments
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
            const colorClass = viewMode === "class" && showColors ? `ship-color-${label.toLowerCase()}` : "";
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
