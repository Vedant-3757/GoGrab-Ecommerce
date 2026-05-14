import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { motion } from "framer-motion";

import CartContext from "../../fContext/aCartContext.jsx";
import AuthContext from "../../fContext/eAuthContext.jsx";
import WishlistContext from "../../fContext/gWishlistContext.jsx";

function ProductCard({ product }) {

  const navigate = useNavigate();

  const user = useContext(AuthContext)?.user;
  const { addToCart } = useContext(CartContext);
  const wishlistContext = useContext(WishlistContext);

  const toggleWishlist = wishlistContext?.toggleWishlist;
  const isInWishlist = wishlistContext?.isInWishlist;

  // LIKE STATUS (unchanged logic)
  const liked =
    product?.id && isInWishlist
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

  // WISHLIST
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

  if (!product) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.05 }}
      transition={{ duration: 0.25 }}
      className="bg-white rounded-2xl shadow-md overflow-hidden relative"
    >

      {/* WISHLIST BUTTON */}
      <button
        onClick={handleWishlist}
        className="absolute top-3 right-3 text-2xl z-10"
      >
        {liked ? "❤️" : "🤍"}
      </button>

      {/* IMAGE */}
      <img
        src={product.image}
        alt={product.name}
        className="h-52 w-full object-cover"
      />

      {/* CONTENT */}
      <div className="p-4">

        <h2 className="text-lg font-semibold mb-2 line-clamp-1">
          {product.name}
        </h2>

        <p className="text-gray-600 mb-4 font-medium">
          ₹ {product.price}
        </p>

        <div className="flex flex-col sm:flex-row gap-2">

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
            View
          </button>

        </div>

      </div>

    </motion.div>
  );
}

export default ProductCard;