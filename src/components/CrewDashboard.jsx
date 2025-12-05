import CrewGeneratorControls from "./CrewGeneratorControls";
import CrewDashboardControls from "./CrewDashboardControls";
import CrewBarChartList from "./CrewBarChartList";
import CrewItemList from "./CrewItemList";
import { useCrewDashboard } from "../contexts/CrewDashboardContext";
import "./CrewDashboard.css";
import "./Dashboard.css";

export default function CrewDashboard() {
  const { crew } = useCrewDashboard();

  return (
    <>
      <CrewGeneratorControls />
      {crew.length > 0 && (
        <div className="crew-dashboard">
          <CrewDashboardControls />
          <CrewBarChartList />
          <h3>Crew Members</h3>
          <CrewItemList />
        </div>
      )}
    </>
  );
}
