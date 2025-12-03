import { Link } from "react-router-dom";
import { useCrewDashboard } from "../contexts/CrewDashboardContext";

export default function CrewItemList() {
  const { crew, totalCrew, viewMode, isDimmed, enableHighlight } = useCrewDashboard();

  return (
    <ol
      className={`crew-list ${totalCrew >= 100 ? "three-digit" : ""}`}
      style={{
        gridTemplateRows: `repeat(${Math.ceil(totalCrew / 5)}, auto)`,
      }}>
      {crew.map((member, index) => {
        const number = (index + 1).toString().padStart(totalCrew >= 100 ? 3 : 2, "0");
        return (
          <CrewListItem
            key={member.id}
            member={member}
            number={number}
            viewMode={viewMode}
            isDimmed={isDimmed}
            enableHighlight={enableHighlight}
          />
        );
      })}
    </ol>
  );
}

function CrewListItem({ member, number, viewMode, isDimmed, enableHighlight }) {
  let itemKey;
  if (viewMode === "grade") {
    itemKey = `Grade ${member.grade}`;
  } else if (viewMode === "gender") {
    itemKey = member.gender === "M" ? "Male" : "Female";
  } else {
    itemKey = member.birthplace;
  }
  const isDimmedItem = enableHighlight && isDimmed(itemKey);

  return (
    <li className={`crew ${isDimmedItem ? "dimmed" : ""}`} data-number={number}>
      <Link to={`/crew/${encodeURIComponent(member.id)}`} className="crew-link">
        {member.id}
      </Link>
    </li>
  );
}
