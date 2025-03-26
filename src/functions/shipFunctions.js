import { massProduceShips } from "./functions/massProduceShips.js";
import { getElementById, updateInnerHTML } from "./script.js";

export function buildShipStats(ships) {
  const totalShips = ships.length;

  // Count ships by type based on ship.name
  const shipTypeCounts = ships.reduce((counts, ship) => {
    const type = ship.shipClass.name.split(" ")[0]; // Assuming the type is the first word in the name
    counts[type] = (counts[type] || 0) + 1; // Increment the count for the type
    return counts;
  }, {});

  // Sort ship types by count in descending order
  const sortedTypeStats = Object.entries(shipTypeCounts).sort((a, b) => b[1] - a[1]);

  // Generate type stats HTML
  const typeStats = sortedTypeStats
    .map(
      ([type, count]) => `
        <li class="bar-chart-item">
          <span class="ship-name">${type}</span>
          <div class="bar-chart-container">
            <div class="bar-chart-background"></div>
            <div class="bar-chart" style="width: ${(count / totalShips) * 100}%;"></div>
          </div>
          <span>${count < 10 ? "0" + count : count}/${totalShips}</span>
        </li>
      `
    )
    .join("");

  // Combine stats into the final HTML
  const statsHtml = `
    <h3>Ships</h3>
    <div class="ships-dashboard-inner">
      <div class="total-ships">
        <span class="label">Total</span>
        <span class="ships-total-count">${totalShips}</span>
      </div>
      <ul class="ship-dashboard-list">
        ${typeStats}
      </ul>
    </div>
  `;

  // Update the ship dashboard
  const shipDashboard = getElementById("ship-dashboard");
  if (shipDashboard) {
    shipDashboard.innerHTML = statsHtml;
  }
}

export function generateShips() {
  const shipCount = parseInt(getElementById("ship-count-input").value) || 20; // Default to 20 if input is invalid
  const ships = massProduceShips(shipCount);
  const shipsList = `<ol>${ships.map((ship) => `<li>${ship.getShipId()}</li>`).join("")}</ol>`;

  // console.log(ships);

  updateInnerHTML("data-list", shipsList);
  buildShipStats(ships);
}

export function massProduceShips(count) {
  // ...existing logic...
}
