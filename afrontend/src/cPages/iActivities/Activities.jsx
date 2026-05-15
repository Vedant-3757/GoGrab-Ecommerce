import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

import WishlistContext from "../../fContext/gWishlistContext.jsx";

import {
  getOrders,
} from "../../hUtils/OrderService.js";

function Activities() {

  const navigate = useNavigate();

  const wishlistContext =
    useContext(WishlistContext);

  const wishlist =
    wishlistContext?.wishlist ?? [];

  const removeFromWishlist =
    wishlistContext?.removeFromWishlist;

  const orders = getOrders();

  const [tab, setTab] =
    useState("wishlist");

  return (
    <div className="min-h-screen bg-gray-100 p-6">

      <div className="max-w-6xl mx-auto">

        <h1 className="text-3xl font-bold mb-6">
          Activities
        </h1>

        {/* TABS */}
        <div className="flex gap-4 mb-8">

          <button
            onClick={() =>
              setTab("wishlist")
            }
            className={`px-4 py-2 rounded-xl ${
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
            className={`px-4 py-2 rounded-xl ${
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
              <p className="text-gray-500">
                No items in wishlist ❤️
              </p>
            ) : (
              wishlist.map((item) => (
                <div
                  key={item.id}
                  className="bg-white p-4 rounded-xl flex justify-between items-center shadow"
                >

                  <div>

                    <h2 className="font-semibold">
                      {item.name}
                    </h2>

                    <p className="text-gray-500">
                      ₹ {item.price}
                    </p>

                  </div>

                  <div className="flex gap-3">

                    <button
                      onClick={() =>
                        navigate(
                          `/product/${item.id}`
                        )
                      }
                      className="text-blue-600"
                    >
                      View
                    </button>

                    <button
                      onClick={() =>
                        removeFromWishlist?.(
                          item.id
                        )
                      }
                      className="text-red-500"
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
              <p className="text-gray-500">
                No orders yet 📦
              </p>
            ) : (
              orders.map((order) => (
                <div
                  key={order.id}
                  onClick={() =>
                    navigate(
                      `/order/${order.id}`
                    )
                  }
                  className="bg-white p-5 rounded-2xl shadow cursor-pointer hover:shadow-lg transition"
                >

                  <div className="flex justify-between items-center">

                    <div>

                      <h2 className="font-bold text-lg">
                        Order #{order.id}
                      </h2>

                      <p className="text-gray-500">
                        ₹ {order.total}
                      </p>

                    </div>

                    <div className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm">
                      {order.status}
                    </div>

                  </div>

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