
import { useEffect, useState } from "react";
import api from "../../eServices/api";

function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchOrders = async () => {
    try {
      const res = await api.get("/orders/admin/all");
      setOrders(res.data.orders || []);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  const handleRemoveOrder = async (orderId) => {
  const confirmed = window.confirm(
    "Are you sure you want to remove this order?"
  );

  if (!confirmed) return;

  try {
    await api.delete(`/orders/${orderId}`);

    setOrders((previousOrders) =>
      previousOrders.filter((order) => order._id !== orderId)
    );

    alert("Order removed successfully.");
  } catch (error) {
    console.error(error);
    alert("Failed to remove order.");
  }
};
 useEffect(() => {
  const loadOrders = async () => {
    await fetchOrders();
  };

  loadOrders();
}, []);
  if (loading) {
    return <p className="text-lg">Loading orders...</p>;
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">
        Customer Orders
      </h1>

      {orders.length === 0 ? (
        <p className="bg-white p-6 rounded-xl shadow">
          No orders found.
        </p>
      ) : (
        <div className="space-y-5">
          {orders.map((order) => (
            <div
              key={order._id}
              className="bg-white p-6 rounded-xl shadow"
            >
              <div className="flex flex-wrap justify-between gap-3 mb-4">
                <div>
                  <p className="font-bold">
                    Order ID: {order._id}
                  </p>
                  <p className="text-gray-600">
                    Customer: {order.userId?.name || "Unknown"}
                  </p>
                  <p className="text-gray-600">
                    Email: {order.userId?.email || "Not available"}
                  </p>
                  
                  <p className="text-gray-600">
                    Mobile: {order.phoneNumber || "Not available"}
                  </p>

                </div>

                <div>
                  <p className="font-semibold">
                    Status: {order.orderStatus}
                  </p>
                  <p className="text-gray-600">
                    {new Date(order.createdAt).toLocaleString()}
                  </p>
                </div>
              </div>

              <p className="font-semibold mb-2">Products</p>

              <ul className="list-disc pl-6 mb-4">
                {order.products.map((item, index) => (
                  <li key={item._id || index}>
                    {item.productId?.name || "Product unavailable"}
                    {" — Qty: "}
                    {item.quantity}
                  </li>
                ))}
              </ul>

              <p>
                <strong>Total:</strong> ₹{order.totalAmount}
              </p>
              <button
                onClick={() => handleRemoveOrder(order._id)}
                className="mt-4 rounded-lg bg-red-600 px-4 py-2 text-white hover:bg-red-700"
              >
                Remove Order
              </button>
              <p>
                <strong>Payment:</strong> {order.paymentMethod}
              </p>

              <p>
                <strong>Shipping Address:</strong>{" "}
                {order.shippingAddress}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default AdminOrders;
