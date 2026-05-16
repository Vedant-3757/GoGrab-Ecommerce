import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { motion } from "framer-motion";

import CartContext from "../../fContext/aCartContext.jsx";
import AuthContext from "../../fContext/eAuthContext.jsx";
import WishlistContext from "../../fContext/gWishlistContext.jsx";

function ProductCard({ product }) {

  const navigate = useNavigate();

  const user =
    useContext(AuthContext)?.user;

  const { addToCart } =
    useContext(CartContext);

  const wishlistContext =
    useContext(WishlistContext);

  const toggleWishlist =
    wishlistContext?.toggleWishlist;

  const isInWishlist =
    wishlistContext?.isInWishlist;

  const liked =
    product?.id &&
    isInWishlist
      ? isInWishlist(product.id)
      : false;

  const handleAddToCart = () => {

    if (!user) {

      toast.error(
        "Please login first"
      );

      navigate("/login");

      return;

    }

    addToCart(product);

    toast.success(
      "Added to cart"
    );

  };

  const handleWishlist = () => {

    if (!user) {

      toast.error(
        "Please login first"
      );

      navigate("/login");

      return;

    }

    toggleWishlist?.(product);

    toast.success(
      liked
        ? "Removed from wishlist"
        : "Added to wishlist"
    );

  };

  if (!product) return null;

  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 20,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      whileHover={{
        scale: 1.03,
      }}
      transition={{
        duration: 0.25,
      }}
      className="group bg-white rounded-2xl shadow-md hover:shadow-2xl hover:-translate-y-1 transition overflow-hidden relative"
    >

      {/* HEART */}
      <motion.button
        whileTap={{
          scale: 0.8,
        }}
        whileHover={{
          scale: 1.15,
        }}
        onClick={handleWishlist}
        className="absolute top-3 right-3 text-2xl z-10"
      >
        {liked ? "❤️" : "🤍"}
      </motion.button>

      <img
        src={product.image}
        alt={product.name}
        className="h-52 w-full object-cover transition duration-300 group-hover:scale-105"
      />

      <div className="p-4">

        <h2 className="text-lg font-semibold mb-2 line-clamp-1">
          {product.name}
        </h2>

        <p className="text-gray-600 mb-4 font-medium">
          ₹ {product.price}
        </p>

        <div className="flex flex-col sm:flex-row gap-2">

          <motion.button
            whileTap={{
              scale: 0.95,
            }}
            whileHover={{
              scale: 1.02,
            }}
            onClick={handleAddToCart}
            className="bg-black text-white px-4 py-2 rounded-xl hover:bg-gray-800 transition w-full"
          >
            Add To Cart
          </motion.button>

          <motion.button
            whileTap={{
              scale: 0.95,
            }}
            whileHover={{
              scale: 1.02,
            }}
            onClick={() =>
              navigate(
                `/product/${product.id}`
              )
            }
            className="border border-black px-4 py-2 rounded-xl hover:bg-black hover:text-white transition w-full"
          >
            View
          </motion.button>

        </div>

      </div>

    </motion.div>
  );
}

export default ProductCard;