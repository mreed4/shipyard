import React, { useState } from "react";
import { generateCrewMembers } from "../functions/generateCrewMembers";

function CrewDashboard() {
  const [crewMembers, setCrewMembers] = useState([]);
  const [crewCount, setCrewCount] = useState(10);

  const generateCrew = () => {
    const newCrew = generateCrewMembers(crewCount);
    setCrewMembers(newCrew);
  };

  return (
    <fieldset>
      <legend>Crewgen</legend>
      <input type="number" value={crewCount} onChange={(e) => setCrewCount(e.target.value)} min="1" max="50" />
      <button onClick={generateCrew}>GEN</button>
      <div>
        <h3>Crew Members</h3>
        <ul>
          {crewMembers.map((member) => (
            <li key={member.id}>{member.id}</li>
          ))}
        </ul>
      </div>
    </fieldset>
  );
}

export default CrewDashboard;
