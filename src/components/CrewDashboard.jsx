import { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { generateCrewMembers } from "../functions/generateCrewMembers";
import { DashboardContext } from "../App";

export default function CrewDashboard() {
  const { crewState, setCrewState } = useContext(DashboardContext);
  const [animationKey, setAnimationKey] = useState(0);
  const [sortMode, setSortMode] = useState(() => localStorage.getItem("crewSortMode") || "count");
  const [viewMode, setViewMode] = useState(() => localStorage.getItem("crewViewMode") || "grade");

  const generateCrew = () => {
    const newCrew = generateCrewMembers(crewState.crewCount || 50);
    setCrewState({ ...crewState, crew: newCrew });
    setAnimationKey((prevKey) => prevKey + 1);
  };

  const handleViewChange = (mode) => {
    setViewMode(mode);
    localStorage.setItem("crewViewMode", mode);
    setAnimationKey((prevKey) => prevKey + 1);
  };

  // Auto-generate crew on first visit
  useEffect(() => {
    if (!crewState.crew || crewState.crew.length === 0) {
      generateCrew();
    }
  }, []);

  const handleSortChange = (mode) => {
    setSortMode(mode);
    localStorage.setItem("crewSortMode", mode);
    setAnimationKey((prevKey) => prevKey + 1);
  };

  return (
    <>
      <CrewGeneratorControls
        crewCount={crewState.crewCount || 50}
        setCrewCount={(count) => setCrewState({ ...crewState, crewCount: count })}
        generateCrew={generateCrew}
      />
      {crewState.crew && crewState.crew.length > 0 && (
        <div className="crew-dashboard">
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
            </div>
          </div>
          <CrewBarCharts crew={crewState.crew} animationKey={animationKey} sortMode={sortMode} viewMode={viewMode} />
          <h3>Crew Members</h3>
          <ol className="crew-list">
            {crewState.crew.map((member) => (
              <li key={member.id} className="crew-member">
                <Link to={`/crew/${encodeURIComponent(member.id)}`} className="crew-link">
                  {member.id}
                </Link>
              </li>
            ))}
          </ol>
        </div>
      )}
    </>
  );
}

function CrewGeneratorControls({ crewCount, setCrewCount, generateCrew }) {
  return (
    <fieldset>
      <legend>Crewgen</legend>
      <input
        type="number"
        value={crewCount}
        onChange={(e) => setCrewCount(e.target.value)}
        min="1"
        max="50"
        title="Enter the number of crew members to generate (1-50)"
      />
      <button type="button" onClick={generateCrew}>
        GEN
      </button>
    </fieldset>
  );
}

function CrewBarCharts({ crew, animationKey, sortMode, viewMode }) {
  const totalCrew = crew.length;

  const crewCounts = crew.reduce((counts, member) => {
    let key;
    if (viewMode === "grade") {
      key = `Grade ${member.grade}`;
    } else if (viewMode === "gender") {
      key = member.gender === "M" ? "Male" : "Female";
    } else {
      key = member.birthplace;
    }
    counts[key] = (counts[key] || 0) + 1;
    return counts;
  }, {});

  const gradeOrder = { "Grade S": 0, "Grade A": 1, "Grade B": 2, "Grade C": 3, "Grade D": 4, "Grade F": 5 };

  const sortedStats = Object.entries(crewCounts).sort((a, b) => {
    if (sortMode === "name") {
      // Special sorting for grades
      if (viewMode === "grade" && gradeOrder[a[0]] !== undefined && gradeOrder[b[0]] !== undefined) {
        return gradeOrder[a[0]] - gradeOrder[b[0]];
      }
      return a[0].localeCompare(b[0]);
    } else {
      return b[1] - a[1];
    }
  });

  return (
    <div className="crew-dashboard-inner">
      <div className="total-crew">
        <span className="label">Total</span>
        <span className="crew-total-count">{totalCrew}</span>
      </div>
      <ul className="crew-dashboard-list">
        {sortedStats.map(([label, count]) => (
          <CrewBarChart key={`${label}-${animationKey}`} label={label} count={count} totalCrew={totalCrew} animationKey={animationKey} />
        ))}
        <CrewStackedBarChart key={`stacked-${animationKey}`} sortedStats={sortedStats} total={totalCrew} animationKey={animationKey} />
      </ul>
    </div>
  );
}

function CrewBarChart({ label, count, totalCrew, animationKey }) {
  const [barWidth, setBarWidth] = useState("0%");

  useEffect(() => {
    setBarWidth("0%");
    const timeout = setTimeout(() => setBarWidth(`${(count / totalCrew) * 100}%`), 0);
    return () => clearTimeout(timeout);
  }, [animationKey, count, totalCrew]);

  return (
    <li className="bar-chart-item">
      <span className="bar-chart-label">{label}</span>
      <div className="bar-chart-container">
        <div className="bar-chart-background"></div>
        <div className="bar-chart" style={{ width: barWidth }}></div>
      </div>
      <span>
        {count < 10 ? `0${count}` : count}/{totalCrew}
      </span>
    </li>
  );
}

function CrewStackedBarChart({ sortedStats, total, animationKey }) {
  const [segments, setSegments] = useState([]);

  useEffect(() => {
    setSegments([]); // Reset segments
    const timeout = setTimeout(() => {
      const newSegments = sortedStats.map(([label, count]) => ({
        label,
        percentage: (count / total) * 100,
      }));
      setSegments(newSegments);
    }, 0);
    return () => clearTimeout(timeout);
  }, [animationKey, sortedStats, total]);

  return (
    <li className="bar-chart-item stacked-bar-item">
      <span className="bar-chart-label">All</span>
      <div className="bar-chart-container">
        <div className="bar-chart-background"></div>
        <div className="stacked-bar-chart">
          {segments.map(({ label, percentage }) => (
            <div
              key={label}
              className="stacked-segment"
              style={{ width: `${percentage}%` }}
              title={`${label}: ${Math.round(percentage)}%`}
            />
          ))}
        </div>
      </div>
      <span>
        {total}/{total}
      </span>
    </li>
  );
}
