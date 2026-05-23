import { useContext, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import toast from "react-hot-toast";
import { motion } from "framer-motion";

import CartContext from "../../fContext/aCartContext.jsx";
import api from "../../eServices/api";

function Checkout() {

  const navigate = useNavigate();

  const location = useLocation();

  const cartContext =
    useContext(CartContext);

  const cartItems =
    cartContext?.cartItems || [];

  const removeItem =
    cartContext?.removeItem;

  const buyNowProduct =
    location.state?.buyNowProduct;

  const [form, setForm] =
    useState({
      name: "",
      address: "",
      phone: "",
    });

  const [loading, setLoading] =
    useState(false);

  const [paymentMethod, setPaymentMethod] =
    useState("cod");

  const itemsToCheckout =
    buyNowProduct
      ? [buyNowProduct]
      : cartItems;

  const totalPrice =
    itemsToCheckout.reduce(
      (total, item) =>
        total +
        item.price *
          item.quantity,
      0
    );

  const handleChange = (e) => {

    setForm({
      ...form,
      [e.target.name]:
        e.target.value,
    });

  };

  const buildOrderData = () => {

    return {

      products:
        itemsToCheckout.map(
          (item) => ({
            productId:
              item._id,
            quantity:
              item.quantity,
          })
        ),

      totalAmount:
        totalPrice,

      shippingAddress:
        form.address.trim(),

      paymentMethod:
        paymentMethod === "online"
          ? "ONLINE"
          : "COD",
    };

  };

  const clearCartAfterOrder = () => {

    if (!buyNowProduct) {

      cartItems.forEach(
        (item) =>
          removeItem?.(
            item._id
          )
      );

    }

  };

  const handleOrder = async () => {

    if (
      itemsToCheckout.length === 0
    ) {

      toast.error(
        "Cart is empty"
      );

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

    const phoneRegex =
      /^[0-9]{10}$/;

    if (
      !phoneRegex.test(
        form.phone
      )
    ) {

      toast.error(
        "Enter valid 10 digit phone number"
      );

      return;
    }

    setLoading(true);

    const orderData =
      buildOrderData();

    try {

      // ONLINE PAYMENT
      if (
        paymentMethod ===
        "online"
      ) {

        const paymentRes =
          await api.post(
            "/payment/create-order",
            {
              amount:
                totalPrice,
            }
          );

        const razorpayOrder =
          paymentRes.data;

        const options = {

          key:
            "rzp_test_Ss62Zyu0HOvyut",

          amount:
            razorpayOrder.amount,

          currency:
            razorpayOrder.currency,

          name:
            "GoGrab",

          description:
            "Order Payment",

          order_id:
            razorpayOrder.id,

          handler:
            async function () {

              await api.post(
                "/orders",
                orderData
              );

              toast.success(
                "Payment Successful!"
              );

              clearCartAfterOrder();

              navigate(
                "/order-success"
              );

            },

          modal: {
            ondismiss: function () {
              toast.error(
                "Payment Cancelled"
              );
            },
          },

          prefill: {
            name:
              form.name,

            contact:
              form.phone,
          },

          theme: {
            color:
              "#000000",
          },
        };

        const razor =
          new window.Razorpay(
            options
          );

        razor.open();

      }

      // COD
      else {

        const res =
          await api.post(
            "/orders",
            orderData
          );

        console.log(
          "COD ORDER SUCCESS:",
          res.data
        );

        toast.success(
          "Order placed successfully!"
        );

        clearCartAfterOrder();

        navigate(
          "/order-success"
        );

      }

    } catch (err) {

      console.log(
        "ORDER ERROR:",
        err.response?.data ||
          err.message
      );

      toast.error(
        err.response?.data
          ?.message ||
          "Order Failed"
      );

    } finally {

      setLoading(false);

    }
  };

  return (

    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{
        duration: 0.3,
      }}
      className="min-h-screen bg-gray-100 px-4 sm:px-6 py-8"
    >

      <div className="max-w-6xl mx-auto">

        <h1 className="text-3xl sm:text-4xl font-bold mb-8">
          Checkout
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

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
                type="tel"
                name="phone"
                placeholder="Phone Number"
                value={form.phone}
                maxLength={10}
                onChange={handleChange}
                className="w-full border border-gray-300 p-4 rounded-2xl outline-none focus:border-black"
              />

            </div>

          </div>

          <div className="bg-white rounded-3xl shadow-md p-6 sm:p-8 h-fit">

            <h2 className="text-2xl font-bold mb-6">
              Order Summary
            </h2>

            <div className="space-y-4">

              {itemsToCheckout.map(
                (item) => (

                  <div
                    key={item._id}
                    className="flex justify-between items-center gap-4 border-b pb-4"
                  >

                    <div>

                      <h3 className="font-semibold">
                        {item.name}
                      </h3>

                      <p className="text-sm text-gray-500">
                        Qty:{" "}
                        {
                          item.quantity
                        }
                      </p>

                    </div>

                    <p className="font-semibold whitespace-nowrap">
                      ₹{" "}
                      {item.price *
                        item.quantity}
                    </p>

                  </div>

                )
              )}

            </div>

            <div className="mb-6 mt-6">

              <h3 className="font-bold mb-3">
                Payment Method
              </h3>

              <div className="flex gap-4 flex-wrap">

                <button
                  type="button"
                  onClick={() =>
                    setPaymentMethod(
                      "cod"
                    )
                  }
                  className={`px-4 py-3 rounded-2xl border transition ${
                    paymentMethod ===
                    "cod"
                      ? "bg-black text-white"
                      : "bg-white"
                  }`}
                >
                  Cash On Delivery
                </button>

                <button
                  type="button"
                  onClick={() =>
                    setPaymentMethod(
                      "online"
                    )
                  }
                  className={`px-4 py-3 rounded-2xl border transition ${
                    paymentMethod ===
                    "online"
                      ? "bg-black text-white"
                      : "bg-white"
                  }`}
                >
                  Online Payment
                </button>

              </div>

            </div>

            <div className="mt-8">

              <div className="flex justify-between text-2xl font-bold mb-6">

                <span>
                  Total
                </span>

                <span>
                  ₹ {totalPrice}
                </span>

              </div>

              <motion.button
                whileTap={{
                  scale: 0.97,
                }}
                whileHover={{
                  scale: 1.01,
                }}
                onClick={handleOrder}
                disabled={loading}
                className="w-full bg-black text-white py-4 rounded-2xl hover:bg-gray-800 transition disabled:opacity-60"
              >
                {loading
                  ? "Processing..."
                  : paymentMethod ===
                    "online"
                  ? "Pay Now"
                  : "Place Order"}
              </motion.button>

            </div>

          </div>

        </div>

      </div>

    </motion.div>

  );
}

export default Checkout;