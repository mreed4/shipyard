import { useState } from "react";
import "./Shipyards.css";

const SHIPYARDS = [
  { name: "Earth Orbit", parent: "Earth", subRadius: 0.3, angle: 45 },
  { name: "Luna", parent: "Earth", subRadius: 0.6, angle: 135 },
  { name: "Lagrange 2", parent: "Lagrange 2", angle: 0 },
  { name: "Mars Orbit", parent: "Mars Orbit", angle: 250 },
  { name: "Ceres", parent: "Asteroid Belt", angle: 270 },
  { name: "Europa", parent: "Jupiter", subRadius: 0.5, angle: 90 },
  { name: "Rings of Saturn", parent: "Saturn", subRadius: 0.5, angle: 330 },
  { name: "Titan", parent: "Saturn", subRadius: 0.8, angle: 30 },
];

const BODIES = [
  { name: "Sun", radius: 0, size: 8, color: "var(--highlight-color)", zoomLevel: 0.3, angle: 0 },
  { name: "Mercury", radius: 0.08, size: 2, color: "var(--lighten-40)", zoomLevel: 3, angle: 45 },
  { name: "Venus", radius: 0.12, size: 3, color: "var(--lighten-40)", zoomLevel: 2.5, angle: 110 },
  { name: "Earth", radius: 0.15, size: 3, color: "var(--lighten-60)", zoomLevel: 2.8, hasSubView: true, angle: 180 },
  { name: "Lagrange 2", radius: 0.15, size: 1.5, color: "var(--lighten-40)", zoomLevel: 2.5, angle: 0 },
  { name: "Mars Orbit", radius: 0.25, size: 0, color: "var(--lighten-40)", zoomLevel: 2, angle: 250 },
  { name: "Asteroid Belt", radius: 0.42, size: 0, color: "var(--lighten-20)", dashed: true, zoomLevel: 1.2, angle: 0 },
  { name: "Jupiter", radius: 0.65, size: 6, color: "var(--lighten-40)", zoomLevel: 1.5, angle: 310 },
  { name: "Saturn", radius: 0.82, size: 5, color: "var(--lighten-40)", zoomLevel: 1.8, hasSubView: true, angle: 20 },
];

