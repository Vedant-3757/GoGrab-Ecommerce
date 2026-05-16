import { useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { motion } from "framer-motion";

import products from "../../jData/Products.js";
import CartContext from "../../fContext/aCartContext.jsx";
import AuthContext from "../../fContext/eAuthContext.jsx";

function ProductDetails() {

  const { id } = useParams();

  const navigate = useNavigate();

  const product = products.find(
    (p) => String(p.id) === String(id)
  );

  const cartContext =
    useContext(CartContext);

  const addToCart =
    cartContext?.addToCart;

  const user =
    useContext(AuthContext)?.user;

  if (!product) {

    return (

      <div className="min-h-screen flex flex-col items-center justify-center px-6 text-center">

        <div className="text-6xl mb-4">
          😢
        </div>

        <h1 className="text-3xl font-bold mb-3">
          Product Not Found
        </h1>

        <p className="text-gray-500 mb-6">
          This product does not exist
        </p>

        <button
          onClick={() =>
            navigate("/")
          }
          className="bg-black text-white px-6 py-3 rounded-xl hover:bg-gray-800 transition"
        >
          Back Home
        </button>

      </div>

    );
  }

  const handleAddToCart = () => {

    if (!user) {

      toast.error(
        "Please login first"
      );

      navigate(
        "/login",
        {
          state: {
            from: `/product/${product.id}`,
          },
        }
      );

      return;
    }

    addToCart?.(product);

    toast.success(
      "Added to cart"
    );
  };

  const handleBuyNow = () => {

    if (!user) {

      toast.error(
        "Please login first"
      );

      navigate(
        "/login",
        {
          state: {
            from: `/product/${product.id}`,
          },
        }
      );

      return;
    }

    navigate(
      "/checkout",
      {
        state: {
          buyNowProduct: {
            ...product,
            quantity: 1,
          },
        },
      }
    );
  };

  return (

    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{
        duration: 0.35,
        ease: "easeInOut",
      }}
      className="min-h-screen bg-gray-100 px-4 sm:px-6 py-8 sm:py-10"
    >

      <div className="max-w-7xl mx-auto">

        <div className="bg-white rounded-3xl shadow-lg grid grid-cols-1 lg:grid-cols-2 overflow-hidden">

          <div className="p-8 flex items-center justify-center bg-gray-50">

            <motion.img
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.3 }}
              src={product.image}
              className="w-full max-w-md rounded-2xl object-cover"
              alt={product.name}
            />

          </div>

          <div className="p-8 sm:p-10 flex flex-col justify-center">

            <div className="mb-3">

              <span className="bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm font-medium">
                In Stock
              </span>

            </div>

            <h1 className="text-3xl sm:text-4xl font-bold mb-6 break-words">

              {product.name}

            </h1>

            <div className="text-3xl font-bold mb-6">

              ₹ {product.price}

            </div>

            <p className="text-gray-600 leading-7 mb-8">

              Premium quality product with modern design and excellent performance for your daily needs.

            </p>

            <div className="flex flex-col sm:flex-row gap-4">

              <motion.button
                whileTap={{ scale: 0.95 }}
                whileHover={{ scale: 1.02 }}
                onClick={handleAddToCart}
                className="bg-black text-white px-6 py-4 rounded-2xl w-full hover:bg-gray-800 transition"
              >
                Add To Cart
              </motion.button>

              <motion.button
                whileTap={{ scale: 0.95 }}
                whileHover={{ scale: 1.02 }}
                onClick={handleBuyNow}
                className="border border-black px-6 py-4 rounded-2xl w-full hover:bg-black hover:text-white transition"
              >
                Buy Now
              </motion.button>

            </div>

          </div>

        </div>

      </div>

    </motion.div>

  );
}

export default ProductDetails;