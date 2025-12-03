import { useCrewDashboard } from "../contexts/CrewDashboardContext";

export default function CrewGeneratorControls() {
  const { crewCount, setCrewCount, generateCrew } = useCrewDashboard();

  return (
    <fieldset>
      <legend>Crewgen</legend>
      <input
        type="number"
        value={crewCount}
        onChange={(e) => setCrewCount(e.target.value)}
        min="1"
        max="50"
        title="Enter the number of crewgen to generate (1-50)"
      />
      <button type="button" onClick={generateCrew}>
        GEN
      </button>
    </fieldset>
  );
}
