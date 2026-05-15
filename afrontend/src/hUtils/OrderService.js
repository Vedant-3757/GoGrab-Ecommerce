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

  localStorage.setItem(
    "gograb-orders",
    JSON.stringify(updated)
  );

  return updated;
};

export const getOrderById = (id) => {
  const orders = getOrders();

  return orders.find(
    (order) =>
      String(order.id) === String(id)
  );
};