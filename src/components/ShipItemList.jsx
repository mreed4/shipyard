import { Link } from "react-router-dom";
import { useShipDashboard } from "../contexts/ShipDashboardContext";

export default function ShipItemList() {
  const { ships, totalShips, showColors } = useShipDashboard();

  return (
    <ol
      className={`ships-list ${totalShips >= 100 ? "three-digit" : ""}`}
      style={{
        gridTemplateRows: `repeat(${Math.ceil(totalShips / 5)}, auto)`,
      }}>
      {ships.map((ship, index) => {
        const number = (index + 1).toString().padStart(totalShips >= 100 ? 3 : 2, "0");
        const shipClass = ship.shipClass.name.split(" ")[0].toLowerCase();
        return (
          <li key={ship.getShipId()} className="ship" data-number={number}>
            <Link
              to={`/ships/${encodeURIComponent(ship.getShipId())}`}
              className={`ship-link ${showColors ? `ship-color-${shipClass}` : ""}`}>
              {ship.getShipId()}
            </Link>
          </li>
        );
      })}
    </ol>
  );
}
