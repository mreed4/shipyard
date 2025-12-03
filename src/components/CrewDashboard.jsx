import { useState, useEffect, useContext } from "react";
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
            <button onClick={() => handleSortChange("rating")} disabled={sortMode === "rating"}>
              Sort by Rating
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
                {member.id}
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

  const ratingCounts = crew.reduce((counts, member) => {
    const rating = `Rating ${member.rating}`;
    counts[rating] = (counts[rating] || 0) + 1;
    return counts;
  }, {});

  const sortedRatingStats = Object.entries(ratingCounts).sort((a, b) => {
    if (sortMode === "rating") {
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
        {sortedRatingStats.map(([rating, count]) => (
          <CrewBarChart key={`${rating}-${animationKey}`} rating={rating} count={count} totalCrew={totalCrew} animationKey={animationKey} />
        ))}
      </ul>
    </div>
  );
}

function CrewBarChart({ rating, count, totalCrew, animationKey }) {
  const [barWidth, setBarWidth] = useState("0%");

  useEffect(() => {
    setBarWidth("0%");
    const timeout = setTimeout(() => setBarWidth(`${(count / totalCrew) * 100}%`), 0);
    return () => clearTimeout(timeout);
  }, [animationKey, count, totalCrew]);

  return (
    <li className="bar-chart-item">
      <span className="crew-rating-name">{rating}</span>
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
