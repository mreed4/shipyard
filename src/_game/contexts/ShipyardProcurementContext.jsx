import { createContext, useContext, useState, useEffect } from "react";
import { shipTypes } from "../../data/shipTypes";
import {
  SHIPYARDS,
  calculateProcurementCost,
  calculateBulkDiscount,
  calculateFinalStats,
  calculateTrustGain,
  getRelationshipTier,
  initializeShipyardSpecialties,
} from "../systems/shipyardProcurement";

// Development mode flag - set to false for production
const DEV_MODE = true;

const ShipyardProcurementContext = createContext();

export const useShipyardProcurement = () => {
  const context = useContext(ShipyardProcurementContext);
  if (!context) {
    throw new Error("useShipyardProcurement must be used within ShipyardProcurementProvider");
  }
  return context;
};

export const ShipyardProcurementProvider = ({ children }) => {
  // Initialize shipyard specialties (persisted in localStorage)
  const [shipyardSpecialties] = useState(() => initializeShipyardSpecialties());

  // Load state from localStorage or initialize
  const [credits, setCredits] = useState(() => {
    const stored = localStorage.getItem("shipyard_procurement_credits");
    return stored ? parseInt(stored, 10) : DEV_MODE ? 999_999_999 : 10_000;
  });

  const [cart, setCart] = useState(() => {
    const stored = localStorage.getItem("shipyard_procurement_cart");
    return stored ? JSON.parse(stored) : [];
  });

  const [relationships, setRelationships] = useState(() => {
    const stored = localStorage.getItem("shipyard_procurement_relationships");
    if (stored) return JSON.parse(stored);

    // Initialize relationships for all shipyards
    const initial = {};
    SHIPYARDS.forEach((shipyard) => {
      initial[shipyard] = { trust: 0, tier: "New Vendor" };
    });
    return initial;
  });

  const [procurementHistory, setProcurementHistory] = useState(() => {
    const stored = localStorage.getItem("shipyard_procurement_history");
    return stored ? JSON.parse(stored) : [];
  });

  // Persist to localStorage whenever state changes
  useEffect(() => {
    localStorage.setItem("shipyard_procurement_credits", credits.toString());
  }, [credits]);

  useEffect(() => {
    localStorage.setItem("shipyard_procurement_cart", JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem("shipyard_procurement_relationships", JSON.stringify(relationships));
  }, [relationships]);

  useEffect(() => {
    localStorage.setItem("shipyard_procurement_history", JSON.stringify(procurementHistory));
  }, [procurementHistory]);

  // Add ship to cart (allows duplicates)
  const addToCart = (ship, shipyardName) => {
    const cartItem = {
      id: `${Date.now()}-${Math.random()}`, // Unique ID for cart item
      ship,
      shipyardName,
      cost: calculateProcurementCost(ship.displacement),
    };

    setCart((prevCart) => [...prevCart, cartItem]);
    return true;
  };

  // Remove specific item from cart by index
  const removeFromCart = (cartItemId) => {
    setCart(cart.filter((item) => item.id !== cartItemId));
  };

  // Clear entire cart
  const clearCart = () => {
    setCart([]);
  };

  // Get ships manufactured by a specific shipyard
  const getShipsByManufacturer = (shipyardName) => {
    return Object.values(shipTypes).filter((ship) => ship.manufacturer === shipyardName);
  };

  // Calculate order summary
  const getOrderSummary = () => {
    if (cart.length === 0) {
      return { subtotal: 0, discount: 0, total: 0, discountPercent: 0 };
    }

    const subtotal = cart.reduce((sum, item) => sum + item.cost, 0);
    const discountPercent = calculateBulkDiscount(cart.length);
    const discount = Math.round(subtotal * (discountPercent / 100));
    const total = subtotal - discount;

    return { subtotal, discount, total, discountPercent };
  };

  // Fulfill order (process payment, update relationships, add to history, clear cart)
  const fulfillOrder = () => {
    if (cart.length === 0) return false;

    const { total } = getOrderSummary();

    // Check if player can afford (skip check in dev mode)
    if (!DEV_MODE && credits < total) {
      return false;
    }

    // Calculate final stats for all ships with bonuses
    const processedShips = cart.map((cartItem) => {
      const relationshipTrust = relationships[cartItem.shipyardName]?.trust || 0;
      const finalStats = calculateFinalStats(cartItem.ship, cartItem.shipyardName, shipyardSpecialties, relationshipTrust);

      return {
        name: cartItem.ship.name,
        type: cartItem.ship.type,
        manufacturer: cartItem.shipyardName,
        cost: cartItem.cost,
        ...finalStats,
      };
    });

    // Update relationships (group by shipyard)
    const relationshipUpdates = {};
    cart.forEach((cartItem) => {
      const shipyardName = cartItem.shipyardName;
      const trustGain = calculateTrustGain(cartItem.ship, shipyardSpecialties[shipyardName] || []);

      if (!relationshipUpdates[shipyardName]) {
        relationshipUpdates[shipyardName] = 0;
      }
      relationshipUpdates[shipyardName] += trustGain;
    });

    const updatedRelationships = { ...relationships };
    Object.entries(relationshipUpdates).forEach(([shipyard, trustGain]) => {
      const currentTrust = updatedRelationships[shipyard].trust;
      const newTrust = Math.min(4000, currentTrust + trustGain);
      updatedRelationships[shipyard] = {
        trust: newTrust,
        tier: getRelationshipTier(newTrust),
      };
    });

    // Create history entry
    const historyEntry = {
      timestamp: Date.now() + 500 * 365.25 * 24 * 60 * 60 * 1000, // 500 years from now
      ships: processedShips,
      ...getOrderSummary(),
      relationshipGains: relationshipUpdates,
    };

    // Update state
    setCredits(999_999_999); // Reset credits to max after order fulfillment
    setRelationships(updatedRelationships);
    setProcurementHistory([historyEntry, ...procurementHistory]);
    clearCart();

    return true;
  };

  // Reset all procurement data (for development/testing)
  const resetProcurement = () => {
    setCredits(DEV_MODE ? 999_999_999 : 10_000);
    setCart([]);

    const freshRelationships = {};
    SHIPYARDS.forEach((shipyard) => {
      freshRelationships[shipyard] = { trust: 0, tier: "New Vendor" };
    });
    setRelationships(freshRelationships);

    setProcurementHistory([]);

    // Clear localStorage
    localStorage.removeItem("shipyard_procurement_credits");
    localStorage.removeItem("shipyard_procurement_cart");
    localStorage.removeItem("shipyard_procurement_relationships");
    localStorage.removeItem("shipyard_procurement_history");
  };

  const value = {
    // State
    credits,
    cart,
    relationships,
    procurementHistory,
    shipyardSpecialties,
    DEV_MODE,

    // Methods
    addToCart,
    removeFromCart,
    clearCart,
    getShipsByManufacturer,
    getOrderSummary,
    fulfillOrder,
    resetProcurement,
    calculateProcurementCost,
    calculateFinalStats,
    getRelationshipTier,
  };

  return <ShipyardProcurementContext.Provider value={value}>{children}</ShipyardProcurementContext.Provider>;
};
