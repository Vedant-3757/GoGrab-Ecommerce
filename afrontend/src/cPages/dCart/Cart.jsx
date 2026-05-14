import { useContext } from "react";

import { useNavigate } from "react-router-dom";

import CartContext from "../../fContext/aCartContext.jsx";

function Cart() {

  const navigate = useNavigate();

  const {
    cartItems,
    increaseQuantity,
    decreaseQuantity,
    removeItem,
  } = useContext(CartContext);

  const totalPrice = cartItems.reduce(
    (total, item) =>
      total + item.price * item.quantity,
    0
  );

  return (
    <div className="min-h-screen bg-gray-100 p-4 sm:p-6">

      <div className="max-w-6xl mx-auto">

        <h1 className="text-3xl sm:text-4xl font-bold mb-8">
          Your Cart
        </h1>

        {cartItems.length === 0 ? (

          <p className="text-lg sm:text-xl text-gray-600">
            Cart is empty
          </p>

        ) : (

          <div className="space-y-6">

            {cartItems.map((item) => (

              <div
                key={item.id}
                className="bg-white rounded-2xl shadow-md p-4 flex flex-col lg:flex-row items-center gap-6"
              >

                <img
                  src={item.image}
                  alt={item.name}
                  className="w-32 h-32 sm:w-40 sm:h-40 object-cover rounded-xl"
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
                        decreaseQuantity(item.id)
                      }
                      className="bg-gray-200 px-4 py-2 rounded-lg hover:bg-gray-300"
                    >
                      -
                    </button>

                    <span className="text-xl font-semibold">
                      {item.quantity}
                    </span>

                    <button
                      onClick={() =>
                        increaseQuantity(item.id)
                      }
                      className="bg-gray-200 px-4 py-2 rounded-lg hover:bg-gray-300"
                    >
                      +
                    </button>

                  </div>

                </div>

                <button
                  onClick={() =>
                    removeItem(item.id)
                  }
                  className="bg-red-500 text-white px-5 py-2 rounded-lg hover:bg-red-600 w-full sm:w-auto"
                >
                  Remove
                </button>

              </div>

            ))}

            {/* TOTAL SECTION */}
            <div className="bg-white p-5 sm:p-6 rounded-2xl shadow-md">

              <h2 className="text-2xl sm:text-3xl font-bold mb-6">
                Total: ₹ {totalPrice}
              </h2>

              <button
                onClick={() =>
                  navigate("/checkout")
                }
                className="bg-black text-white px-6 py-3 rounded-xl hover:bg-gray-800 transition w-full sm:w-auto"
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