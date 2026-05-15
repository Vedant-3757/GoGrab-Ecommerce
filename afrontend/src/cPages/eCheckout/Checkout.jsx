import { useContext, useState } from "react";

import { useNavigate } from "react-router-dom";

import toast from "react-hot-toast";

import CartContext from "../../fContext/aCartContext.jsx";

import { saveOrder } from "../../hUtils/OrderService.js";

function Checkout() {

  const navigate = useNavigate();

  const cartContext = useContext(CartContext);

  const cartItems = cartContext?.cartItems ?? [];

  const removeItem = cartContext?.removeItem;

  const [form, setForm] = useState({
    name: "",
    address: "",
    phone: "",
  });

  const totalPrice = cartItems.reduce(
    (total, item) =>
      total + item.price * item.quantity,
    0
  );

  const handleChange = (e) => {

    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });

  };

  const handleOrder = () => {

    if (cartItems.length === 0) {
      toast.error("Cart is empty");
      return;
    }

    if (
      !form.name ||
      !form.address ||
      !form.phone
    ) {
      toast.error("Please fill all details");
      return;
    }

    const newOrder = {
      id: Date.now(),
      customer: form,
      items: cartItems,
      total: totalPrice,
      status: "Packed",
      createdAt: new Date().toISOString(),
    };

    saveOrder(newOrder);

    cartItems.forEach((item) => {
      removeItem?.(item.id);
    });

    toast.success("Order placed successfully!");

    navigate("/activities");
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">

      <div className="max-w-5xl mx-auto">

        <h1 className="text-4xl font-bold mb-8">
          Checkout
        </h1>

        {/* FORM */}
        <div className="bg-white p-6 rounded-3xl shadow-md space-y-4">

          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={form.name}
            onChange={handleChange}
            className="w-full border p-4 rounded-xl outline-none"
          />

          <input
            type="text"
            name="address"
            placeholder="Address"
            value={form.address}
            onChange={handleChange}
            className="w-full border p-4 rounded-xl outline-none"
          />

          <input
            type="text"
            name="phone"
            placeholder="Phone Number"
            value={form.phone}
            onChange={handleChange}
            className="w-full border p-4 rounded-xl outline-none"
          />

        </div>

        {/* ORDER SUMMARY */}
        <div className="bg-white p-6 rounded-3xl shadow-md mt-6">

          <h2 className="text-3xl font-bold mb-6">
            Order Summary
          </h2>

          <div className="space-y-4">

            {cartItems.map((item) => (

              <div
                key={item.id}
                className="flex justify-between border-b pb-3"
              >

                <div>
                  <h3 className="font-semibold">
                    {item.name}
                  </h3>

                  <p className="text-gray-500 text-sm">
                    Qty: {item.quantity}
                  </p>
                </div>

                <p className="font-semibold">
                  ₹ {item.price * item.quantity}
                </p>

              </div>

            ))}

          </div>

          <div className="mt-8 flex justify-between items-center">

            <h3 className="text-2xl font-bold">
              Total
            </h3>

            <h3 className="text-2xl font-bold">
              ₹ {totalPrice}
            </h3>

          </div>

          <button
            onClick={handleOrder}
            className="bg-black text-white w-full py-4 rounded-2xl mt-8 hover:bg-gray-800 transition"
          >
            Place Order
          </button>

        </div>

      </div>

    </div>
  );
}

export default Checkout;