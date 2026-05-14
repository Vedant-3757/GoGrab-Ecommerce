import { useContext, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import toast from "react-hot-toast";

import CartContext from "../../fContext/aCartContext.jsx";
import OrderContext from "../../fContext/hOrderContext.jsx";

function Checkout() {

  const navigate = useNavigate();
  const location = useLocation();

  const { cartItems, clearCart } = useContext(CartContext);
  const { addOrder } = useContext(OrderContext);

  const buyNowProduct = location.state?.buyNowProduct;

  const finalProducts = buyNowProduct
    ? [{ ...buyNowProduct, quantity: 1 }]
    : cartItems;

  const totalPrice = finalProducts.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  // SHIPPING STATE
  const [fullName, setFullName] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [pincode, setPincode] = useState("");

  const handlePlaceOrder = () => {

    if (finalProducts.length === 0) {

      toast.error("Cart is empty");

      return;
    }

    if (!fullName || !address || !city || !pincode) {

      toast.error("Please fill all details");

      return;
    }

    const orderData = {
      id: Date.now(),
      items: finalProducts,
      total: totalPrice,
      status: "Packed",
      createdAt: new Date().toISOString(),

      shipping: {
        fullName,
        address,
        city,
        pincode,
      },
    };

    // SAVE ORDER
    addOrder(orderData);

    // CLEAR CART
    if (!buyNowProduct) {
      clearCart();
    }

    toast.success("Order placed successfully");

    navigate("/order-success");
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-6">

      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10">

        {/* LEFT - FORM */}
        <div className="bg-white p-6 rounded-2xl shadow">

          <h2 className="text-2xl font-bold mb-6">
            Shipping Details
          </h2>

          <input
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            placeholder="Full Name"
            className="w-full border p-3 mb-4 rounded-lg"
          />

          <input
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="Address"
            className="w-full border p-3 mb-4 rounded-lg"
          />

          <input
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="City"
            className="w-full border p-3 mb-4 rounded-lg"
          />

          <input
            value={pincode}
            onChange={(e) => setPincode(e.target.value)}
            placeholder="Pincode"
            className="w-full border p-3 mb-4 rounded-lg"
          />

        </div>

        {/* RIGHT - SUMMARY */}
        <div className="bg-white p-6 rounded-2xl shadow">

          <h2 className="text-2xl font-bold mb-6">
            Order Summary
          </h2>

          <div className="space-y-4">

            {finalProducts.map((item) => (

              <div
                key={item.id}
                className="flex gap-4 border-b pb-3"
              >

                <img
                  src={item.image}
                  className="w-16 h-16 object-cover rounded-lg"
                />

                <div>

                  <h3 className="font-semibold">
                    {item.name}
                  </h3>

                  <p>
                    Qty: {item.quantity}
                  </p>

                  <p>
                    ₹ {item.price}
                  </p>

                </div>

              </div>

            ))}

          </div>

          <div className="mt-6 border-t pt-4">

            <h2 className="text-xl font-bold mb-4">
              Total: ₹ {totalPrice}
            </h2>

            <button
              onClick={handlePlaceOrder}
              className="w-full bg-black text-white py-3 rounded-xl hover:bg-gray-800"
            >
              Place Order
            </button>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Checkout;