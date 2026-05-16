import { useContext, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import toast from "react-hot-toast";
import { motion } from "framer-motion";

import CartContext from "../../fContext/aCartContext.jsx";
import { saveOrder } from "../../hUtils/OrderService.js";

function Checkout() {
  const navigate = useNavigate();
  const location = useLocation();

  const cartContext = useContext(CartContext);
  const cartItems = cartContext?.cartItems ?? [];
  const removeItem = cartContext?.removeItem;

  const buyNowProduct = location.state?.buyNowProduct;

  const [form, setForm] = useState({
    name: "",
    address: "",
    phone: "",
  });

  const itemsToCheckout =
    buyNowProduct ? [buyNowProduct] : cartItems;

  const totalPrice = itemsToCheckout.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleOrder = () => {
    if (itemsToCheckout.length === 0) {
      toast.error("Cart is empty");
      return;
    }

    if (!form.name || !form.address || !form.phone) {
      toast.error("Please fill all details");
      return;
    }

    const order = {
      id: Date.now(),
      items: itemsToCheckout,
      total: totalPrice,
      customer: form,
      status: "Packed",
      createdAt: new Date().toISOString(),
    };

    saveOrder(order);

    toast.success("Order placed successfully!");

    if (!buyNowProduct) {
      cartItems.forEach((item) => removeItem?.(item.id));
    }

    navigate("/order-success");
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="min-h-screen bg-gray-100 px-4 sm:px-6 py-8"
    >
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl sm:text-4xl font-bold mb-8">
          Checkout
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

          {/* FORM */}
          <div className="bg-white rounded-3xl shadow-md p-6 sm:p-8">
            <h2 className="text-2xl font-bold mb-6">
              Delivery Details
            </h2>

            <div className="space-y-5">
              <input
                type="text"
                name="name"
                placeholder="Full Name"
                value={form.name}
                onChange={handleChange}
                className="w-full border border-gray-300 p-4 rounded-2xl outline-none focus:border-black"
              />

              <input
                type="text"
                name="address"
                placeholder="Address"
                value={form.address}
                onChange={handleChange}
                className="w-full border border-gray-300 p-4 rounded-2xl outline-none focus:border-black"
              />

              <input
                type="text"
                name="phone"
                placeholder="Phone Number"
                value={form.phone}
                onChange={handleChange}
                className="w-full border border-gray-300 p-4 rounded-2xl outline-none focus:border-black"
              />
            </div>
          </div>

          {/* SUMMARY */}
          <div className="bg-white rounded-3xl shadow-md p-6 sm:p-8 h-fit">
            <h2 className="text-2xl font-bold mb-6">
              Order Summary
            </h2>

            <div className="space-y-4">
              {itemsToCheckout.map((item) => (
                <div
                  key={item.id}
                  className="flex justify-between items-center gap-4 border-b pb-4"
                >
                  <div>
                    <h3 className="font-semibold">
                      {item.name}
                    </h3>
                    <p className="text-sm text-gray-500">
                      Qty: {item.quantity}
                    </p>
                  </div>

                  <p className="font-semibold whitespace-nowrap">
                    ₹ {item.price * item.quantity}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-8">
              <div className="flex justify-between text-2xl font-bold mb-6">
                <span>Total</span>
                <span>₹ {totalPrice}</span>
              </div>

              <motion.button
                whileTap={{ scale: 0.97 }}
                whileHover={{ scale: 1.01 }}
                onClick={handleOrder}
                className="w-full bg-black text-white py-4 rounded-2xl hover:bg-gray-800 transition"
              >
                Place Order
              </motion.button>
            </div>
          </div>

        </div>
      </div>
    </motion.div>
  );
}

export default Checkout;