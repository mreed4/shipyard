import { createContext, useState } from "react";
import { BrowserRouter as Router, Routes, Route, NavLink } from "react-router-dom";
import "./styles.css";
import ShipDashboard from "./components/ShipDashboard";
import ShipDetail from "./components/ShipDetail";
import CrewDashboard from "./components/CrewDashboard";

// Create context
export const DashboardContext = createContext();

function App() {
  const [shipState, setShipState] = useState({ ships: [], shipCount: 50, sortModeFromApp: "count" }); // Add sortMethod
  const [crewState, setCrewState] = useState({});

  return (
    <DashboardContext.Provider value={{ shipState, setShipState, crewState, setCrewState }}>
      <Router>
        <header>
          <h1>Shipyard</h1>
          <p>Generate ships and manage crew members.</p>
          <nav>
            <NavLink to="/ships" className="button-link">
              Ship Dashboard
            </NavLink>
            <NavLink to="/crew" className="button-link">
              Crew Dashboard
            </NavLink>
          </nav>
        </header>
        <main>
          <Routes>
            <Route path="/ships" element={<ShipDashboard />} />
            <Route path="/ships/:shipId" element={<ShipDetail />} />
            <Route path="/crew" element={<CrewDashboard />} />
          </Routes>
        </main>
      </Router>
    </DashboardContext.Provider>
  );
}

export default App;
