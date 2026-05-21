import { useContext, useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { motion } from "framer-motion";

import CartContext from "../../fContext/aCartContext.jsx";
import AuthContext from "../../fContext/eAuthContext.jsx";
import api from "../../eServices/api";

function ProductDetails() {

  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  const cartContext = useContext(CartContext);
  const addToCart = cartContext?.addToCart;

  const user = useContext(AuthContext)?.user;

  useEffect(() => {

    const fetchProduct = async () => {
      try {
        const res = await api.get(`/products/${id}`);
        setProduct(res.data);
      } catch (err) {
        console.log(err);
        setProduct(null);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();

  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-6 text-center">

        <div className="text-6xl mb-4">😢</div>

        <h1 className="text-3xl font-bold mb-3">
          Product Not Found
        </h1>

        <button
          onClick={() => navigate("/")}
          className="bg-black text-white px-6 py-3 rounded-xl hover:bg-gray-800 transition"
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

  const handleBuyNow = () => {

    if (!user) {
      toast.error("Please login first");
      navigate("/login");
      return;
    }

    navigate("/checkout", {
      state: {
        buyNowProduct: {
          ...product,
          quantity: 1,
        },
      },
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-gray-100 px-4 sm:px-6 py-8"
    >

      <div className="max-w-7xl mx-auto">

        <div className="bg-white rounded-3xl shadow-lg grid grid-cols-1 lg:grid-cols-2 overflow-hidden">

          <div className="p-8 flex items-center justify-center bg-gray-50">

            <img
              src={product.images?.[0]}
              className="w-full max-w-md rounded-2xl object-cover"
              alt={product.name}
            />

          </div>

          <div className="p-8">

            <h1 className="text-3xl font-bold mb-6">
              {product.name}
            </h1>

            <div className="text-3xl font-bold mb-6">
              ₹ {product.price}
            </div>

            <p className="text-gray-600 mb-8">
              {product.description}
            </p>

            <div className="flex gap-4">

              <button
                onClick={handleAddToCart}
                className="bg-black text-white px-6 py-4 rounded-2xl w-full"
              >
                Add To Cart
              </button>

              <button
                onClick={handleBuyNow}
                className="border border-black px-6 py-4 rounded-2xl w-full"
              >
                Buy Now
              </button>

            </div>

          </div>

        </div>

      </div>

    </motion.div>
  );
}

export default ProductDetails;