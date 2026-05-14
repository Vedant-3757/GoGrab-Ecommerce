import { useContext, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import products from "../../jData/Products.js";
import CartContext from "../../fContext/aCartContext.jsx";
import WishlistContext from "../../fContext/gWishlistContext.jsx";
import AuthContext from "../../fContext/eAuthContext.jsx";

function ProductDetails() {

  const { id } = useParams();
  const navigate = useNavigate();

  const product = products.find((p) => p.id === Number(id));

  const user = useContext(AuthContext)?.user;
  const { addToCart } = useContext(CartContext);
  const wishlistContext = useContext(WishlistContext);

  const toggleWishlist = wishlistContext?.toggleWishlist;
  const isInWishlist = wishlistContext?.isInWishlist;

  const [qty, setQty] = useState(1);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-500">
        Product not found
      </div>
    );
  }

  const liked =
    product?.id && isInWishlist
      ? isInWishlist(product.id)
      : false;

  const handleCart = () => {

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

    toggleWishlist(product);

    toast.success(
      liked ? "Removed from wishlist" : "Added to wishlist"
    );
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">

      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10">

        {/* IMAGE */}
        <div className="bg-white p-6 rounded-2xl shadow-md flex items-center justify-center">
          <img
            src={product.image}
            className="w-full max-h-[400px] object-cover rounded-xl"
          />
        </div>

        {/* DETAILS */}
        <div className="bg-white p-6 rounded-2xl shadow-md">

          <h1 className="text-3xl font-bold mb-4">
            {product.name}
          </h1>

          <p className="text-gray-600 text-lg mb-6">
            {product.description || "High quality product for daily use."}
          </p>

          <p className="text-2xl font-bold mb-6">
            ₹ {product.price}
          </p>

          {/* QUANTITY */}
          <div className="flex items-center gap-4 mb-6">

            <button
              onClick={() => setQty((q) => Math.max(1, q - 1))}
              className="bg-gray-200 px-4 py-2 rounded-lg"
            >
              -
            </button>

            <span className="text-xl font-semibold">
              {qty}
            </span>

            <button
              onClick={() => setQty((q) => q + 1)}
              className="bg-gray-200 px-4 py-2 rounded-lg"
            >
              +
            </button>

          </div>

          {/* ACTIONS */}
          <div className="flex flex-col gap-3">

            <button
              onClick={handleCart}
              className="bg-black text-white py-3 rounded-xl hover:bg-gray-800 transition"
            >
              Add To Cart
            </button>

            <button
              onClick={handleWishlist}
              className="border border-black py-3 rounded-xl hover:bg-black hover:text-white transition"
            >
              {liked ? "Remove from Wishlist" : "Add to Wishlist"}
            </button>

            <button
              onClick={() => navigate("/cart")}
              className="text-gray-600 underline"
            >
              Go to Cart
            </button>

          </div>

        </div>

      </div>
    </div>
  );
}

export default ProductDetails;