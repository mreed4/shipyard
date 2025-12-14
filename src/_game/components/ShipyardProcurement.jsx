import { useState } from "react";
import { useShipyardProcurement } from "../contexts/ShipyardProcurementContext";
import { SHIPYARDS } from "../systems/shipyardProcurement";
import { Coins, Trash2, ShoppingCart, RotateCcw } from "lucide-react";
import { getShipIcon } from "./icons/ShipIcons";
import "./ShipyardProcurement.css";

// Relationship Progress Bar Component
function RelationshipProgressBar({ shipyard, relationship }) {
  const { trust = 0, tier = "New Vendor" } = relationship || {};

  return (
    <div className="relationship-display">
      <div className="relationship-tier">{tier}</div>
      <div className="relationship-progress">
        <div className="progress-bar">
          <div className="progress-fill" style={{ width: `${trust}%` }}></div>
        </div>
        <div className="progress-text">{trust}/100</div>
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
  const hasRelationshipBonus = relationshipTrust >= 50;

  const ShipIcon = getShipIcon(ship.type);

  return (
    <div className="ship-procurement-card">
      <div className="ship-card-header">
        <ShipIcon size={16} />
        <h4>{ship.name}</h4>
        <span className="ship-type-badge">{ship.type}</span>
      </div>

      <div className="ship-stats-preview">
        <div className="stat-row">
          <span className="stat-label">HP:</span>
          <span className="stat-calculation">
            {ship.__gameData.baseHitPoints}
            {(isSpecialty || hasRelationshipBonus) && (
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
            {ship.__gameData.baseDamageOutput}
            {(isSpecialty || hasRelationshipBonus) && (
              <>
                <span className="arrow"> → </span>
                <span className="stat-final">{finalStats.finalDMG}</span>
              </>
            )}
          </span>
        </div>
      </div>

      {(isSpecialty || hasRelationshipBonus) && (
        <div className="bonus-badges">
          {isSpecialty && <div className="bonus-badge specialty">Specialty: +{(finalStats.specialtyBonus * 100).toFixed(0)}%</div>}
          {hasRelationshipBonus && (
            <div className="bonus-badge relationship">Relationship: +{(finalStats.relationshipBonus * 100).toFixed(0)}%</div>
          )}
        </div>
      )}

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

  console.log(`Shipyard ${shipyard} specialties:`, specialties, "from", shipyardSpecialties);

  const handleAddToCart = (ship, shipyardName) => {
    addToCart(ship, shipyardName);
  };

  return (
    <div className="shipyard-vendor">
      <div className="vendor-header">
        <h3>{shipyard}</h3>
        <div className="vendor-specialties">Specialties: {specialties.join(", ")}</div>
        <RelationshipProgressBar shipyard={shipyard} relationship={relationship} />
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
  const { cart, removeFromCart, clearCart, getOrderSummary } = useShipyardProcurement();
  const [showConfirmation, setShowConfirmation] = useState(false);

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
            {cart.map((item) => {
              const ShipIcon = getShipIcon(item.ship.type);
              return (
                <div key={item.id} className="cart-item">
                  <div className="cart-item-info">
                    <ShipIcon size={14} />
                    <div className="cart-item-details">
                      <div className="cart-item-name">{item.ship.name}</div>
                      <div className="cart-item-meta">
                        {item.ship.type} • {item.shipyardName}
                      </div>
                    </div>
                  </div>
                  <div className="cart-item-actions">
                    <span className="cart-item-cost">{item.cost.toLocaleString()} CR</span>
                    <button className="remove-btn" onClick={() => removeFromCart(item.id)} title="Remove from cart">
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
              );
            })}
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
            <button className="review-order-btn" onClick={() => setShowConfirmation(true)}>
              Review Order
            </button>
          </div>
        </>
      ) : (
        <div className="cart-empty">
          <p>Your cart is empty. Select ships from the vendors below to begin your procurement order.</p>
        </div>
      )}

      {showConfirmation && (
        <OrderConfirmationDialog onClose={() => setShowConfirmation(false)} onConfirm={() => setShowConfirmation(false)} />
      )}
    </div>
  );
}

// Order Confirmation Dialog Component
function OrderConfirmationDialog({ onClose, onConfirm }) {
  const { cart, getOrderSummary, fulfillOrder, relationships, shipyardSpecialties, calculateFinalStats } = useShipyardProcurement();
  const { subtotal, discount, total, discountPercent } = getOrderSummary();

  const handleConfirm = () => {
    const success = fulfillOrder();
    if (success) {
      onConfirm();
    }
  };

  // Calculate relationship gains preview
  const relationshipGains = {};
  cart.forEach((item) => {
    const shipyard = item.shipyardName;
    const isSpecialty = shipyardSpecialties[shipyard]?.includes(item.ship.type);
    const trustGain = isSpecialty ? 5 : 3;

    if (!relationshipGains[shipyard]) {
      relationshipGains[shipyard] = 0;
    }
    relationshipGains[shipyard] += trustGain;
  });

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-dialog" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Confirm Procurement Order</h2>
        </div>

        <div className="modal-body">
          <div className="order-ships-list">
            {cart.map((item) => {
              const relationshipTrust = relationships[item.shipyardName]?.trust || 0;
              const finalStats = calculateFinalStats(item.ship, item.shipyardName, shipyardSpecialties, relationshipTrust);

              return (
                <div key={item.id} className="order-ship-item">
                  <div className="order-ship-name">
                    {item.ship.name} ({item.ship.type})
                  </div>
                  <div className="order-ship-stats">
                    Final: {finalStats.finalHP.toLocaleString()} HP / {finalStats.finalDMG.toLocaleString()} DMG
                  </div>
                  <div className="order-ship-cost">{item.cost.toLocaleString()} CR</div>
                </div>
              );
            })}
          </div>

          <div className="order-summary">
            <div className="summary-line">
              <span>Subtotal:</span>
              <span>{subtotal.toLocaleString()} CR</span>
            </div>
            {discountPercent > 0 && (
              <div className="summary-line discount">
                <span>Bulk Discount (-{discountPercent}%):</span>
                <span>-{discount.toLocaleString()} CR</span>
              </div>
            )}
            <div className="summary-line total">
              <span>Total Cost:</span>
              <span>{total.toLocaleString()} CR</span>
            </div>
          </div>

          <div className="relationship-gains-preview">
            <h4>Relationship Gains:</h4>
            {Object.entries(relationshipGains).map(([shipyard, gain]) => (
              <div key={shipyard} className="gain-line">
                {shipyard}: +{gain} Trust
              </div>
            ))}
          </div>
        </div>

        <div className="modal-footer">
          <button className="cancel-btn" onClick={onClose}>
            Cancel
          </button>
          <button className="confirm-btn" onClick={handleConfirm}>
            Confirm Order
          </button>
        </div>
      </div>
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
            {DEV_MODE && <span className="dev-mode-badge">[DEV MODE]</span>}
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
