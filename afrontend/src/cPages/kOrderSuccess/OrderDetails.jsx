import {
  useParams,
  useNavigate,
} from "react-router-dom";

import { useEffect, useState } from "react";

import api from "../../eServices/api";

import { motion } from "framer-motion";

function OrderDetails() {

  const { id } = useParams();

  const navigate = useNavigate();

  const [order, setOrder] = useState(null);

  useEffect(() => {

    const fetchOrder = async () => {

      try {

        const res = await api.get(`/orders/${id}`);

        setOrder(res.data);

      } catch (err) {

        console.log(err);

      }

    };

    fetchOrder();

  }, [id]);

  if (!order) {

    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading...
      </div>
    );

  }

  const steps = [
    "Packed",
    "Shipped",
    "Out for Delivery",
    "Delivered",
  ];

  const currentStep =
    steps.indexOf(order.status);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{
        duration: 0.3,
      }}
      className="min-h-screen bg-gray-100 px-4 sm:px-6 py-8"
    >

      <div className="max-w-5xl mx-auto bg-white rounded-3xl shadow-md p-6 sm:p-8">

        <h1 className="text-3xl sm:text-4xl font-bold mb-8">
          Order Tracking
        </h1>

        <div className="space-y-3 mb-10">

          <p className="break-all">
            <b>Order ID:</b>{" "}
            {order._id}
          </p>

          <p>
            <b>Total:</b>{" "}
            ₹ {order.total}
          </p>

          <p>
            <b>Status:</b>{" "}
            {order.status || "Processing"}
          </p>

          <p>
            <b>Ordered On:</b>{" "}
            {order.createdAt
              ? new Date(order.createdAt).toLocaleDateString()
              : "N/A"}
          </p>

        </div>

        <div className="overflow-x-auto pb-4 mb-10">

          <div className="flex min-w-[600px] justify-between gap-6">

            {steps.map((step, index) => (

              <div
                key={step}
                className="flex flex-col items-center flex-1"
              >

                <div
                  className={`w-12 h-12 rounded-full flex items-center justify-center text-white font-bold ${
                    index <= currentStep
                      ? "bg-green-500"
                      : "bg-gray-300"
                  }`}
                >
                  {index + 1}
                </div>

                <p
                  className={`mt-3 text-sm font-semibold text-center ${
                    index <= currentStep
                      ? "text-green-600"
                      : "text-gray-400"
                  }`}
                >
                  {step}
                </p>

              </div>

            ))}

          </div>

        </div>

        <div className="space-y-5">

          {(order.items || []).map((item) => (

            <motion.div
              whileHover={{ y: -2 }}
              key={item._id}
              className="border rounded-3xl p-4 sm:p-5 flex flex-col sm:flex-row gap-5 sm:items-center"
            >

              <img
                src={item.images?.[0]}
                alt={item.name}
                className="w-full sm:w-28 h-52 sm:h-28 object-cover rounded-2xl"
              />

              <div className="flex-1">

                <h3 className="text-xl font-bold mb-2">
                  {item.name}
                </h3>

                <p className="text-gray-500">
                  Quantity: {item.quantity}
                </p>

                <p className="text-gray-500">
                  Price: ₹ {item.price}
                </p>

              </div>

            </motion.div>

          ))}

        </div>

        <button
          onClick={() =>
            navigate("/activities")
          }
          className="mt-10 w-full bg-black text-white py-4 rounded-2xl hover:bg-gray-800 transition"
        >
          Back To Activities
        </button>

      </div>

    </motion.div>
  );
}

export default OrderDetails;