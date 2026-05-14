import { createContext, useState, useCallback } from "react";

const OrderContext = createContext();

export function HOrderProvider({ children }) {

  const [orders, setOrders] = useState(() => {
    try {
      const raw = localStorage.getItem("gograb-orders");
      const parsed = JSON.parse(raw || "[]");
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  });

  // ADD ORDER (SAFE + SYNC LOCALSTORAGE)
  const addOrder = useCallback((order) => {
    setOrders((prev) => {
      const updated = [order, ...prev];
      localStorage.setItem("gograb-orders", JSON.stringify(updated));
      return updated;
    });
  }, []);

  const getLatestOrder = useCallback(() => {
    return orders.length > 0 ? orders[0] : null;
  }, [orders]);

  return (
    <OrderContext.Provider value={{ orders, addOrder, getLatestOrder }}>
      {children}
    </OrderContext.Provider>
  );
}

export default OrderContext;