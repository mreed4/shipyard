import React, { useState } from "react";
import { massProduceShips } from "../functions/massProduceShips";

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
        <h3>Ships</h3>
        <ul>
          {ships.map((ship) => (
            <li key={ship.getShipId()}>{ship.getShipId()}</li>
          ))}
        </ul>
      </div>
    </fieldset>
  );
}

export default ShipDashboard;
