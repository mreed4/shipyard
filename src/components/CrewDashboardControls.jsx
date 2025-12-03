import { useCrewDashboard } from "../contexts/CrewDashboardContext";

export default function CrewDashboardControls() {
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
  } = useCrewDashboard();

  return (
    <div className="dashboard-controls">
      <div className="view-toggle">
        <button onClick={() => handleViewChange("grade")} disabled={viewMode === "grade"}>
          By Grade
        </button>
        <button onClick={() => handleViewChange("gender")} disabled={viewMode === "gender"}>
          By Gender
        </button>
        <button onClick={() => handleViewChange("birthplace")} disabled={viewMode === "birthplace"}>
          By Birthplace
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
      <label className="color-toggle">
        <input type="checkbox" checked={enableHighlight} onChange={(e) => toggleEnableHighlight(e.target.checked)} />
        <span>Enable Highlight</span>
      </label>
      <label className="color-toggle">
        <input type="checkbox" checked={enableAnimation} onChange={(e) => toggleEnableAnimation(e.target.checked)} />
        <span>Enable Animation</span>
      </label>
    </div>
  );
}
