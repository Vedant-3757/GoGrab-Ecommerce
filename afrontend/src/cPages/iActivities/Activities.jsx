import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

import WishlistContext from "../../fContext/gWishlistContext.jsx";
import CartContext from "../../fContext/aCartContext.jsx";

function Activities() {

  const navigate = useNavigate();

  const wishlistContext = useContext(WishlistContext);
  const cartContext = useContext(CartContext);

  const wishlist = wishlistContext?.wishlist ?? [];
  const removeFromWishlist = wishlistContext?.removeFromWishlist;

  const orders = cartContext?.orders ?? []; // fallback (if you store orders later)

  const [tab, setTab] = useState("wishlist");

  return (
    <div className="min-h-screen bg-gray-100 p-6">

      <div className="max-w-6xl mx-auto">

        <h1 className="text-3xl font-bold mb-6">
          Activities
        </h1>

        {/* TABS */}
        <div className="flex gap-4 mb-8">

          <button
            onClick={() => setTab("wishlist")}
            className={`px-4 py-2 rounded-xl ${
              tab === "wishlist"
                ? "bg-black text-white"
                : "bg-white"
            }`}
          >
            Wishlist
          </button>

          <button
            onClick={() => setTab("orders")}
            className={`px-4 py-2 rounded-xl ${
              tab === "orders"
                ? "bg-black text-white"
                : "bg-white"
            }`}
          >
            Orders
          </button>

        </div>

        {/* WISHLIST TAB */}
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
                        navigate(`/product/${item.id}`)
                      }
                      className="text-blue-600"
                    >
                      View
                    </button>

                    <button
                      onClick={() =>
                        removeFromWishlist?.(item.id)
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

        {/* ORDERS TAB */}
        {tab === "orders" && (
          <div className="space-y-4">

            {orders.length === 0 ? (
              <p className="text-gray-500">
                No orders yet 📦
              </p>
            ) : (
              orders.map((order, i) => (
                <div
                  key={i}
                  className="bg-white p-4 rounded-xl shadow"
                >
                  <h2 className="font-semibold">
                    Order #{i + 1}
                  </h2>

                  <p className="text-gray-500">
                    Total: ₹ {order.total || 0}
                  </p>
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