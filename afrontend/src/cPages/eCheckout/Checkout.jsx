import { useContext, useState } from "react";

import { useNavigate } from "react-router-dom";

import toast from "react-hot-toast";

import CartContext from "../../fContext/aCartContext.jsx";

import { saveOrder } from "../../hUtils/OrderService.js";

function Checkout() {

  const navigate = useNavigate();

  const cartContext =
    useContext(CartContext);

  const cartItems =
    cartContext?.cartItems ?? [];

  const removeItem =
    cartContext?.removeItem;

  const [loading, setLoading] =
    useState(false);

  const [form, setForm] =
    useState({
      name: "",
      address: "",
      phone: "",
      payment: "Cash On Delivery",
    });

  const totalPrice =
    cartItems.reduce(
      (total, item) =>
        total +
        item.price * item.quantity,
      0
    );

  const handleChange = (e) => {

    setForm({
      ...form,
      [e.target.name]:
        e.target.value,
    });

  };

  const handleOrder = async () => {

    if (cartItems.length === 0) {
      toast.error("Cart is empty");
      return;
    }

    if (
      !form.name ||
      !form.address ||
      !form.phone
    ) {
      toast.error(
        "Please fill all details"
      );
      return;
    }

    setLoading(true);

    const order = {
      id: Date.now(),
      items: cartItems,
      total: totalPrice,
      status: "Packed",
      createdAt:
        new Date().toISOString(),
      customer: form,
    };

    saveOrder(order);

    setTimeout(() => {

      cartItems.forEach((item) => {
        removeItem?.(item.id);
      });

      toast.success(
        "Order placed successfully!"
      );

      navigate("/order-success");

    }, 1200);

  };

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4 sm:px-6">

      <div className="max-w-7xl mx-auto">

        <h1 className="text-4xl font-bold mb-10">
          Checkout
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* LEFT */}
          <div className="lg:col-span-2 space-y-8">

            {/* SHIPPING */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-md">

              <h2 className="text-2xl font-bold mb-6">
                Shipping Details
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

                <textarea
                  name="address"
                  placeholder="Full Address"
                  value={form.address}
                  onChange={handleChange}
                  rows="4"
                  className="w-full border border-gray-300 p-4 rounded-2xl outline-none focus:border-black resize-none"
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

            {/* PAYMENT */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-md">

              <h2 className="text-2xl font-bold mb-6">
                Payment Method
              </h2>

              <div className="space-y-4">

                <label className="flex items-center gap-3 border rounded-2xl p-4 cursor-pointer">

                  <input
                    type="radio"
                    name="payment"
                    value="Cash On Delivery"
                    checked={
                      form.payment ===
                      "Cash On Delivery"
                    }
                    onChange={handleChange}
                  />

                  <span>
                    Cash On Delivery
                  </span>

                </label>

                <label className="flex items-center gap-3 border rounded-2xl p-4 cursor-pointer opacity-60">

                  <input
                    type="radio"
                    disabled
                  />

                  <span>
                    UPI / Card Payments
                    (Coming Soon)
                  </span>

                </label>

              </div>

            </div>

          </div>

          {/* RIGHT */}
          <div>

            <div className="bg-white rounded-3xl p-6 shadow-md sticky top-24">

              <h2 className="text-2xl font-bold mb-6">
                Order Summary
              </h2>

              <div className="space-y-5 max-h-[350px] overflow-y-auto pr-2">

                {cartItems.map((item) => (

                  <div
                    key={item.id}
                    className="flex gap-4"
                  >

                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-20 h-20 rounded-2xl object-cover"
                    />

                    <div className="flex-1">

                      <h3 className="font-semibold line-clamp-1">
                        {item.name}
                      </h3>

                      <p className="text-gray-500 text-sm mt-1">
                        Qty:
                        {" "}
                        {item.quantity}
                      </p>

                      <p className="font-bold mt-2">
                        ₹
                        {" "}
                        {item.price * item.quantity}
                      </p>

                    </div>

                  </div>

                ))}

              </div>

              <hr className="my-6" />

              <div className="space-y-3">

                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span>
                    ₹ {totalPrice}
                  </span>
                </div>

                <div className="flex justify-between text-gray-600">
                  <span>Delivery</span>
                  <span>
                    Free
                  </span>
                </div>

                <div className="flex justify-between text-2xl font-bold pt-4">
                  <span>Total</span>
                  <span>
                    ₹ {totalPrice}
                  </span>
                </div>

              </div>

              <button
                onClick={handleOrder}
                disabled={loading}
                className="w-full mt-8 bg-black text-white py-4 rounded-2xl font-semibold hover:bg-gray-800 transition disabled:opacity-60"
              >

                {loading
                  ? "Placing Order..."
                  : "Place Order"}

              </button>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Checkout;