function Shipyards() {
  const [selectedYard, setSelectedYard] = useState(null);
  const [hoveredYard, setHoveredYard] = useState(null);
  const [hoveredBody, setHoveredBody] = useState(null);
  const [zoom, setZoom] = useState(1);
  const [panX, setPanX] = useState(0);
  const [panY, setPanY] = useState(0);
  const [showOverlay, setShowOverlay] = useState(true);
  const [focusedBody, setFocusedBody] = useState(null);

  const MIN_ZOOM = 0.5;
  const MAX_ZOOM = 4;

  const size = 800;
  const centerX = size / 2;
  const centerY = size / 2;
  const scale = (size / 2) * 0.9;

  const handleZoomIn = () => setZoom((z) => Math.min(z * 1.3, MAX_ZOOM));
  const handleZoomOut = () => setZoom((z) => Math.max(z / 1.3, MIN_ZOOM));
  const handleResetView = () => {
    setZoom(1);
    setPanX(0);
    setPanY(0);
    setFocusedBody(null);
  };

  const handleBodyClick = (body) => {
    if (body.name === "Sun") {
      handleResetView();
      return;
    }
    const shipyardCount = getShipyardCount(body.name);
    if (shipyardCount > 1) {
      // Show detailed view of this planet system
      setFocusedBody(body.name);
      setZoom(body.zoomLevel);
      const bodyPos = toCartesian(body.radius, body.angle, 1, 0, 0);
      setPanX(-(bodyPos.x - centerX) * body.zoomLevel);
      setPanY(-(bodyPos.y - centerY) * body.zoomLevel);
    }
  };

  const getShipyardCount = (bodyName) => {
    return SHIPYARDS.filter((yard) => yard.parent === bodyName).length;
  };

  const toCartesian = (radius, angle, currentZoom = zoom, currentPanX = panX, currentPanY = panY) => {
    const rad = (angle * Math.PI) / 180;
    return {
      x: centerX + (radius * scale * Math.cos(rad) * currentZoom + currentPanX),
      y: centerY + (radius * scale * Math.sin(rad) * currentZoom + currentPanY),
    };
  };

  return (
    <div className="shipyards-page">
      {/* <div className="shipyards-header">
        <h2>Solar System Shipyards</h2>
        <p>Schematic representation of shipyard locations (not to scale)</p>
      </div> */}

      <div className="map-container">
        <div className="map-controls">
          <div className="zoom-controls">
            <button onClick={handleZoomOut} disabled={zoom <= MIN_ZOOM} title="Zoom Out">
              −
            </button>
            <span className="zoom-level">{zoom.toFixed(1)}x</span>
            <button onClick={handleZoomIn} disabled={zoom >= MAX_ZOOM} title="Zoom In">
              +
            </button>
            <button onClick={handleResetView} title="Reset View">
              Reset
            </button>
          </div>
          <button className="overlay-toggle" onClick={() => setShowOverlay(!showOverlay)}>
            {showOverlay ? "Hide" : "Show"} Facilities
          </button>
        </div>

        <div className="system-map" onClick={() => setSelectedYard(null)}>
          <svg viewBox={`0 0 ${size} ${size}`} className="solar-system-svg">
            <g transform={`translate(${panX}, ${panY}) scale(${zoom})`} transform-origin="center">
              {/* Orbital paths */}
              {BODIES.map((body) => {
                if (body.radius === 0) return null;
                const r = body.radius * scale;
                return (
                  <g key={`orbit-${body.name}`}>
                    {/* Visible orbit */}
                    <circle
                      cx={centerX}
                      cy={centerY}
                      r={r}
                      className="orbit-path"
                      strokeDasharray={body.dashed ? "4 4" : "none"}
                      style={{
                        opacity: hoveredBody && body.radius > 0 ? (hoveredBody === body.name ? 1 : 0.2) : 1,
                        pointerEvents: "none",
                      }}
                    />
                    {/* Invisible wider hover area */}
                    <circle
                      cx={centerX}
                      cy={centerY}
                      r={r}
                      fill="none"
                      stroke="transparent"
                      strokeWidth={20}
                      style={{ cursor: "pointer" }}
                      onMouseEnter={() => setHoveredBody(body.name)}
                      onMouseLeave={() => setHoveredBody(null)}
                    />
                  </g>
                );
              })}

              {/* Celestial bodies */}
              {BODIES.map((body) => {
                if (body.name === "Asteroid Belt") return null;
                const pos = body.radius === 0 ? { x: centerX, y: centerY } : toCartesian(body.radius, body.angle, 1, 0, 0);
                const shipyardCount = getShipyardCount(body.name);
                const showCount = shipyardCount > 1 && !focusedBody;
                const canZoom = shipyardCount > 1;

                return (
                  <g
                    key={`body-${body.name}`}
                    className="celestial-body-group"
                    onClick={() => handleBodyClick(body)}
                    onMouseEnter={() => setHoveredBody(body.name)}
                    onMouseLeave={() => setHoveredBody(null)}
                    style={{
                      cursor: canZoom ? "pointer" : "default",
                      opacity: hoveredBody ? (hoveredBody === body.name ? 1 : 0.3) : 1,
                    }}>
                    <circle cx={pos.x} cy={pos.y} r={body.size / zoom} fill={body.color} className="celestial-body" />
                    <text
                      x={pos.x}
                      y={pos.y + body.size / zoom + 12}
                      className="body-label"
                      textAnchor="middle"
                      fill="var(--lighten-60)"
                      style={{ fontSize: `${7 / zoom}px` }}>
                      {body.name}
                      {showCount && ` (${shipyardCount})`}
                    </text>
                  </g>
                );
              })}

              {/* Shipyard markers - only show if focused on parent body or no focus */}
              {SHIPYARDS.map((yard) => {
                const body = BODIES.find((b) => b.name === yard.parent);
                if (!body) return null;

                // Only show shipyards for the focused body or all if no focus
                const shouldShow = !focusedBody || focusedBody === yard.parent;
                if (!shouldShow) return null;

                // If focused on a body, show shipyards in detail view
                let pos;
                if (focusedBody === yard.parent && yard.subRadius !== undefined) {
                  // Show in orbital position around the parent
                  const parentPos = toCartesian(body.radius, body.angle, 1, 0, 0);
                  const subScale = 50 / zoom; // Fixed size for sub-orbital view
                  const rad = (yard.angle * Math.PI) / 180;
                  pos = {
                    x: parentPos.x + yard.subRadius * subScale * Math.cos(rad),
                    y: parentPos.y + yard.subRadius * subScale * Math.sin(rad),
                  };
                } else if (!focusedBody && yard.subRadius === undefined) {
                  // Show only shipyards without subRadius in main view
                  pos = toCartesian(body.radius, yard.angle, 1, 0, 0);
                } else if (focusedBody && yard.subRadius === undefined) {
                  // Single shipyard for this body, show at parent location
                  pos = toCartesian(body.radius, yard.angle, 1, 0, 0);
                } else {
                  // Don't show nested shipyards in main view
                  return null;
                }

                const isSelected = selectedYard === yard.name;
                const isHovered = hoveredYard === yard.name;
                const showLabel = (isHovered || isSelected) && yard.name !== "Mars Orbit";

                return (
                  <g
                    key={`yard-${yard.name}`}
                    className={`shipyard-marker ${isSelected ? "selected" : ""} ${isHovered ? "hovered" : ""}`}
                    onMouseEnter={() => setHoveredYard(yard.name)}
                    onMouseLeave={() => setHoveredYard(null)}
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedYard(yard.name);
                    }}>
                    <circle
                      cx={pos.x}
                      cy={pos.y}
                      r={2 / zoom}
                      fill="white"
                      stroke={isHovered || isSelected ? "var(--highlight-color)" : "none"}
                      strokeWidth={isHovered || isSelected ? 1 / zoom : 0}
                    />
                    {showLabel && (
                      <text
                        x={pos.x}
                        y={pos.y - 6 / zoom}
                        className="shipyard-label"
                        textAnchor="middle"
                        style={{ fontSize: `${8 / zoom}px` }}>
                        {yard.name}
                      </text>
                    )}
                  </g>
                );
              })}
            </g>
          </svg>
        </div>

        {showOverlay && (
          <div className="facilities-overlay">
            <h3>Facilities</h3>
            <div className="facilities-list">
              {SHIPYARDS.map((yard) => (
                <div
                  key={yard.name}
                  className={`facility-item ${selectedYard === yard.name ? "selected" : ""}`}
                  onMouseEnter={() => setHoveredYard(yard.name)}
                  onMouseLeave={() => setHoveredYard(null)}
                  onClick={() => setSelectedYard(yard.name)}>
                  {yard.name}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Shipyards;
