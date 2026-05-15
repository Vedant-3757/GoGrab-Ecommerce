import { useContext } from "react";

import {
  useNavigate,
  useParams,
} from "react-router-dom";

import toast from "react-hot-toast";

import { motion } from "framer-motion";

import products from "../../jData/Products.js";

import CartContext from "../../fContext/aCartContext.jsx";

import AuthContext from "../../fContext/eAuthContext.jsx";

function ProductDetails() {

  const { id } = useParams();

  const navigate = useNavigate();

  const product =
    products.find(
      (item) =>
        String(item.id) === String(id)
    );

  const cartContext =
    useContext(CartContext);

  const addToCart =
    cartContext?.addToCart;

  const authContext =
    useContext(AuthContext);

  const user =
    authContext?.user;

  if (!product) {

    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 px-6">

        <h1 className="text-3xl font-bold mb-4">
          Product Not Found
        </h1>

        <button
          onClick={() => navigate("/")}
          className="bg-black text-white px-6 py-3 rounded-2xl"
        >
          Back Home
        </button>

      </div>
    );

  }

  const handleAddToCart = () => {

    if (!user) {
      toast.error("Please login first");
      navigate("/login");
      return;
    }

    addToCart?.(product);

    toast.success("Added to cart");

  };

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4 sm:px-6">

      <div className="max-w-7xl mx-auto">

        <div className="bg-white rounded-3xl shadow-md overflow-hidden">

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 p-6 sm:p-10">

            {/* IMAGE */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4 }}
              className="flex justify-center items-center"
            >

              <div className="w-full max-w-xl bg-gray-100 rounded-3xl overflow-hidden">

                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-[300px] sm:h-[500px] object-cover"
                />

              </div>

            </motion.div>

            {/* DETAILS */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4 }}
              className="flex flex-col justify-center"
            >

              {/* STOCK */}
              <div className="mb-4">

                <span className="bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm font-semibold">
                  In Stock
                </span>

              </div>

              {/* NAME */}
              <h1 className="text-4xl sm:text-5xl font-bold leading-tight mb-6">

                {product.name}

              </h1>

              {/* PRICE */}
              <h2 className="text-3xl sm:text-4xl font-bold text-black mb-6">

                ₹ {product.price}

              </h2>

              {/* DESCRIPTION */}
              <p className="text-gray-600 text-lg leading-relaxed mb-8">

                Premium quality product with modern design and smooth user experience. Perfect for everyday usage with high durability and performance.

              </p>

              {/* HIGHLIGHTS */}
              <div className="space-y-4 mb-10">

                <div className="flex items-center gap-3">
                  <span className="text-2xl">🚚</span>
                  <p className="text-gray-700">
                    Free delivery across India
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <span className="text-2xl">🔒</span>
                  <p className="text-gray-700">
                    Secure payment system
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <span className="text-2xl">⭐</span>
                  <p className="text-gray-700">
                    Trusted premium quality
                  </p>
                </div>

              </div>

              {/* BUTTONS */}
              <div className="flex flex-col sm:flex-row gap-4">

                <motion.button
                  whileTap={{ scale: 0.95 }}
                  whileHover={{ scale: 1.02 }}
                  onClick={handleAddToCart}
                  className="bg-black text-white px-8 py-4 rounded-2xl font-semibold hover:bg-gray-800 transition w-full"
                >
                  Add To Cart
                </motion.button>

                <button
                  onClick={() => navigate("/cart")}
                  className="border border-black px-8 py-4 rounded-2xl font-semibold hover:bg-black hover:text-white transition w-full"
                >
                  Go To Cart
                </button>

              </div>

            </motion.div>

          </div>

        </div>

      </div>

    </div>
  );
}

export default ProductDetails;