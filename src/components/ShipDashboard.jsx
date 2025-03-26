import React, { useState, useEffect } from "react";
import { massProduceShips } from "../functions/massProduceShips";

export default function ShipDashboard() {
  const [ships, setShips] = useState([]);
  const [shipCount, setShipCount] = useState(50);
  const [animationKey, setAnimationKey] = useState(0); // Added state for animation key
  const [sortMode, setSortMode] = useState("count"); // Add state for sorting mode

  const generateShips = () => {
    const newShips = massProduceShips(shipCount);
    setShips(newShips);
    setAnimationKey((prevKey) => prevKey + 1); // Increment key to force re-render
  };

  return (
    <>
      <ShipGeneratorControls shipCount={shipCount} setShipCount={setShipCount} generateShips={generateShips} />
      {ships.length > 0 && (
        <div className="ships-dashboard">
          <div className="sort-toggle">
            <button onClick={() => setSortMode("name")} disabled={sortMode === "name"}>
              Sort by Name
            </button>
            <button onClick={() => setSortMode("count")} disabled={sortMode === "count"}>
              Sort by Count
            </button>
          </div>
          <ShipBarCharts ships={ships} animationKey={animationKey} sortMode={sortMode} />
          <h3>Ships</h3>
          <ol className="ships-list">
            {ships.map((ship) => (
              <li key={ship.getShipId()} className="ship">
                {ship.getShipId()}
              </li>
            ))}
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

function ShipBarCharts({ ships, animationKey, sortMode }) {
  const totalShips = ships.length;

  const shipTypeCounts = ships.reduce((counts, ship) => {
    const type = ship.shipClass.name.split(" ")[0];
    counts[type] = (counts[type] || 0) + 1;
    return counts;
  }, {});

  const sortedTypeStats = Object.entries(shipTypeCounts).sort((a, b) => {
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
        {sortedTypeStats.map(([type, count]) => (
          <ShipBarChart key={type} type={type} count={count} totalShips={totalShips} animationKey={animationKey} />
        ))}
      </ul>
    </div>
  );
}

function ShipBarChart({ type, count, totalShips, animationKey }) {
  const [barWidth, setBarWidth] = useState("0%"); // Start with 0% width

  useEffect(() => {
    setBarWidth("0%"); // Reset width to 0% on animationKey change
    const timeout = setTimeout(() => setBarWidth(`${(count / totalShips) * 100}%`), 0); // Animate to target width
    return () => clearTimeout(timeout);
  }, [animationKey, count, totalShips]);

  return (
    <li className="bar-chart-item">
      <span className="ship-name">{type}</span>
      <div className="bar-chart-container">
        <div className="bar-chart-background"></div>
        <div
          className={`bar-chart ${false && type.toLowerCase()}`} // Added ship type as a second class
          style={{ width: barWidth }} // Dynamically update width
        ></div>
      </div>
      <span>
        {count < 10 ? `0${count}` : count}/{totalShips}
      </span>
    </li>
  );
}
