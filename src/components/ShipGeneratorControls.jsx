import { useShipDashboard } from "../contexts/ShipDashboardContext";

export default function ShipGeneratorControls() {
  const { shipCount, setShipCount, generateShips } = useShipDashboard();

  return (
    <fieldset>
      <legend>Shipgen</legend>
      <input
        type="number"
        value={shipCount}
        onChange={(e) => setShipCount(e.target.value)}
        min="1"
        max="50"
        title="Enter the number of shipgen to generate (1-50)"
      />
      <button type="button" onClick={generateShips}>
        GEN
      </button>
    </fieldset>
  );
}
