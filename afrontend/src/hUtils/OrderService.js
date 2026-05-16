export const getOrders = () => {
  try {
    const data = JSON.parse(
      localStorage.getItem("gograb-orders")
    );

    const orders =
      Array.isArray(data) ? data : [];

    // ✅ AUTO STATUS UPDATE
    return orders.map((order) => {

      const createdTime =
        new Date(order.createdAt).getTime();

      const now =
        Date.now();

      const diffHours =
        (now - createdTime) /
        (1000 * 60 * 60);

      let status = "Packed";

      if (diffHours >= 1) {
        status = "Shipped";
      }

      if (diffHours >= 2) {
        status = "Out for Delivery";
      }

      if (diffHours >= 3) {
        status = "Delivered";
      }

      return {
        ...order,
        status,
      };
    });

  } catch {
    return [];
  }
};

export const saveOrder = (order) => {

  const oldOrders = getOrders();

  const updated = [
    order,
    ...oldOrders,
  ];

  try {

    localStorage.setItem(
      "gograb-orders",
      JSON.stringify(updated)
    );

  } catch {
    // ignore storage failures
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