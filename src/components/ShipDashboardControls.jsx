import { useShipDashboard } from "../contexts/ShipDashboardContext";

export default function ShipDashboardControls() {
  const { viewMode, sortMode, handleViewChange, handleSortChange, showColors, toggleShowColors } = useShipDashboard();

  return (
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
        <input type="checkbox" checked={showColors} onChange={(e) => toggleShowColors(e.target.checked)} />
        <span>Show Colors</span>
      </label>
    </div>
  );
}
