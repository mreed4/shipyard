import { useParams, useNavigate, Link } from "react-router-dom";
import { useContext } from "react";
import { DashboardContext } from "../App";

export default function CrewDetail() {
  const { crewId } = useParams();
  const { crewState } = useContext(DashboardContext);
  const navigate = useNavigate();

  // Find the crew member with the matching ID
  const crewMember = crewState.crew?.find((c) => c.id === crewId);

  if (!crewMember) {
    return (
      <div className="crew-detail">
        <h2>Crew Member Not Found</h2>
        <p>The crew member with ID "{crewId}" could not be found.</p>
        <Link to="/crew" className="back-button">
          ← Back to Crew Dashboard
        </Link>
      </div>
    );
  }

  // Parse the ID to extract grade
  const idParts = crewMember.id.split("/");
  const grade = idParts[1];

  return (
    <div className="crew-detail">
      <div className="crew-detail-header">
        <button onClick={() => navigate("/crew")} className="back-button">
          ← Back
        </button>
        <h2>{crewMember.id}</h2>
      </div>

      <div className="crew-detail-content">
        <div className="crew-detail-section">
          <h2 className="section-title">Personal Information</h2>
          <p className="section-description">Individual crew member details</p>

          <section className="crew-info-section">
            <h3>Identity</h3>
            <dl className="crew-info-list">
              <dt>ID:</dt>
              <dd>{crewMember.id}</dd>
              <dt>Name:</dt>
              <dd>{crewMember.name}</dd>
              <dt>Gender:</dt>
              <dd>{crewMember.gender === "M" ? "Male" : "Female"}</dd>
              <dt>Age:</dt>
              <dd>{crewMember.age} years</dd>
              <dt>Birthplace:</dt>
              <dd>{crewMember.birthplace}</dd>
            </dl>
          </section>

          <section className="crew-info-section">
            <h3>Service Record</h3>
            <dl className="crew-info-list">
              <dt>TRE Score:</dt>
              <dd>{crewMember.scoreTRE.toLocaleString()}</dd>
              <dt>Grade:</dt>
              <dd>
                <strong>{crewMember.grade}</strong> - {getGradeDescription(crewMember.grade)}
              </dd>
            </dl>
          </section>
        </div>

        <div className="crew-detail-section">
          <h2 className="section-title">Performance Metrics</h2>
          <p className="section-description">Training and evaluation details</p>

          <section className="crew-info-section">
            <h3>TRE (Training Readiness Evaluation)</h3>
            <p>
              The Training Readiness Evaluation score measures a crew member's preparedness for duty. Scores are influenced by birthplace
              and other factors.
            </p>
            <dl className="crew-info-list">
              <dt>Score:</dt>
              <dd>{crewMember.scoreTRE.toLocaleString()}</dd>
              <dt>Grade Classification:</dt>
              <dd>
                <strong>{crewMember.grade}</strong> - {getGradeDescription(crewMember.grade)}
              </dd>
            </dl>
          </section>
        </div>
      </div>
    </div>
  );
}

// Helper function to get grade descriptions
function getGradeDescription(grade) {
  const descriptions = {
    S: "Superior (4400+)",
    A: "Excellent (4200-4399)",
    B: "Above Average (3900-4199)",
    C: "Average (3500-3899)",
    D: "Below Average (3300-3499)",
    F: "Needs Improvement (<3300)",
  };
  return descriptions[grade] || "Unknown";
}
