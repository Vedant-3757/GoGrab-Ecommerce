import { useContext } from "react";
import { useNavigate } from "react-router-dom";

import toast from "react-hot-toast";

import CartContext from "../../fContext/aCartContext.jsx";
import AuthContext from "../../fContext/eAuthContext.jsx";
import WishlistContext from "../../fContext/gWishlistContext.jsx";

function ProductCard({ product }) {

  const navigate = useNavigate();

  // AUTH
  const user = useContext(AuthContext)?.user;

  // CART
  const { addToCart } = useContext(CartContext);

  // WISHLIST
  const wishlistContext =
    useContext(WishlistContext);

  const toggleWishlist =
    wishlistContext?.toggleWishlist;

  const isInWishlist =
    wishlistContext?.isInWishlist;

  // LIKE STATUS
  const liked =
    isInWishlist && product?.id
      ? isInWishlist(product.id)
      : false;

  // ADD TO CART
  const handleAddToCart = () => {

    if (!user) {

      toast.error("Please login first");

      navigate("/login");

      return;
    }

    addToCart(product);

    toast.success("Added to cart");
  };

  // WISHLIST TOGGLE
  const handleWishlist = () => {

    if (!user) {

      toast.error("Please login first");

      navigate("/login");

      return;
    }

    if (!toggleWishlist) return;

    toggleWishlist(product);

    toast.success(
      liked
        ? "Removed from wishlist"
        : "Added to wishlist"
    );
  };

  if (!product) return null;

  return (
    <div className="bg-white rounded-2xl shadow-md overflow-hidden hover:scale-105 transition duration-300 relative">

      {/* ❤️ WISHLIST HEART */}
      <button
        onClick={handleWishlist}
        className="absolute top-4 right-4 text-3xl z-10"
      >
        {liked ? "❤️" : "🤍"}
      </button>

      {/* IMAGE */}
      <img
        src={product.image}
        alt={product.name}
        className="h-52 w-full object-cover"
      />

      {/* DETAILS */}
      <div className="p-4">

        <h2 className="text-xl font-semibold mb-2">
          {product.name}
        </h2>

        <p className="text-gray-600 mb-4">
          ₹ {product.price}
        </p>

        <div className="flex flex-col sm:flex-row gap-3">

          <button
            onClick={handleAddToCart}
            className="bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800 w-full"
          >
            Add To Cart
          </button>

          <button
            onClick={() =>
              navigate(`/product/${product.id}`)
            }
            className="border border-black px-4 py-2 rounded-lg hover:bg-black hover:text-white w-full"
          >
            View Details
          </button>

        </div>

      </div>

    </div>
  );
}

export default ProductCard;