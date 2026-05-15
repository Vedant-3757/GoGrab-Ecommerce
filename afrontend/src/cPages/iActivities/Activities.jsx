import { useContext, useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";

import WishlistContext from "../../fContext/gWishlistContext.jsx";

import { getOrders } from "../../hUtils/OrderService.js";

function Activities() {

  const navigate = useNavigate();

  const wishlistContext =
    useContext(WishlistContext);

  const wishlist =
    wishlistContext?.wishlist ?? [];

  const removeFromWishlist =
    wishlistContext?.removeFromWishlist;

  const [tab, setTab] =
    useState("wishlist");

  const [orders, setOrders] =
    useState([]);

  useEffect(() => {

    const timer = setTimeout(() => {

      const storedOrders =
        getOrders();

      setOrders(storedOrders);

    }, 0);

    return () => clearTimeout(timer);

  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-6">

      <div className="max-w-6xl mx-auto">

        <h1 className="text-4xl font-bold mb-8">
          Activities
        </h1>

        {/* TABS */}
        <div className="flex gap-4 mb-10">

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

        </div>

        {/* WISHLIST */}
        {tab === "wishlist" && (

          <div className="space-y-4">

            {wishlist.length === 0 ? (

              <div className="bg-white rounded-3xl p-10 text-center text-gray-500">
                No items in wishlist ❤️
              </div>

            ) : (

              wishlist.map((item) => (

                <div
                  key={item.id}
                  className="bg-white p-5 rounded-3xl shadow-md flex flex-col sm:flex-row justify-between gap-4"
                >

                  <div>

                    <h2 className="text-xl font-semibold">
                      {item.name}
                    </h2>

                    <p className="text-gray-500">
                      ₹ {item.price}
                    </p>

                  </div>

                  <div className="flex gap-3">

                    <button
                      onClick={() =>
                        navigate(`/product/${item.id}`)
                      }
                      className="border border-black px-4 py-2 rounded-xl hover:bg-black hover:text-white transition"
                    >
                      View
                    </button>

                    <button
                      onClick={() =>
                        removeFromWishlist?.(item.id)
                      }
                      className="bg-red-500 text-white px-4 py-2 rounded-xl hover:bg-red-600 transition"
                    >
                      Remove
                    </button>

                  </div>

                </div>

              ))

            )}

          </div>

        )}

        {/* ORDERS */}
        {tab === "orders" && (

          <div className="space-y-4">

            {orders.length === 0 ? (

              <div className="bg-white rounded-3xl p-10 text-center text-gray-500">
                No orders yet 📦
              </div>

            ) : (

              orders.map((order) => (

                <div
                  key={order.id}
                  className="bg-white p-6 rounded-3xl shadow-md"
                >

                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">

                    <div>

                      <h2 className="text-2xl font-bold">
                        Order #{order.id}
                      </h2>

                      <p className="text-gray-500 mt-1">
                        {new Date(
                          order.createdAt
                        ).toLocaleString()}
                      </p>

                    </div>

                    <div>

                      <p className="font-semibold">
                        Status:
                        <span className="text-green-600 ml-2">
                          {order.status}
                        </span>
                      </p>

                      <p className="font-bold text-xl mt-1">
                        ₹ {order.total}
                      </p>

                    </div>

                  </div>

                  <button
                    onClick={() =>
                      navigate(`/orders/${order.id}`)
                    }
                    className="mt-6 bg-black text-white px-5 py-3 rounded-2xl hover:bg-gray-800 transition"
                  >
                    View Details
                  </button>

                </div>

              ))

            )}

          </div>

        )}

      </div>

    </div>
  );
}

export default Activities;