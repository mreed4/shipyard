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
    const typeShips = allShips.filter((ship) => ship.type === type);

    // Group by ship name to consolidate multiple shipyard classes
    const shipsByClassName = {};
    typeShips.forEach((ship) => {
      if (!shipsByClassName[ship.className]) {
        shipsByClassName[ship.className] = {
          ...ship,
          shipyards: [ship.shipyard],
        };
      } else {
        // Add shipyard to the list if not already present
        if (!shipsByClassName[ship.className].shipyards.includes(ship.shipyard)) {
          shipsByClassName[ship.className].shipyards.push(ship.shipyard);
        }
      }
    });

    shipsByType[type] = Object.values(shipsByClassName).sort((a, b) => a.className.localeCompare(b.className));
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
        <p>Browse ship types and their shipyard classes</p>
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
                <div className="type-shipclasses">
                  {ships.map((ship) => (
                    <div key={ship.className} className="shipclass-card">
                      <div className="shipclass-header">
                        <h4 className="shipclass-name">{ship.className}</h4>
                        <div className="shipyards-list">
                          {ship.shipyards.map((shipyard) => (
                            <span key={shipyard} className="badge shipclass-shipyard-badge">
                              {shipyard}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div className="shipclass-content-wrapper">
                        <div className="shipclass-stats">
                          {[
                            { label: "Hull", value: ship.baseHitPoints.toLocaleString() },
                            { label: "DMG", value: ship.baseDamageOutput.toLocaleString() },
                            { label: "Armor", value: ship.baseArmor.toLocaleString() },
                            { label: "Speed", value: ship.baseSpeed.toLocaleString() },
                            { label: "Precision", value: `${ship.basePrecision}%` },
                            { label: "Crew", value: ship.crewCapacity.toLocaleString() },
                            {
                              label: "Mass",
                              value:
                                ship.type === "Fighter"
                                  ? `${(ship.displacement / 1_000).toFixed(1)}K kg`
                                  : `${(ship.displacement / 1_000_000).toFixed(1)}M kg`,
                            },
                          ].map((stat) => (
                            <div key={stat.label} className="stat-item">
                              <span className="stat-label">{stat.label}:</span>
                              <span className="stat-value">{stat.value}</span>
                            </div>
                          ))}
                        </div>
                        <ShipRadarChart ship={ship} />
                      </div>

                      {showExtraInfo && (
                        <div className="shipclass-details">
                          <p className="shipclass-info">{ship.info}</p>
                          <div className="shipclass-engines">
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
