import { Link } from "react-router-dom";
import { useShipDashboard } from "../contexts/ShipDashboardContext";

export default function ShipItemList() {
  const { ships, totalShips, viewMode, isDimmed, enableHighlight } = useShipDashboard();

  return (
    <ol
      className={`ships-list ${totalShips >= 100 ? "three-digit" : ""}`}
      style={{
        gridTemplateRows: `repeat(${Math.ceil(totalShips / 5)}, auto)`,
      }}>
      {ships.map((ship, index) => {
        const number = (index + 1).toString().padStart(totalShips >= 100 ? 3 : 2, "0");
        return (
          <ShipListItem
            key={ship.shipId}
            ship={ship}
            number={number}
            viewMode={viewMode}
            isDimmed={isDimmed}
            enableHighlight={enableHighlight}
          />
        );
      })}
    </ol>
  );
}

function ShipListItem({ ship, number, viewMode, isDimmed, enableHighlight }) {
  const shipClass = ship.name.split(" ")[0];
  const itemKey = viewMode === "class" ? shipClass : ship.shipyard;
  const isDimmedItem = enableHighlight && isDimmed(itemKey);

  return (
    <li className={`ship ${isDimmedItem ? "dimmed" : ""}`} data-number={number}>
      <Link to={`/ships/${encodeURIComponent(ship.shipId)}`} className="ship-link">
        {ship.shipId}
      </Link>
    </li>
  );
}
