import { useState } from "react";
import { useShipyardProcurement } from "../contexts/ShipyardProcurementContext";
import { SHIPYARDS } from "../systems/shipyardProcurement";
import { Coins, Trash2, ShoppingCart, RotateCcw } from "lucide-react";
import { getShipIcon } from "./icons/ShipIcons";
import BarChart from "../../components/BarChart";
import "./ShipyardProcurement.css";

// Relationship Progress Bar Component
function RelationshipProgressBar({ shipyard, relationship, cart, shipyardSpecialties }) {
  const { trust = 0, tier = "New Vendor" } = relationship || {};

  // Calculate pending trust gain from cart
  const pendingTrustGain = cart
    .filter((item) => item.shipyardName === shipyard)
    .reduce((total, item) => {
      const baseTrust = 5;
      const specialtyBonus = shipyardSpecialties[shipyard]?.includes(item.ship.type) ? 2 : 0;
      return total + baseTrust + specialtyBonus;
    }, 0);

  const tiers = [
    { name: "New Vendor", min: 0, max: 999 },
    { name: "Trusted", min: 1000, max: 1999 },
    { name: "Preferred", min: 2000, max: 2999 },
    { name: "Elite Vendor", min: 3000, max: 4000 },
  ];

  return (
    <div className="relationship-display">
      <div className="relationship-tier">
        {tier} - {trust} points
        {pendingTrustGain > 0 && <span className="pending-trust"> (+{pendingTrustGain})</span>}
      </div>
      <div className="relationship-progress-multi">
        {tiers.map((tierInfo) => {
          const isActive = trust >= tierInfo.min;
          const isCurrentTier = trust >= tierInfo.min && trust <= tierInfo.max;
          const willBeInTier = trust + pendingTrustGain >= tierInfo.min && trust + pendingTrustGain <= tierInfo.max;

          const currentPoints = isCurrentTier ? trust - tierInfo.min : isActive ? tierInfo.max - tierInfo.min + 1 : 0;
          const maxPoints = tierInfo.max - tierInfo.min + 1;

          // Calculate pending points for this tier
          let pendingPoints = 0;
          if (pendingTrustGain > 0) {
            const newTrust = Math.min(4000, trust + pendingTrustGain);
            if (isCurrentTier) {
              // Current tier: show gain from current position
              const newPoints = Math.min(newTrust, tierInfo.max) - tierInfo.min;
              pendingPoints = newPoints - currentPoints;
            } else if (willBeInTier) {
              // Will move into this tier
              pendingPoints = newTrust - tierInfo.min;
            } else if (newTrust > tierInfo.max && trust < tierInfo.min) {
              // Will pass through this tier completely
              pendingPoints = maxPoints;
            }
          }

          return (
            <div key={tierInfo.name} className={`tier-bar-wrapper ${isActive ? "active" : ""} ${isCurrentTier ? "current" : ""}`}>
              <BarChart
                label={tierInfo.name}
                count={currentPoints}
                total={maxPoints}
                animationKey={`${shipyard}-${tierInfo.name}-${trust}`}
                colorClass={isCurrentTier ? "current-tier" : isActive ? "completed-tier" : ""}
                enableAnimation={false}
                pendingCount={pendingPoints}
                padDigits={4}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}

// Ship Selection Card Component
function ShipCard({ ship, shipyardName, onAddToCart, isCartFull }) {
  const { relationships, shipyardSpecialties, calculateProcurementCost, calculateFinalStats } = useShipyardProcurement();

  const cost = calculateProcurementCost(ship.displacement);
  const relationshipTrust = relationships[shipyardName]?.trust || 0;
  const finalStats = calculateFinalStats(ship, shipyardName, shipyardSpecialties, relationshipTrust);

  const isSpecialty = shipyardSpecialties[shipyardName]?.includes(ship.type);
  const hasAnyBonus = isSpecialty || finalStats.relationshipBonus > 0;

  const ShipIcon = getShipIcon(ship.type);

  return (
    <div className="ship-procurement-card">
      <div className="ship-card-header">
        <h4>{ship.name}</h4>
        <span className="badge ship-type-badge">
          <ShipIcon size={16} />
          {ship.type}
        </span>
      </div>

      <div className="ship-stats-preview">
        <div className="stat-row">
          <span className="stat-label">HP:</span>
          <span className="stat-calculation">
            {ship.baseHitPoints}
            {hasAnyBonus && (
              <>
                <span className="arrow"> → </span>
                <span className="stat-final">{finalStats.finalHP}</span>
              </>
            )}
          </span>
        </div>
        <div className="stat-row">
          <span className="stat-label">DMG:</span>
          <span className="stat-calculation">
            {ship.baseDamageOutput}
            {hasAnyBonus && (
              <>
                <span className="arrow"> → </span>
                <span className="stat-final">{finalStats.finalDMG}</span>
              </>
            )}
          </span>
        </div>
      </div>

      <div className="bonus-badges">
        {isSpecialty ? (
          <div className="badge bonus-badge specialty">Specialty: +{(finalStats.specialtyBonus * 100).toFixed(0)}%</div>
        ) : (
          <div className="badge bonus-badge" style={{ visibility: "hidden" }}>
            Placeholder
          </div>
        )}
        {finalStats.relationshipBonus > 0 ? (
          <div className="badge bonus-badge relationship">Relationship: +{(finalStats.relationshipBonus * 100).toFixed(0)}%</div>
        ) : (
          <div className="badge bonus-badge" style={{ visibility: "hidden" }}>
            Placeholder
          </div>
        )}
      </div>

      <div className="ship-card-footer">
        <span className="ship-cost">
          <Coins size={14} />
          {cost.toLocaleString()} CR
        </span>
        <button className="add-to-cart-btn" onClick={() => onAddToCart(ship, shipyardName)} disabled={isCartFull}>
          <ShoppingCart size={14} />
          Add to Cart
        </button>
      </div>
    </div>
  );
}

// Shipyard Vendor Card Component
function ShipyardVendor({ shipyard }) {
  const { getShipsByManufacturer, relationships, shipyardSpecialties, addToCart, cart } = useShipyardProcurement();

  const ships = getShipsByManufacturer(shipyard);
  const relationship = relationships[shipyard] || { trust: 0, tier: "New Vendor" };
  const specialties = shipyardSpecialties[shipyard] || [];
  const isCartFull = cart.length >= 10;

  const handleAddToCart = (ship, shipyardName) => {
    addToCart(ship, shipyardName);
  };

  return (
    <div className="shipyard-vendor">
      <div className="vendor-header">
        <h3>{shipyard}</h3>
        <div className="vendor-specialties">Specialties: {specialties.join(", ")}</div>
        <RelationshipProgressBar shipyard={shipyard} relationship={relationship} cart={cart} shipyardSpecialties={shipyardSpecialties} />
      </div>

      <div className="vendor-ship-roster">
        {ships.map((ship) => (
          <ShipCard key={ship.name} ship={ship} shipyardName={shipyard} onAddToCart={handleAddToCart} isCartFull={isCartFull} />
        ))}
      </div>
    </div>
  );
}

// Cart Component
function CartSection() {
  const { cart, removeFromCart, clearCart, getOrderSummary, fulfillOrder } = useShipyardProcurement();

  const { subtotal, discount, total, discountPercent } = getOrderSummary();

  return (
    <div className="cart-section">
      <div className="cart-header">
        <h2>
          <ShoppingCart size={20} />
          Procurement Cart
        </h2>
        <div className="cart-count">{cart.length}/10 Ships</div>
      </div>

      {cart.length > 0 ? (
        <>
          <div className="cart-items">
            {(() => {
              // Group cart items by ship name and shipyard
              const groupedItems = {};
              cart.forEach((item) => {
                const key = `${item.ship.name}-${item.shipyardName}`;
                if (!groupedItems[key]) {
                  groupedItems[key] = {
                    ship: item.ship,
                    shipyardName: item.shipyardName,
                    cost: item.cost,
                    items: [],
                  };
                }
                groupedItems[key].items.push(item);
              });

              return Object.values(groupedItems).map((group) => {
                const ShipIcon = getShipIcon(group.ship.type);
                const quantity = group.items.length;
                const totalCost = group.cost * quantity;

                return (
                  <div key={`${group.ship.name}-${group.shipyardName}`} className="cart-item">
                    <div className="cart-item-info">
                      <ShipIcon size={14} />
                      <div className="cart-item-details">
                        <div className="cart-item-name">
                          {group.ship.name} {quantity > 1 && <span className="badge quantity-badge">×{quantity}</span>}
                        </div>
                        <div className="cart-item-meta">
                          {group.ship.type} • {group.shipyardName}
                        </div>
                      </div>
                    </div>
                    <div className="cart-item-actions">
                      <span className="cart-item-cost">{totalCost.toLocaleString()} CR</span>
                      <button
                        className="remove-btn"
                        onClick={() => removeFromCart(group.items[group.items.length - 1].id)}
                        title="Remove one from cart">
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                );
              });
            })()}
          </div>

          <div className="cart-summary">
            <div className="summary-row">
              <span>Subtotal:</span>
              <span>{subtotal.toLocaleString()} CR</span>
            </div>
            {discountPercent > 0 && (
              <div className="summary-row discount">
                <span>Bulk Discount (-{discountPercent}%):</span>
                <span>-{discount.toLocaleString()} CR</span>
              </div>
            )}
            <div className="summary-row total">
              <span>Total:</span>
              <span>{total.toLocaleString()} CR</span>
            </div>
          </div>

          <div className="cart-actions">
            <button className="clear-cart-btn" onClick={clearCart}>
              Clear Cart
            </button>
            <button className="review-order-btn" onClick={fulfillOrder}>
              Fulfill Order
            </button>
          </div>
        </>
      ) : (
        <div className="cart-empty">
          <p>Your cart is empty. Select ships from the vendors below to begin your procurement order.</p>
        </div>
      )}
    </div>
  );
}

// Procurement History Component
function ProcurementHistory() {
  const { procurementHistory } = useShipyardProcurement();

  if (procurementHistory.length === 0) {
    return (
      <div className="history-section">
        <h2>Procurement History</h2>
        <p className="history-empty">No orders yet. Place your first procurement order above.</p>
      </div>
    );
  }

  return (
    <div className="history-section">
      <h2>Procurement History</h2>
      <div className="history-list">
        {procurementHistory.map((entry, index) => (
          <div key={index} className="history-entry">
            <div className="history-header">
              <span className="history-date">{new Date(entry.timestamp).toLocaleString()}</span>
              <span className="history-total">{entry.total.toLocaleString()} CR</span>
            </div>
            <div className="history-ships">
              {entry.ships.map((ship, shipIndex) => (
                <div key={shipIndex} className="history-ship">
                  {ship.name} ({ship.type}) - {ship.manufacturer}
                </div>
              ))}
            </div>
            {entry.discountPercent > 0 && <div className="history-discount">Bulk Discount: -{entry.discountPercent}%</div>}
          </div>
        ))}
      </div>
    </div>
  );
}

// Main Component
export default function ShipyardProcurement() {
  const { credits, DEV_MODE, resetProcurement } = useShipyardProcurement();

  return (
    <div className="shipyard-procurement">
      <div className="procurement-header">
        <h2>Shipyard Procurement</h2>
        <div className="currency-display">
          <div className="currency-item">
            <Coins size={16} />
            <span className="currency-amount">{credits.toLocaleString()} CR</span>
            {DEV_MODE && <span className="badge dev-mode-badge">[DEV MODE]</span>}
          </div>
          {DEV_MODE && (
            <button className="reset-button" onClick={resetProcurement} title="Reset procurement data">
              <RotateCcw size={14} />
              Reset
            </button>
          )}
        </div>
      </div>

      <div className="procurement-grid">
        <div className="vendors-section">
          {SHIPYARDS.map((shipyard) => (
            <ShipyardVendor key={shipyard} shipyard={shipyard} />
          ))}
        </div>

        <div className="sidebar-section">
          <CartSection />
          <ProcurementHistory />
        </div>
      </div>
    </div>
  );
}
