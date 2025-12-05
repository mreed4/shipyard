import ShipGeneratorControls from "./ShipGeneratorControls";
import ShipDashboardControls from "./ShipDashboardControls";
import ShipBarChartList from "./ShipBarChartList";
import ShipItemList from "./ShipItemList";
import { useShipDashboard } from "../contexts/ShipDashboardContext";
import "./ShipDashboard.css";
import "./Dashboard.css";

export default function ShipDashboard() {
  const { ships } = useShipDashboard();

  return (
    <>
      <ShipGeneratorControls />
      {ships.length > 0 && (
        <div className="ships-dashboard">
          <ShipDashboardControls />
          <ShipBarChartList />
          <h3>Ships</h3>
          <ShipItemList />
        </div>
      )}
    </>
  );
}
