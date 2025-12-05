import { useState } from "react";
import { shipTypes } from "../data/shipTypes";
import { rarityTiers } from "../_game/data/raritySystem";
import { Rocket } from "lucide-react";
import "../components/ShipCatalog.css";

export default function ShipCatalog() {
  const [filterRarity, setFilterRarity] = useState("all");
  const [filterType, setFilterType] = useState("all");
  const [sortBy, setSortBy] = useState("rarity");

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
    if (sortBy === "rarity") {
      const rarityOrder = { common: 1, uncommon: 2, rare: 3, epic: 4, legendary: 5 };
      return rarityOrder[b.rarity] - rarityOrder[a.rarity];
    } else if (sortBy === "name") {
      return a.name.localeCompare(b.name);
    } else if (sortBy === "type") {
      return a.type.localeCompare(b.type);
    } else if (sortBy === "hp") {
      return b.__gameData.baseHitPoints - a.__gameData.baseHitPoints;
    } else if (sortBy === "damage") {
      return b.__gameData.baseDamageOutput - a.__gameData.baseDamageOutput;
    }
    return 0;
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
          <label>Sort by:</label>
          <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
            <option value="rarity">Rarity</option>
            <option value="name">Name</option>
            <option value="type">Type</option>
            <option value="hp">Hit Points</option>
            <option value="damage">Damage Output</option>
          </select>
        </div>
      </div>

      <div className="catalog-grid">
        {sortedShips.map((ship) => {
          const rarityInfo = rarityTiers[ship.rarity];
          return (
            <div key={ship.name} className={`catalog-card rarity-${ship.rarity}`}>
              <div className="card-header">
                <div className="ship-name">
                  {/* <Rocket size={20} /> */}
                  <h3>{ship.name}</h3>
                </div>
                <div className="ship-meta">
                  <span className="card-rarity">{rarityInfo.name}</span>
                  <span className="card-type">{ship.type}</span>
                </div>
              </div>

              <div className="card-stats">
                <div className="stat-row">
                  <span className="stat-label">HP:</span>
                  <span className="stat-value">{ship.__gameData.baseHitPoints.toLocaleString()}</span>
                </div>
                <div className="stat-row">
                  <span className="stat-label">DMG:</span>
                  <span className="stat-value">{ship.__gameData.baseDamageOutput.toLocaleString()}</span>
                </div>
                <div className="stat-row">
                  <span className="stat-label">Crew:</span>
                  <span className="stat-value">{ship.crewCapacity.toLocaleString()}</span>
                </div>
                <div className="stat-row">
                  <span className="stat-label">Mass:</span>
                  <span className="stat-value">{(ship.displacement / 1_000_000).toFixed(1)}M kg</span>
                </div>
              </div>

              <div className="card-info">
                <p>{ship.info}</p>
              </div>

              <div className="card-engines">
                <p>
                  <strong>Engines:</strong> {ship.engines.count}x {ship.engines.make} {ship.engines.model}
                </p>
                <div className="engine-features">
                  {ship.engines.features.warpDrive && <span className="feature-badge">Warp</span>}
                  {ship.engines.features.slipSpace && <span className="feature-badge">Slip</span>}
                  {ship.engines.features.atmos && <span className="feature-badge">Atmos</span>}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
