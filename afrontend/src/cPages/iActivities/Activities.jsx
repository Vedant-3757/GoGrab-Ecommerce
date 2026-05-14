import { useContext } from "react";
import { Navigate, useNavigate } from "react-router-dom";

import WishlistContext from "../../fContext/gWishlistContext.jsx";
import AuthContext from "../../fContext/eAuthContext.jsx";
import OrderContext from "../../fContext/hOrderContext.jsx";

function Activities() {

  const navigate = useNavigate();

  const user = useContext(AuthContext)?.user;

  const wishlistItems =
    useContext(WishlistContext)?.wishlistItems || [];

  const orders =
    useContext(OrderContext)?.orders || [];

  if (!user) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-6">

      <div className="max-w-7xl mx-auto">

        <h1 className="text-3xl sm:text-5xl font-bold mb-10">
          Activities
        </h1>

        {/* ORDER TRACKING */}
        <div className="bg-white rounded-3xl p-5 sm:p-8 shadow-md mb-10">

          <h2 className="text-2xl sm:text-3xl font-bold mb-6">
            Order Tracking
          </h2>

          {orders.length === 0 ? (

            <p className="text-gray-500">
              No orders yet. Start shopping!
            </p>

          ) : (

            <div className="space-y-6">

              {orders.map((order) => (

                <div
                  key={order.id}
                  onClick={() =>
                    navigate(`/order/${order.id}`)
                  }
                  className="border-b pb-4 cursor-pointer hover:bg-gray-50 p-4 rounded-xl transition"
                >

                  <h3 className="font-semibold text-lg sm:text-xl">
                    Order #{order.id}
                  </h3>

                  <p
                    className={
                      order.status === "Packed"
                        ? "text-yellow-600 font-semibold"
                        : order.status === "Shipped"
                        ? "text-blue-600 font-semibold"
                        : "text-green-600 font-semibold"
                    }
                  >
                    Status: {order.status}
                  </p>

                  <p className="text-gray-600">
                    Items: {order.items?.length || 0}
                  </p>

                  <p className="font-bold">
                    Total: ₹ {order.total}
                  </p>

                </div>

              ))}

            </div>

          )}

        </div>

        {/* WISHLIST */}
        <div className="bg-white rounded-3xl p-5 sm:p-8 shadow-md">

          <h2 className="text-2xl sm:text-3xl font-bold mb-8">
            Wishlist
          </h2>

          {wishlistItems.length === 0 ? (

            <p className="text-gray-500 text-lg">
              No wishlist products yet.
            </p>

          ) : (

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

              {wishlistItems.map((item) => (

                <div
                  key={item.id}
                  className="border rounded-2xl p-4"
                >

                  <img
                    src={item.image}
                    className="w-full h-52 object-cover rounded-xl mb-4"
                  />

                  <h3 className="text-xl font-semibold mb-2">
                    {item.name}
                  </h3>

                  <p className="text-gray-600 mb-4">
                    ₹ {item.price}
                  </p>

                  <button
                    onClick={() =>
                      navigate(`/product/${item.id}`)
                    }
                    className="bg-black text-white px-5 py-2 rounded-xl w-full"
                  >
                    View Product
                  </button>

                </div>

              ))}

            </div>

          )}

        </div>

      </div>

    </div>
  );
}

export default Activities;