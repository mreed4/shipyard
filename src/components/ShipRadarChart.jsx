import "./ShipRadarChart.css";

export default function ShipRadarChart({ ship }) {
  // Type-specific max values for normalization
  // These represent reasonable upper bounds for each type to show variation
  const typeMaxValues = {
    Fighter: {
      hp: 3500,
      damage: 300,
      displacement: 80_000,
      crew: 5,
      armor: 120,
      speed: 1000,
      precision: 90,
    },
    Frigate: {
      hp: 11000,
      damage: 800,
      displacement: 12_000_000,
      crew: 900,
      armor: 360,
      speed: 500,
      precision: 80,
    },
    Cruiser: {
      hp: 14500,
      damage: 1050,
      displacement: 22_000_000,
      crew: 4000,
      armor: 550,
      speed: 330,
      precision: 75,
    },
    Carrier: {
      hp: 29000,
      damage: 2200,
      displacement: 85_000_000,
      crew: 4500,
      armor: 720,
      speed: 220,
      precision: 70,
    },
    "Capital Ship": {
      hp: 33000,
      damage: 2900,
      displacement: 700_000_000,
      crew: 7500,
      armor: 950,
      speed: 150,
      precision: 65,
    },
  };

  const maxValues = typeMaxValues[ship.type] || typeMaxValues["Capital Ship"];

  const normalizeValue = (value, max) => {
    return Math.min((value / max) * 100, 100);
  };

  const stats = {
    HUL: normalizeValue(ship.baseHitPoints, maxValues.hp),
    DMG: normalizeValue(ship.baseDamageOutput, maxValues.damage),
    ARM: normalizeValue(ship.baseArmor, maxValues.armor),
    SPD: normalizeValue(ship.baseSpeed, maxValues.speed),
    PRC: normalizeValue(ship.basePrecision, maxValues.precision),
  };

  const statKeys = Object.keys(stats);
  const numStats = statKeys.length;
  const angleStep = (2 * Math.PI) / numStats;
  const centerX = 100;
  const centerY = 100;
  const maxRadius = 80;

  // Generate points for the stat polygon
  const points = statKeys
    .map((key, index) => {
      const angle = index * angleStep - Math.PI / 2; // Start from top
      const value = stats[key];
      const radius = (value / 100) * maxRadius;
      const x = centerX + radius * Math.cos(angle);
      const y = centerY + radius * Math.sin(angle);
      return `${x},${y}`;
    })
    .join(" ");

  // Generate grid circles
  const gridLevels = [20, 40, 60, 80, 100];

  return (
    <div className="radar-chart-container">
      <svg viewBox="0 0 200 200" className="radar-chart">
        {/* Grid circles */}
        {gridLevels.map((level) => (
          <circle
            key={level}
            cx={centerX}
            cy={centerY}
            r={(level / 100) * maxRadius}
            className="radar-grid-circle"
            fill="none"
            stroke="var(--lighten-10)"
            strokeWidth="0.5"
          />
        ))}

        {/* Axes */}
        {statKeys.map((key, index) => {
          const angle = index * angleStep - Math.PI / 2;
          const x = centerX + maxRadius * Math.cos(angle);
          const y = centerY + maxRadius * Math.sin(angle);
          return (
            <line key={key} x1={centerX} y1={centerY} x2={x} y2={y} className="radar-axis" stroke="var(--lighten-10)" strokeWidth="0.5" />
          );
        })}

        {/* Stat polygon */}
        <polygon points={points} className="radar-stat-area" fill="var(--text-color-bright)" fillOpacity="0.3" stroke="none" />

        {/* Labels */}
        {statKeys.map((key, index) => {
          const angle = index * angleStep - Math.PI / 2;
          const labelRadius = maxRadius + 15;
          const x = centerX + labelRadius * Math.cos(angle);
          const y = centerY + labelRadius * Math.sin(angle);
          return (
            <text
              key={`${key}-label`}
              x={x}
              y={y}
              className="radar-label"
              textAnchor="middle"
              dominantBaseline="middle"
              fill="var(--text-color-bright)">
              {key}
            </text>
          );
        })}
      </svg>
    </div>
  );
}
