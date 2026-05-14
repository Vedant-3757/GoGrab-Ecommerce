import { useContext, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import products from "../../jData/Products.js";

import CartContext from "../../fContext/aCartContext.jsx";
import AuthContext from "../../fContext/eAuthContext.jsx";
import WishlistContext from "../../fContext/gWishlistContext.jsx";

function ProductDetails() {

  const { id } = useParams();
  const navigate = useNavigate();

  const user = useContext(AuthContext)?.user;
  const { addToCart } = useContext(CartContext);
  const wishlistContext = useContext(WishlistContext);

  const toggleWishlist = wishlistContext?.toggleWishlist;
  const isInWishlist = wishlistContext?.isInWishlist;

  const product = products.find((p) => String(p.id) === String(id));

  const [qty, setQty] = useState(1);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-500">
        Product not found 😢
      </div>
    );
  }

  const liked = isInWishlist ? isInWishlist(product.id) : false;

  const handleAddToCart = () => {

    if (!user) {
      toast.error("Please login first");
      navigate("/login");
      return;
    }

    addToCart({ ...product, quantity: qty });
    toast.success("Added to cart");
  };

  const handleWishlist = () => {

    if (!user) {
      toast.error("Please login first");
      navigate("/login");
      return;
    }

    if (!toggleWishlist) return;

    toggleWishlist(product);

    toast.success(
      liked ? "Removed from wishlist" : "Added to wishlist"
    );
  };

  return (
    <div className="min-h-screen bg-gray-100 px-6 py-10">

      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10 bg-white p-6 rounded-2xl shadow-lg">

        {/* IMAGE */}
        <div className="flex justify-center items-center">
          <img
            src={product.image}
            alt={product.name}
            className="w-full max-h-[400px] object-cover rounded-xl"
          />
        </div>

        {/* DETAILS */}
        <div>

          <h1 className="text-3xl font-bold mb-4">
            {product.name}
          </h1>

          <p className="text-gray-600 mb-6 text-lg">
            ₹ {product.price}
          </p>

          {/* QUANTITY */}
          <div className="flex items-center gap-4 mb-6">

            <button
              onClick={() => setQty((q) => Math.max(1, q - 1))}
              className="px-4 py-2 bg-gray-200 rounded-lg"
            >
              -
            </button>

            <span className="text-xl font-semibold">{qty}</span>

            <button
              onClick={() => setQty((q) => q + 1)}
              className="px-4 py-2 bg-gray-200 rounded-lg"
            >
              +
            </button>

          </div>

          {/* ACTIONS */}
          <div className="flex flex-col gap-3">

            <button
              onClick={handleAddToCart}
              className="bg-black text-white py-3 rounded-xl hover:bg-gray-800"
            >
              Add To Cart
            </button>

            <button
              onClick={handleWishlist}
              className="border border-black py-3 rounded-xl hover:bg-black hover:text-white"
            >
              {liked ? "Remove from Wishlist ❤️" : "Add to Wishlist 🤍"}
            </button>

            <button
              onClick={() => navigate("/cart")}
              className="text-blue-600 underline mt-2"
            >
              Go to Cart →
            </button>

          </div>

        </div>

      </div>
    </div>
  );
}

export default ProductDetails;