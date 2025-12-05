import { useParams, useNavigate, Link } from "react-router-dom";
import { useContext } from "react";
import { DashboardContext } from "../App";
import "./ShipDashboard.css";
import "./Dashboard.css";

export default function ShipDetail() {
  const { shipId } = useParams();
  const { shipState } = useContext(DashboardContext);
  const navigate = useNavigate();

  // Find the ship with the matching ID
  const ship = shipState.ships.find((s) => s.shipId === shipId);

  if (!ship) {
    return (
      <div className="ship-detail">
        <h2>Ship Not Found</h2>
        <p>The ship with ID "{shipId}" could not be found.</p>
        <Link to="/ships" className="back-button">
          ← Back to Ship Dashboard
        </Link>
      </div>
    );
  }

  const shipClass = ship;
  const engineSerials = ship.engineSerials || [];
  const crewMembers = ship.crewMembers || {};

  return (
    <div className="ship-detail">
      <div className="ship-detail-header">
        <button onClick={() => navigate("/ships")} className="back-button">
          ← Back
        </button>
        <h2>{ship.shipId}</h2>
      </div>

      <div className="ship-detail-content">
        <div className="ship-detail-section">
          <h2 className="section-title">Ship Instance Details</h2>
          <p className="section-description">Unique to this specific ship</p>

          <section className="ship-info-section">
            <h3>Identification</h3>
            <dl className="ship-info-list">
              <dt>Ship ID:</dt>
              <dd>{ship.shipId}</dd>
              <dt>Shipyard:</dt>
              <dd>{ship.shipyard}</dd>
              <dt>Year Built:</dt>
              <dd>{ship.yearBuilt}</dd>
            </dl>
          </section>

          {engineSerials.length > 0 && (
            <section className="ship-info-section">
              <h3>Engine Serials</h3>
              <ul className="engine-serials-list">
                {engineSerials.map((serial, index) => (
                  <li key={index}>{serial}</li>
                ))}
              </ul>
            </section>
          )}

          {Object.keys(crewMembers).length > 0 && (
            <section className="ship-info-section">
              <h3>Key Crew</h3>
              <div className="crew-structure">
                {Object.entries(crewMembers).map(([role, member]) => (
                  <div key={role} className="crew-role">
                    <strong>{formatRole(role)}:</strong>
                    {typeof member === "object" && member !== null && member.id ? (
                      <div className="crew-member-info">
                        <div>ID: {member.id}</div>
                        {member.name && <div>Name: {member.name}</div>}
                        {member.grade && <div>Grade: {member.grade}</div>}
                      </div>
                    ) : typeof member === "object" && member !== null ? (
                      <ul className="sub-crew-list">
                        {Object.entries(member).map(([subRole, subMember]) => (
                          <li key={subRole}>
                            <strong>{formatRole(subRole)}:</strong>
                            {subMember && subMember.id ? (
                              <div className="crew-member-info">
                                <div>ID: {subMember.id}</div>
                                {subMember.name && <div>Name: {subMember.name}</div>}
                                {subMember.grade && <div>Grade: {subMember.grade}</div>}
                              </div>
                            ) : (
                              <span> Unassigned</span>
                            )}
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <span> {member || "Unassigned"}</span>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>

        <div className="ship-detail-section">
          <h2 className="section-title">{shipClass.name} Class Information</h2>
          <p className="section-description">Shared by all ships of this class</p>

          <section className="ship-info-section">
            <h3>Class Details</h3>
            <dl className="ship-info-list">
              <dt>Class:</dt>
              <dd>{shipClass.name}</dd>
              <dt>Type:</dt>
              <dd>{shipClass.type}</dd>
            </dl>
          </section>

          {shipClass.info && (
            <section className="ship-info-section">
              <h3>Description</h3>
              <p>{shipClass.info}</p>
            </section>
          )}

          <section className="ship-info-section">
            <h3>Specifications</h3>
            <dl className="ship-info-list">
              <dt>Displacement:</dt>
              <dd>{shipClass.displacement.toLocaleString()} tons</dd>
              <dt>Crew Capacity:</dt>
              <dd>{shipClass.crewCapacity.toLocaleString()}</dd>
            </dl>
          </section>

          <section className="ship-info-section">
            <h3>Propulsion</h3>
            <dl className="ship-info-list">
              <dt>Engine Count:</dt>
              <dd>{shipClass.engines.count}</dd>
              <dt>Make:</dt>
              <dd>{shipClass.engines.make}</dd>
              <dt>Model:</dt>
              <dd>{shipClass.engines.model}</dd>
              <dt>Features:</dt>
              <dd>
                <ul className="features-list">
                  {shipClass.engines.features.warpDrive && <li>Warp Drive</li>}
                  {shipClass.engines.features.slipSpace && <li>Slip Space</li>}
                  {shipClass.engines.features.atmos && <li>Atmospheric</li>}
                </ul>
              </dd>
            </dl>
          </section>

          {shipClass.specialFeatures && shipClass.specialFeatures.length > 0 && (
            <section className="ship-info-section">
              <h3>Special Features</h3>
              <ul className="features-list">
                {shipClass.specialFeatures.map((feature, index) => (
                  <li key={index}>{feature}</li>
                ))}
              </ul>
            </section>
          )}
        </div>
      </div>
    </div>
  );
}

// Helper function to format role names
function formatRole(role) {
  return role
    .replace(/([A-Z])/g, " $1")
    .replace(/^./, (str) => str.toUpperCase())
    .trim();
}
