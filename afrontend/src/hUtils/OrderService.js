export const getOrders = () => {
  try {
    const data = JSON.parse(
      localStorage.getItem("gograb-orders")
    );

    return Array.isArray(data) ? data : [];
  } catch {
    return [];
  }
};

export const saveOrder = (order) => {
  const oldOrders = getOrders();

  const updated = [order, ...oldOrders];

  try {
    localStorage.setItem(
      "gograb-orders",
      JSON.stringify(updated)
    );
  } catch {
    // ignore storage failures (private mode / quota issues)
  }

  return updated;
};

export const getOrderById = (id) => {
  const orders = getOrders();

  return orders.find(
    (order) =>
      String(order.id) === String(id)
  );
};