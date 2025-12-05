import { useShipDashboard } from "../contexts/ShipDashboardContext";

export default function ShipDashboardControls() {
  const {
    viewMode,
    sortMode,
    handleViewChange,
    handleSortChange,
    enableHighlight,
    toggleEnableHighlight,
    enableAnimation,
    toggleEnableAnimation,
    clearLock,
    lockedItem,
  } = useShipDashboard();

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
        {lockedItem && <button onClick={clearLock}>Clear Filter</button>}
      </div>
      <div className="checkbox-group">
        <label className="checkbox-toggle">
          <input type="checkbox" checked={enableHighlight} onChange={(e) => toggleEnableHighlight(e.target.checked)} />
          <span>Enable Highlight</span>
        </label>
        <label className="checkbox-toggle">
          <input type="checkbox" checked={enableAnimation} onChange={(e) => toggleEnableAnimation(e.target.checked)} />
          <span>Enable Animation</span>
        </label>
      </div>
    </div>
  );
}
