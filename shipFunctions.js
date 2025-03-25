import { massProduceShips } from "./functions/massProduceShips.js";
import { getElementById, updateInnerHTML } from "./script.js";

export function buildShipStats(ships) {
  const totalShips = ships.length;

  // Count ships by type based on ship.name
  const shipTypeCounts = ships.reduce((counts, ship) => {
    const type = ship.shipClass.name.split(" ")[0]; // Assuming the type is the first word in the name
    counts[type] = (counts[type] || 0) + 1;
    return counts;
  }, {});

  // Sort ship types by count in descending order
  const sortedTypeStats = Object.entries(shipTypeCounts).sort((a, b) => b[1] - a[1]);

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

  const statsHtml = `
    <li>Total Ships: ${totalShips}</li>
    ${typeStats}
  `;

  const shipDashboard = getElementById("ship-dashboard");
  if (shipDashboard) {
    shipDashboard.innerHTML = statsHtml;
  }
}

export function generateShips() {
  const shipCount = parseInt(getElementById("ship-count-input").value) || 20; // Default to 20 if input is invalid
  const ships = massProduceShips(shipCount);
  const shipsList = `<ol>${ships.map((ship) => `<li>${ship.getShipId()}</li>`).join("")}</ol>`;

  console.log(ships);

  updateInnerHTML("data-list", shipsList);
  buildShipStats(ships);
}
