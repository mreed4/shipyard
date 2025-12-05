import { useState } from "react";
import { shipTypes } from "../data/shipTypes";
import { rarityTiers } from "../_game/data/raritySystem";
import { Rocket } from "lucide-react";
import CustomSelect from "./CustomSelect";
import "../components/ShipCatalog.css";

export default function ShipCatalog() {
  const [filterRarity, setFilterRarity] = useState("all");
  const [filterType, setFilterType] = useState("all");
  const [sortBy, setSortBy] = useState("rarity");
  const [sortOrder, setSortOrder] = useState("desc");
  const [showExtraInfo, setShowExtraInfo] = useState(true);
  const [useDefaultLayout, setUseDefaultLayout] = useState(true);

  // Convert shipTypes object to array
  const allShips = Object.values(shipTypes);

  // Filter ships
  let filteredShips = allShips;
  if (filterRarity !== "all") {
    filteredShips = filteredShips.filter((ship) => ship.rarity === filterRarity);
  }
  if (filterType !== "all") {
    filteredShips = filteredShips.filter((ship) => ship.type === filterType);
  }

  // Sort ships
  const sortedShips = [...filteredShips].sort((a, b) => {
    // Default layout: sort by type first, then by rarity
    if (useDefaultLayout) {
      const typeComparison = a.type.localeCompare(b.type);
      if (typeComparison !== 0) return typeComparison;
      const rarityOrder = { common: 1, uncommon: 2, rare: 3, epic: 4, legendary: 5 };
      return rarityOrder[b.rarity] - rarityOrder[a.rarity];
    }

    // Custom sorting
    let comparison = 0;
    if (sortBy === "rarity") {
      const rarityOrder = { common: 1, uncommon: 2, rare: 3, epic: 4, legendary: 5 };
      comparison = rarityOrder[b.rarity] - rarityOrder[a.rarity];
    } else if (sortBy === "name") {
      comparison = a.name.localeCompare(b.name);
    } else if (sortBy === "type") {
      comparison = a.type.localeCompare(b.type);
    } else if (sortBy === "hp") {
      comparison = b.__gameData.baseHitPoints - a.__gameData.baseHitPoints;
    } else if (sortBy === "damage") {
      comparison = b.__gameData.baseDamageOutput - a.__gameData.baseDamageOutput;
    }
    return sortOrder === "asc" ? -comparison : comparison;
  });

  // Count ships by rarity
  const rarityCounts = {
    all: allShips.length,
    common: allShips.filter((s) => s.rarity === "common").length,
    uncommon: allShips.filter((s) => s.rarity === "uncommon").length,
    rare: allShips.filter((s) => s.rarity === "rare").length,
    epic: allShips.filter((s) => s.rarity === "epic").length,
    legendary: allShips.filter((s) => s.rarity === "legendary").length,
  };

  // Get unique ship types and count them
  const uniqueTypes = [...new Set(allShips.map((s) => s.type))].sort();
  const typeCounts = {
    all: allShips.length,
  };
  uniqueTypes.forEach((type) => {
    typeCounts[type] = allShips.filter((s) => s.type === type).length;
  });

  return (
    <div className="ship-catalog">
      <div className="catalog-header">
        <h2>Ship Catalog</h2>
        <p className="catalog-description">All available ship types in the fleet. Total: {allShips.length} ships</p>
      </div>

      <div className="catalog-controls">
        <div className="control-group">
          <label>Filter by Rarity:</label>
          <div className="rarity-filters">
            <button className={filterRarity === "all" ? "active" : ""} onClick={() => setFilterRarity("all")}>
              All ({rarityCounts.all})
            </button>
            {Object.entries(rarityTiers).map(([key, tier]) => (
              <button key={key} className={`${filterRarity === key ? "active" : ""} rarity-${key}`} onClick={() => setFilterRarity(key)}>
                {tier.name} ({rarityCounts[key]})
              </button>
            ))}
          </div>
        </div>

        <div className="control-group">
          <label>Filter by Type:</label>
          <div className="type-filters">
            <button className={filterType === "all" ? "active" : ""} onClick={() => setFilterType("all")}>
              All ({typeCounts.all})
            </button>
            {uniqueTypes.map((type) => (
              <button key={type} className={filterType === type ? "active" : ""} onClick={() => setFilterType(type)}>
                {type} ({typeCounts[type]})
              </button>
            ))}
          </div>
        </div>

        <div className="control-group">
          <button
            onClick={() => {
              setUseDefaultLayout(true);
              setSortBy("rarity");
              setSortOrder("desc");
              setFilterRarity("all");
              setFilterType("all");
            }}
            disabled={useDefaultLayout && filterRarity === "all" && filterType === "all"}>
            Reset to Default
          </button>
          <label>Sort by:</label>
          <CustomSelect
            value={sortBy}
            onChange={(e) => {
              setSortBy(e);
              setUseDefaultLayout(false);
            }}
            options={["rarity", "name", "type", "hp", "damage"]}
          />
          <label>Order:</label>
          <CustomSelect
            value={sortOrder}
            onChange={(e) => {
              setSortOrder(e);
              setUseDefaultLayout(false);
            }}
            options={["desc", "asc"]}
          />
          <label className="checkbox-toggle">
            <input type="checkbox" checked={showExtraInfo} onChange={(e) => setShowExtraInfo(e.target.checked)} />
            <span>Show Extra Info</span>
          </label>
        </div>
      </div>

      <div className={`catalog-grid ${useDefaultLayout ? "default-layout" : ""}`}>
        {sortedShips.map((ship) => {
          const rarityInfo = rarityTiers[ship.rarity];
          return (
            <div key={ship.name} className={`ship-card rarity-${ship.rarity}`}>
              <div className="ship-card-header">
                <div className="ship-name">
                  {/* <Rocket size={20} /> */}
                  <h3>{ship.name}</h3>
                </div>
                <div className="ship-meta">
                  <span className="ship-rarity">{rarityInfo.name}</span>
                  <span className="ship-type">{ship.type}</span>
                </div>
                <div className="ship-stats">
                  {[
                    { label: "HP:", value: ship.__gameData.baseHitPoints.toLocaleString() },
                    { label: "DMG:", value: ship.__gameData.baseDamageOutput.toLocaleString() },
                    { label: "Crew:", value: ship.crewCapacity.toLocaleString() },
                    { label: "Mass:", value: `${(ship.displacement / 1_000_000).toFixed(1)}M kg` },
                  ].map((stat, index) => (
                    <div key={index} className="stat-row">
                      <span className="stat-label">{stat.label}</span>
                      <span className="stat-value">{stat.value}</span>
                    </div>
                  ))}
                </div>
                {showExtraInfo && (
                  <div className="ship-info">
                    <p>{ship.info}</p>
                  </div>
                )}
              </div>

              {showExtraInfo && (
                <div className="ship-engines">
                  <p>
                    <strong>Engines:</strong>
                    <br /> {ship.engines.count}x {ship.engines.make} {ship.engines.model}
                  </p>
                  <div className="engine-features">
                    <span className={`feature-badge ${ship.engines.features.warpDrive ? "" : "disabled"}`}>Warp</span>
                    <span className={`feature-badge ${ship.engines.features.slipSpace ? "" : "disabled"}`}>Slip</span>
                    <span className={`feature-badge ${ship.engines.features.atmos ? "" : "disabled"}`}>Atmos</span>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
