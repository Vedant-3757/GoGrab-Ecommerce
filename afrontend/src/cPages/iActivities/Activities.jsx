import {
  useEffect,
  useState,
  useContext,
} from "react";

import { useNavigate } from "react-router-dom";

import WishlistContext from "../../fContext/gWishlistContext.jsx";

import { getOrders } from "../../hUtils/OrderService.js";

import { motion } from "framer-motion";

function Activities() {

  const navigate = useNavigate();

  const wishlistContext =
    useContext(WishlistContext);

  // FIX: correct key fallback
  const wishlist =
    wishlistContext?.wishlistItems ?? [];

  const removeFromWishlist =
    wishlistContext?.removeFromWishlist;

  const [tab, setTab] =
    useState("orders");

  const [orders, setOrders] =
    useState([]);

  useEffect(() => {

    const storedOrders =
      getOrders();

    Promise.resolve().then(() => {
      setOrders(storedOrders);
    });

  }, []);

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
          Activities
        </h1>

        {/* TABS */}
        <div className="flex flex-wrap gap-4 mb-8">

          <button
            onClick={() =>
              setTab("orders")
            }
            className={`px-5 py-3 rounded-2xl transition ${
              tab === "orders"
                ? "bg-black text-white"
                : "bg-white"
            }`}
          >
            Orders
          </button>

          <button
            onClick={() =>
              setTab("wishlist")
            }
            className={`px-5 py-3 rounded-2xl transition ${
              tab === "wishlist"
                ? "bg-black text-white"
                : "bg-white"
            }`}
          >
            Wishlist
          </button>

        </div>

        {/* ORDERS */}
        {tab === "orders" && (

          <div className="space-y-5">

            {orders.length === 0 ? (

              <div className="bg-white rounded-3xl p-10 text-center shadow-md">

                <div className="text-6xl mb-4">
                  📦
                </div>

                <h2 className="text-2xl font-bold mb-2">
                  No Orders Yet
                </h2>

                <p className="text-gray-500">
                  Your orders will appear here
                </p>

              </div>

            ) : (

              orders.map((order) => (

                <motion.div
                  whileHover={{
                    y: -3,
                  }}
                  key={order.id}
                  className="bg-white rounded-3xl shadow-md p-5 sm:p-6 flex flex-col md:flex-row md:items-center md:justify-between gap-5"
                >

                  <div>

                    <h2 className="text-xl font-bold mb-2">
                      Order #
                      {order.id}
                    </h2>

                    <p className="text-gray-500">
                      Status:{" "}
                      {order.status}
                    </p>

                    <p className="text-gray-500">
                      Total:{" "}
                      ₹ {order.total}
                    </p>

                  </div>

                  <button
                    onClick={() =>
                      navigate(
                        `/order/${order.id}`
                      )
                    }
                    className="bg-black text-white px-5 py-3 rounded-2xl hover:bg-gray-800 transition w-full md:w-auto"
                  >
                    View Details
                  </button>

                </motion.div>

              ))

            )}

          </div>

        )}

        {/* WISHLIST */}
        {tab === "wishlist" && (

          <div className="space-y-5">

            {wishlist.length === 0 ? (

              <div className="bg-white rounded-3xl p-10 text-center shadow-md">

                <div className="text-6xl mb-4">
                  ❤️
                </div>

                <h2 className="text-2xl font-bold mb-2">
                  Wishlist Empty
                </h2>

                <p className="text-gray-500">
                  Save products you love
                </p>

              </div>

            ) : (

              wishlist.map((item) => (

                <motion.div
                  whileHover={{
                    y: -3,
                  }}
                  key={item.id}
                  className="bg-white rounded-3xl shadow-md p-5 flex flex-col sm:flex-row gap-5 sm:items-center sm:justify-between"
                >

                  <div className="flex items-center gap-4">

                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-24 h-24 object-cover rounded-2xl"
                    />

                    <div>

                      <h2 className="font-bold text-lg">
                        {item.name}
                      </h2>

                      <p className="text-gray-500">
                        ₹ {item.price}
                      </p>

                    </div>

                  </div>

                  <div className="flex flex-col sm:flex-row gap-3">

                    <button
                      onClick={() =>
                        navigate(
                          `/product/${item.id}`
                        )
                      }
                      className="border border-black px-5 py-3 rounded-2xl hover:bg-black hover:text-white transition"
                    >
                      View
                    </button>

                    <button
                      onClick={() =>
                        removeFromWishlist?.(
                          item.id
                        )
                      }
                      className="bg-red-500 text-white px-5 py-3 rounded-2xl hover:bg-red-600 transition"
                    >
                      Remove
                    </button>

                  </div>

                </motion.div>

              ))

            )}

          </div>

        )}

      </div>

    </motion.div>
  );
}

export default Activities;