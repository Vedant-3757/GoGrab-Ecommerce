import { useContext } from "react";
import { useNavigate } from "react-router-dom";

import WishlistContext from "../../fContext/gWishlistContext.jsx";

function Wishlist() {

  const navigate = useNavigate();

  const { wishlistItems, toggleWishlist } =
    useContext(WishlistContext);

  return (
    <div className="min-h-screen bg-gray-100 p-6">

      <div className="max-w-6xl mx-auto">

        <h1 className="text-3xl sm:text-4xl font-bold mb-8">
          Your Wishlist
        </h1>

        {/* EMPTY STATE */}
        {wishlistItems.length === 0 ? (

          <div className="text-center py-20">

            <div className="text-6xl mb-4">💔</div>

            <h2 className="text-2xl font-bold mb-2">
              Wishlist is empty
            </h2>

            <p className="text-gray-500 mb-6">
              Save products you like for later
            </p>

            <button
              onClick={() => navigate("/")}
              className="bg-black text-white px-6 py-3 rounded-xl hover:bg-gray-800 transition"
            >
              Explore Products
            </button>

          </div>

        ) : (

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">

            {wishlistItems.map((item) => (

              <div
                key={item.id}
                className="bg-white rounded-2xl shadow-md p-4 hover:shadow-xl transition"
              >

                <img
                  src={item.image}
                  className="w-full h-52 object-cover rounded-xl mb-4"
                />

                <h2 className="text-lg font-semibold mb-2 line-clamp-1">
                  {item.name}
                </h2>

                <p className="text-gray-600 mb-4">
                  ₹ {item.price}
                </p>

                <div className="flex flex-col gap-2">

                  <button
                    onClick={() =>
                      navigate(`/product/${item.id}`)
                    }
                    className="bg-black text-white py-2 rounded-lg"
                  >
                    View Product
                  </button>

                  <button
                    onClick={() => toggleWishlist(item)}
                    className="border border-red-500 text-red-500 py-2 rounded-lg hover:bg-red-500 hover:text-white transition"
                  >
                    Remove
                  </button>

                </div>

              </div>

            ))}

          </div>

        )}

      </div>

    </div>
  );
}

export default Wishlist;