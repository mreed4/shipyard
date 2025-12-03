import { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { generateCrewMembers } from "../functions/generateCrewMembers";
import { DashboardContext } from "../App";

export default function CrewDashboard() {
  const { crewState, setCrewState } = useContext(DashboardContext);
  const [animationKey, setAnimationKey] = useState(0);
  const [sortMode, setSortMode] = useState("count");

  const generateCrew = () => {
    const newCrew = generateCrewMembers(crewState.crewCount || 10);
    setCrewState({ ...crewState, crew: newCrew });
    setAnimationKey((prevKey) => prevKey + 1);
    setSortMode("count");
  };

  const handleSortChange = (mode) => {
    setSortMode(mode);
    setAnimationKey((prevKey) => prevKey + 1);
  };

  return (
    <>
      <CrewGeneratorControls
        crewCount={crewState.crewCount || 10}
        setCrewCount={(count) => setCrewState({ ...crewState, crewCount: count })}
        generateCrew={generateCrew}
      />
      {crewState.crew && crewState.crew.length > 0 && (
        <div className="crew-dashboard">
          <div className="sort-toggle">
            <button onClick={() => handleSortChange("grade")} disabled={sortMode === "grade"}>
              Sort by Grade
            </button>
            <button onClick={() => handleSortChange("count")} disabled={sortMode === "count"}>
              Sort by Count
            </button>
          </div>
          <CrewBarCharts crew={crewState.crew} animationKey={animationKey} sortMode={sortMode} />
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

function CrewBarCharts({ crew, animationKey, sortMode }) {
  const totalCrew = crew.length;

  const gradeCounts = crew.reduce((counts, member) => {
    const grade = `Grade ${member.grade}`;
    counts[grade] = (counts[grade] || 0) + 1;
    return counts;
  }, {});

  const sortedGradeStats = Object.entries(gradeCounts).sort((a, b) => {
    if (sortMode === "grade") {
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
        {sortedGradeStats.map(([grade, count]) => (
          <CrewBarChart key={`${grade}-${animationKey}`} grade={grade} count={count} totalCrew={totalCrew} animationKey={animationKey} />
        ))}
      </ul>
    </div>
  );
}

function CrewBarChart({ grade, count, totalCrew, animationKey }) {
  const [barWidth, setBarWidth] = useState("0%");

  useEffect(() => {
    setBarWidth("0%");
    const timeout = setTimeout(() => setBarWidth(`${(count / totalCrew) * 100}%`), 0);
    return () => clearTimeout(timeout);
  }, [animationKey, count, totalCrew]);

  return (
    <li className="bar-chart-item">
      <span className="crew-grade-name">{grade}</span>
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
