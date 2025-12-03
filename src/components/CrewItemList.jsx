import { Link } from "react-router-dom";
import { useCrewDashboard } from "../contexts/CrewDashboardContext";

export default function CrewItemList() {
  const { crew, totalCrew } = useCrewDashboard();

  return (
    <ol
      className={`crew-list ${totalCrew >= 100 ? "three-digit" : ""}`}
      style={{
        gridTemplateRows: `repeat(${Math.ceil(totalCrew / 5)}, auto)`,
      }}>
      {crew.map((member, index) => {
        const number = (index + 1).toString().padStart(totalCrew >= 100 ? 3 : 2, "0");
        return (
          <li key={member.id} className="crew" data-number={number}>
            <Link to={`/crew/${encodeURIComponent(member.id)}`} className="crew-link">
              {member.id}
            </Link>
          </li>
        );
      })}
    </ol>
  );
}
