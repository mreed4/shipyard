import { createContext, useState } from "react";
import { BrowserRouter as Router, Routes, Route, NavLink, Navigate } from "react-router-dom";
import "./styles.css";
import ShipDashboard from "./components/ShipDashboard";
import ShipDetail from "./components/ShipDetail";
import ShipCatalog from "./components/ShipCatalog";
import Shipyards from "./components/Shipyards";
import CrewDashboard from "./components/CrewDashboard";
import CrewDetail from "./components/CrewDetail";
import { ShipDashboardProvider } from "./contexts/ShipDashboardContext";
import { CrewDashboardProvider } from "./contexts/CrewDashboardContext";
import { GameStateProvider } from "./_game/contexts/GameStateContext";
import { ShipyardProcurementProvider } from "./_game/contexts/ShipyardProcurementContext";
import ShipyardProcurement from "./_game/components/ShipyardProcurement";

// Create context
export const DashboardContext = createContext();

function App() {
  const [shipState, setShipState] = useState({ ships: [], shipCount: 50, sortModeFromApp: "count" }); // Add sortMethod
  const [crewState, setCrewState] = useState({ crew: [], crewCount: 50 });

  return (
    <GameStateProvider>
      <DashboardContext.Provider value={{ shipState, setShipState, crewState, setCrewState }}>
        <Router>
          <header>
            {/* <h1>Shipyard</h1> */}
            {/* <p>Generate ships and manage crew members.</p> */}
            <nav>
              <NavLink to="/ships/dashboard" className={({ isActive }) => (isActive ? "button-link disabled" : "button-link")}>
                Ship Dashboard
              </NavLink>
              <NavLink to="/crew" className={({ isActive }) => (isActive ? "button-link disabled" : "button-link")}>
                Crew Dashboard
              </NavLink>
              <NavLink to="/ships/catalog" className={({ isActive }) => (isActive ? "button-link disabled" : "button-link")}>
                Ship Catalog
              </NavLink>
              <NavLink to="/shipyards" className={({ isActive }) => (isActive ? "button-link disabled" : "button-link")}>
                Shipyards
              </NavLink>
              <NavLink to="/procurement" className={({ isActive }) => (isActive ? "button-link disabled" : "button-link")}>
                Procurement
              </NavLink>
            </nav>
          </header>
          <main>
            <Routes>
              <Route
                path="/ships/dashboard"
                element={
                  <ShipDashboardProvider>
                    <ShipDashboard />
                  </ShipDashboardProvider>
                }
              />
              <Route path="/ships/catalog" element={<ShipCatalog />} />
              <Route path="/shipyards" element={<Shipyards />} />
              <Route path="/ships/:shipId" element={<ShipDetail />} />
              <Route
                path="/crew"
                element={
                  <CrewDashboardProvider>
                    <CrewDashboard />
                  </CrewDashboardProvider>
                }
              />
              <Route path="/crew/:crewId" element={<CrewDetail />} />
              <Route
                path="/procurement"
                element={
                  <ShipyardProcurementProvider>
                    <ShipyardProcurement />
                  </ShipyardProcurementProvider>
                }
              />
              <Route path="/" element={<Navigate to="/procurement" replace />} />
            </Routes>
          </main>
        </Router>
      </DashboardContext.Provider>
    </GameStateProvider>
  );
}

export default App;
