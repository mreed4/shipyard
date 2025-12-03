import { createContext, useState } from "react";
import { BrowserRouter as Router, Routes, Route, NavLink } from "react-router-dom";
import "./styles.css";
import ShipDashboard from "./components/ShipDashboard";
import ShipDetail from "./components/ShipDetail";
import CrewDashboard from "./components/CrewDashboard";
import CrewDetail from "./components/CrewDetail";

// Create context
export const DashboardContext = createContext();

function App() {
  const [shipState, setShipState] = useState({ ships: [], shipCount: 50, sortModeFromApp: "count" }); // Add sortMethod
  const [crewState, setCrewState] = useState({ crew: [], crewCount: 10 });

  return (
    <DashboardContext.Provider value={{ shipState, setShipState, crewState, setCrewState }}>
      <Router>
        <header>
          <h1>Shipyard</h1>
          <p>Generate ships and manage crew members.</p>
          <nav>
            <NavLink to="/ships" className={({ isActive }) => (isActive ? "button-link disabled" : "button-link")}>
              Ship Dashboard
            </NavLink>
            <NavLink to="/crew" className={({ isActive }) => (isActive ? "button-link disabled" : "button-link")}>
              Crew Dashboard
            </NavLink>
          </nav>
        </header>
        <main>
          <Routes>
            <Route path="/ships" element={<ShipDashboard />} />
            <Route path="/ships/:shipId" element={<ShipDetail />} />
            <Route path="/crew" element={<CrewDashboard />} />
            <Route path="/crew/:crewId" element={<CrewDetail />} />
          </Routes>
        </main>
      </Router>
    </DashboardContext.Provider>
  );
}

export default App;
