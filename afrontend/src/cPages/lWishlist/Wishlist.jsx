import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import WishlistContext from "../../fContext/gWishlistContext.jsx";
import CartContext from "../../fContext/aCartContext.jsx";

function Wishlist() {

  const navigate = useNavigate();

  const wishlistContext = useContext(WishlistContext);
  const cartContext = useContext(CartContext);

  const wishlistItems = wishlistContext?.wishlistItems ?? [];
  const toggleWishlist = wishlistContext?.toggleWishlist;

  const { addToCart } = cartContext;

  const handleAddToCart = (product) => {
    addToCart(product);
    toast.success("Added to cart");
  };

  const handleRemove = (product) => {
    if (!toggleWishlist) return;

    toggleWishlist(product);
    toast.success("Removed from wishlist");
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">

      <div className="max-w-6xl mx-auto">

        <h1 className="text-3xl sm:text-4xl font-bold mb-8">
          Your Wishlist
        </h1>

        {wishlistItems.length === 0 ? (

          <div className="text-center py-20 text-gray-500 text-lg">
            Your wishlist is empty 💔
          </div>

        ) : (

          <div className="space-y-6">

            {wishlistItems.map((item) => (

              <div
                key={item.id}
                className="bg-white rounded-2xl shadow-md p-4 flex flex-col sm:flex-row items-center gap-6"
              >

                {/* IMAGE */}
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-32 h-32 object-cover rounded-xl"
                />

                {/* DETAILS */}
                <div className="flex-1 text-center sm:text-left">

                  <h2 className="text-xl font-semibold">
                    {item.name}
                  </h2>

                  <p className="text-gray-600 mt-2">
                    ₹ {item.price}
                  </p>

                  <div className="flex gap-3 mt-4 justify-center sm:justify-start">

                    <button
                      onClick={() => handleAddToCart(item)}
                      className="bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800"
                    >
                      Add To Cart
                    </button>

                    <button
                      onClick={() =>
                        navigate(`/product/${item.id}`)
                      }
                      className="border border-black px-4 py-2 rounded-lg hover:bg-black hover:text-white"
                    >
                      View
                    </button>

                  </div>

                </div>

                {/* REMOVE */}
                <button
                  onClick={() => handleRemove(item)}
                  className="bg-red-500 text-white px-5 py-2 rounded-lg hover:bg-red-600"
                >
                  Remove
                </button>

              </div>

            ))}

          </div>

        )}

      </div>

    </div>
  );
}

export default Wishlist;