import React, { useState, useEffect } from "react";
import "./styles.css";
import ShipDashboard from "./components/ShipDashboard";

function App() {
  return (
    <>
      <header>
        <h1>Shipyard</h1>
        <p>Generate ships and manage crew members.</p>
      </header>
      <main>
        <ShipDashboard />
      </main>
    </>
  );
}

export default App;
