import React, { useState } from "react";
import { massProduceShips } from "../functions/massProduceShips";

function ShipTypeStats({ type, count, totalShips }) {
  return (
    <li className="bar-chart-item">
      <span className="ship-name">{type}</span>
      <div className="bar-chart-container">
        <div className="bar-chart-background"></div>
        <div className="bar-chart" style={{ width: `${(count / totalShips) * 100}%` }}></div>
      </div>
      <span>
        {count < 10 ? `0${count}` : count}/{totalShips}
      </span>
    </li>
  );
}

function ShipStats({ ships }) {
  const totalShips = ships.length;

  const shipTypeCounts = ships.reduce((counts, ship) => {
    const type = ship.shipClass.name.split(" ")[0];
    counts[type] = (counts[type] || 0) + 1;
    return counts;
  }, {});

  const sortedTypeStats = Object.entries(shipTypeCounts).sort((a, b) => b[1] - a[1]);

  return (
    <div className="ships-dashboard-inner">
      <div className="total-ships">
        <span className="label">Total</span>
        <span className="ships-total-count">{totalShips}</span>
      </div>
      <ul className="ship-dashboard-list">
        {sortedTypeStats.map(([type, count]) => (
          <ShipTypeStats key={type} type={type} count={count} totalShips={totalShips} />
        ))}
      </ul>
    </div>
  );
}

function ShipDashboard() {
  const [ships, setShips] = useState([]);
  const [shipCount, setShipCount] = useState(50);

  const generateShips = () => {
    const newShips = massProduceShips(shipCount);
    setShips(newShips);
  };

  return (
    <fieldset>
      <legend>Shipgen</legend>
      <input type="number" value={shipCount} onChange={(e) => setShipCount(e.target.value)} min="1" max="50" />
      <button onClick={generateShips}>GEN</button>
      <div>
        {/* <h3>Ships</h3>
        <ul>
          {ships.map((ship) => (
            <li key={ship.getShipId()}>{ship.getShipId()}</li>
          ))}
        </ul> */}
        {ships.length > 0 && <ShipStats ships={ships} />}
      </div>
    </fieldset>
  );
}

export default ShipDashboard;
