import { useState } from "react";
import { shipTypes } from "../data/shipTypes";
import { getShipIcon } from "../_game/components/icons/ShipIcons";
import { ChevronDown, ChevronRight } from "lucide-react";
import ShipRadarChart from "./ShipRadarChart";
import "../components/ShipCatalog.css";

export default function ShipCatalog() {
  const [expandedTypes, setExpandedTypes] = useState(new Set(["Fighter"])); // Start with Fighter expanded
  const [showExtraInfo, setShowExtraInfo] = useState(false);

  // Convert shipTypes object to array
  const allShips = Object.values(shipTypes);

  // Group ships by type
  const shipsByType = {};
  const shipTypes_array = ["Fighter", "Frigate", "Cruiser", "Carrier", "Capital Ship"];

  shipTypes_array.forEach((type) => {
    shipsByType[type] = allShips.filter((ship) => ship.type === type).sort((a, b) => a.manufacturer.localeCompare(b.manufacturer));
  });

  const toggleType = (type) => {
    const newExpanded = new Set(expandedTypes);
    if (newExpanded.has(type)) {
      newExpanded.delete(type);
    } else {
      newExpanded.add(type);
    }
    setExpandedTypes(newExpanded);
  };

  const expandAll = () => setExpandedTypes(new Set(shipTypes_array));
  const collapseAll = () => setExpandedTypes(new Set());

  return (
    <div className="ship-catalog">
      <div className="catalog-header">
        <h2>Ship Catalog</h2>
        <p>Browse ship types and their shipyard variants</p>
      </div>

      <div className="catalog-controls">
        <div className="control-group">
          <button onClick={expandAll}>Expand All</button>
          <button onClick={collapseAll}>Collapse All</button>
          <label className="checkbox-toggle">
            <input type="checkbox" checked={showExtraInfo} onChange={(e) => setShowExtraInfo(e.target.checked)} />
            <span>Show Detailed Info</span>
          </label>
        </div>
      </div>

      <div className="catalog-type-list">
        {shipTypes_array.map((type) => {
          const TypeIcon = getShipIcon(type);
          const isExpanded = expandedTypes.has(type);
          const ships = shipsByType[type];
          const firstShip = ships[0];
          const baseStats = {
            baseHitPoints: firstShip?.baseHitPoints || 0,
            baseDamageOutput: firstShip?.baseDamageOutput || 0,
          };

          return (
            <div key={type} className={`type-section ${isExpanded ? "expanded" : ""}`}>
              <div className="type-header" onClick={() => toggleType(type)}>
                <div className="type-title">
                  <TypeIcon size={24} />
                  <h3>{type}</h3>
                  <span className="ship-count">({ships.length} variants)</span>
                  <div className="expand-icon">{isExpanded ? <ChevronDown size={18} /> : <ChevronRight size={18} />}</div>
                </div>
                {/* <div className="type-base-stats">
                  <span>Base HP: {baseStats.baseHitPoints.toLocaleString()}</span>
                  <span>Base DMG: {baseStats.baseDamageOutput.toLocaleString()}</span>
                </div> */}
              </div>

              {isExpanded && (
                <div className="type-variants">
                  {ships.map((ship) => (
                    <div key={ship.name} className="variant-card">
                      <div className="variant-header">
                        <div className="variant-name">
                          <h4>{ship.name}</h4>
                          <span className="badge variant-shipyard-badge">{ship.manufacturer}</span>
                        </div>
                        <div className="variant-content-wrapper">
                          <div className="variant-stats">
                            <div className="stat-item">
                              <span className="stat-label">Hull:</span>
                              <span className="stat-value">{ship.baseHitPoints.toLocaleString()}</span>
                            </div>
                            <div className="stat-item">
                              <span className="stat-label">DMG:</span>
                              <span className="stat-value">{ship.baseDamageOutput.toLocaleString()}</span>
                            </div>
                            <div className="stat-item">
                              <span className="stat-label">Armor:</span>
                              <span className="stat-value">{ship.baseArmor.toLocaleString()}</span>
                            </div>
                            <div className="stat-item">
                              <span className="stat-label">Speed:</span>
                              <span className="stat-value">{ship.baseSpeed.toLocaleString()}</span>
                            </div>
                            <div className="stat-item">
                              <span className="stat-label">Precision:</span>
                              <span className="stat-value">{ship.basePrecision}%</span>
                            </div>
                            <div className="stat-item">
                              <span className="stat-label">Crew:</span>
                              <span className="stat-value">{ship.crewCapacity.toLocaleString()}</span>
                            </div>
                            <div className="stat-item">
                              <span className="stat-label">Mass:</span>
                              <span className="stat-value">{(ship.displacement / 1_000_000).toFixed(1)}M kg</span>
                            </div>
                          </div>
                          <ShipRadarChart ship={ship} />
                        </div>
                      </div>

                      {showExtraInfo && (
                        <div className="variant-details">
                          <p className="variant-info">{ship.info}</p>
                          <div className="variant-engines">
                            <strong>Engines:</strong> ×{ship.engines.count} {ship.engines.make} {ship.engines.model}
                            <div className="engine-features">
                              <span className={`badge feature-badge ${ship.engines.features.warpDrive ? "" : "disabled"}`}>Warp</span>
                              <span className={`badge feature-badge ${ship.engines.features.slipSpace ? "" : "disabled"}`}>Slip</span>
                              <span className={`badge feature-badge ${ship.engines.features.atmos ? "" : "disabled"}`}>Atmos</span>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
