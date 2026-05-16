import { useContext } from "react";

import { useNavigate } from "react-router-dom";

import CartContext from "../../fContext/aCartContext.jsx";

function Cart() {

  const navigate = useNavigate();

  const cartContext =
    useContext(CartContext) || {};

  const {
    cartItems = [],
    increaseQuantity,
    decreaseQuantity,
    removeItem,
  } = cartContext;

  // ✅ SAFER TOTAL CALCULATION
  const totalPrice =
    (cartItems || []).reduce(
      (total, item) =>
        total +
        (item.price || 0) *
          (item.quantity || 0),
      0
    );

  return (
    <div className="min-h-screen bg-gray-100 p-4 sm:p-6">

      <div className="max-w-6xl mx-auto">

        <h1 className="text-3xl sm:text-4xl font-bold mb-8">
          Your Cart
        </h1>

        {/* EMPTY STATE */}
        {cartItems.length === 0 ? (

          <div className="bg-white rounded-3xl shadow-md flex flex-col items-center justify-center py-20 px-6 text-center">

            <div className="text-7xl mb-5">
              🛒
            </div>

            <h2 className="text-2xl sm:text-3xl font-bold mb-3">
              Your cart is empty
            </h2>

            <p className="text-gray-500 mb-8 max-w-md">
              Looks like you haven't
              added anything yet.
              Explore products and
              start shopping.
            </p>

            <button
              onClick={() =>
                navigate("/")
              }
              className="bg-black text-white px-7 py-3 rounded-2xl hover:bg-gray-800 transition"
            >
              Start Shopping
            </button>

          </div>

        ) : (

          <div className="grid grid-cols-1 xl:grid-cols-[1fr_350px] gap-6 items-start">

            {/* CART ITEMS */}
            <div className="space-y-6">

              {cartItems.map((item) => (

                <div
                  key={item.id}
                  className="bg-white rounded-3xl shadow-md p-4 sm:p-5 flex flex-col lg:flex-row items-center gap-6"
                >

                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-32 h-32 sm:w-40 sm:h-40 object-cover rounded-2xl"
                  />

                  <div className="flex-1 w-full text-center lg:text-left">

                    <h2 className="text-xl sm:text-2xl font-semibold">
                      {item.name}
                    </h2>

                    <p className="text-gray-600 text-lg mt-2">
                      ₹ {item.price}
                    </p>

                    <div className="flex items-center justify-center lg:justify-start gap-4 mt-4">

                      <button
                        onClick={() =>
                          decreaseQuantity(
                            item.id
                          )
                        }
                        className="bg-gray-200 px-4 py-2 rounded-xl hover:bg-gray-300 transition"
                      >
                        -
                      </button>

                      <span className="text-xl font-semibold min-w-[30px] text-center">
                        {item.quantity}
                      </span>

                      <button
                        onClick={() =>
                          increaseQuantity(
                            item.id
                          )
                        }
                        className="bg-gray-200 px-4 py-2 rounded-xl hover:bg-gray-300 transition"
                      >
                        +
                      </button>

                    </div>

                  </div>

                  <button
                    onClick={() =>
                      removeItem(item.id)
                    }
                    className="bg-red-500 text-white px-5 py-2 rounded-xl hover:bg-red-600 transition"
                  >
                    Remove
                  </button>

                </div>

              ))}

            </div>

            {/* SUMMARY */}
            <div className="bg-white p-5 sm:p-6 rounded-3xl shadow-md xl:sticky xl:top-24">

              <h2 className="text-2xl font-bold mb-6">
                Order Summary
              </h2>

              <div className="space-y-4 mb-6">

                <div className="flex justify-between text-gray-600">

                  <span>
                    Items
                  </span>

                  <span>
                    {cartItems.length}
                  </span>

                </div>

                <div className="flex justify-between text-2xl font-bold border-t pt-4">

                  <span>
                    Total
                  </span>

                  <span>
                    ₹ {totalPrice}
                  </span>

                </div>

              </div>

              <button
                onClick={() =>
                  navigate("/checkout")
                }
                className="w-full bg-black text-white px-6 py-4 rounded-2xl hover:bg-gray-800 transition"
              >
                Proceed To Checkout
              </button>

            </div>

          </div>

        )}

      </div>

    </div>
  );
}

export default Cart;