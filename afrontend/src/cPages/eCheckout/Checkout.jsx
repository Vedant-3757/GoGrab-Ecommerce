import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import CartContext from "../../fContext/aCartContext.jsx";

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

    if (cartItems.length === 0) {
      toast.error("Cart is empty");
      return;
    }

    if (!form.name || !form.address || !form.phone) {
      toast.error("Please fill all details");
      return;
    }

    toast.success("Order placed successfully!");

    // SAFE CART CLEAR (uses only what exists)
    cartItems.forEach((item) => {
      removeItem?.(item.id);
    });

    navigate("/order-success");
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">

      <div className="max-w-5xl mx-auto">

        <h1 className="text-3xl font-bold mb-8">
          Checkout
        </h1>

        {/* FORM */}
        <div className="bg-white p-6 rounded-2xl shadow-md space-y-4">

          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={form.name}
            onChange={handleChange}
            className="w-full border p-3 rounded-lg"
          />

          <input
            type="text"
            name="address"
            placeholder="Address"
            value={form.address}
            onChange={handleChange}
            className="w-full border p-3 rounded-lg"
          />

          <input
            type="text"
            name="phone"
            placeholder="Phone Number"
            value={form.phone}
            onChange={handleChange}
            className="w-full border p-3 rounded-lg"
          />

        </div>

        {/* ORDER SUMMARY */}
        <div className="bg-white p-6 rounded-2xl shadow-md mt-6">

          <h2 className="text-2xl font-bold mb-4">
            Order Summary
          </h2>

          {cartItems.map((item) => (
            <div key={item.id} className="flex justify-between py-2">
              <span>{item.name} x {item.quantity}</span>
              <span>₹ {item.price * item.quantity}</span>
            </div>
          ))}

          <hr className="my-4" />

          <h3 className="text-xl font-bold">
            Total: ₹ {totalPrice}
          </h3>

          <button
            onClick={handleOrder}
            className="bg-black text-white px-6 py-3 rounded-xl mt-5 w-full hover:bg-gray-800"
          >
            Place Order
          </button>

        </div>

      </div>

    </div>
  );
}

export default Checkout;