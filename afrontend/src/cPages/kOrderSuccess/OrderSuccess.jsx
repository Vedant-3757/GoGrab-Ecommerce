import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import OrderContext from "../../fContext/hOrderContext.jsx";

function OrderSuccess() {
  const navigate = useNavigate();

  const orders = useContext(OrderContext)?.orders || [];

  const order = orders.length > 0 ? orders[0] : null;

  if (!order) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        No order found
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 px-6">

      <div className="bg-white p-8 rounded-2xl shadow-md w-full max-w-xl">

        <h1 className="text-3xl font-bold text-green-600 mb-4">
          Order Placed Successfully 🎉
        </h1>

        <p><b>Order ID:</b> {order.id}</p>
        <p><b>Total:</b> ₹ {order.total}</p>
        <p><b>Status:</b> {order.status}</p>

        <div className="mt-4">
          <b>Items:</b>

          {order.items?.map((item) => (
            <div
              key={item.id}
              className="text-sm text-gray-600"
            >
              • {item.name} × {item.quantity}
            </div>
          ))}
        </div>

        <button
          onClick={() => navigate("/activities")}
          className="mt-6 w-full bg-black text-white py-3 rounded-xl"
        >
          Track Order
        </button>

      </div>

    </div>
  );
}

export default OrderSuccess;