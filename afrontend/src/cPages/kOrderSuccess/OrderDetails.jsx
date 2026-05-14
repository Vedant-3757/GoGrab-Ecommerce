import { useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import OrderContext from "../../fContext/hOrderContext.jsx";

function OrderDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const { orders } = useContext(OrderContext);

  const order = orders.find(
    (o) => String(o.id) === String(id)
  );

  if (!order) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <h1 className="text-2xl font-bold mb-4">
          Order Not Found
        </h1>

        <button
          onClick={() => navigate("/activities")}
          className="bg-black text-white px-4 py-2 rounded-xl"
        >
          Back
        </button>
      </div>
    );
  }

  const steps = [
    "Packed",
    "Shipped",
    "Out for Delivery",
    "Delivered",
  ];

  const currentStep = steps.indexOf(order.status);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-3xl shadow-md">

        <h1 className="text-4xl font-bold mb-6">
          Order Tracking
        </h1>

        {/* ORDER INFO */}
        <div className="mb-6 space-y-2">
          <p><b>Order ID:</b> {order.id}</p>
          <p><b>Total:</b> ₹ {order.total}</p>
          <p><b>Status:</b> {order.status}</p>
        </div>

        {/* TRACKING BAR */}
        <div className="flex justify-between mb-8">
          {steps.map((step, index) => (
            <div
              key={step}
              className={`text-sm font-semibold ${
                index <= currentStep
                  ? "text-green-600"
                  : "text-gray-400"
              }`}
            >
              {step}
            </div>
          ))}
        </div>

        {/* ITEMS */}
        <div className="space-y-4">
          {order.items.map((item) => (
            <div
              key={item.id}
              className="flex gap-4 border-b pb-4"
            >
              <img
                src={item.image}
                className="w-20 h-20 object-cover rounded-xl"
              />

              <div>
                <h3 className="font-semibold">
                  {item.name}
                </h3>

                <p>Qty: {item.quantity}</p>
                <p>₹ {item.price}</p>
              </div>
            </div>
          ))}
        </div>

        <button
          onClick={() => navigate("/activities")}
          className="mt-8 w-full bg-black text-white py-3 rounded-xl"
        >
          Back
        </button>

      </div>
    </div>
  );
}

export default OrderDetails;