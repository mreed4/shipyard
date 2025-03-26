import React from "react";
import "./styles.css";
import ShipDashboard from "./components/ShipDashboard";
import CrewDashboard from "./components/CrewDashboard";

function App() {
  return (
    <div id="root">
      <header>
        <h1>Shipyard</h1>
        <p>Generate ships and manage crew members.</p>
      </header>
      <main>
        <ShipDashboard />
        <CrewDashboard />
      </main>
    </div>
  );
}

export default App;
