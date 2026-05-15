import { useContext, useMemo, useState } from "react";

import {
  useParams,
  useNavigate,
} from "react-router-dom";

import toast from "react-hot-toast";

import products from "../../jData/Products.js";

import CartContext from "../../fContext/aCartContext.jsx";
import AuthContext from "../../fContext/eAuthContext.jsx";

import ProductCard from "../../bComponents/cProductCard/aProductCard.jsx";

function SingleProduct() {

  const { id } = useParams();

  const navigate = useNavigate();

  const product = products.find(
    (p) => String(p.id) === String(id)
  );

  const { addToCart } =
    useContext(CartContext);

  const user =
    useContext(AuthContext)?.user;

  const [quantity, setQuantity] =
    useState(1);

  const relatedProducts = useMemo(() => {

    return products
      .filter(
        (p) =>
          p.id !== product?.id &&
          p.category === product?.category
      )
      .slice(0, 4);

  }, [product]);

  if (!product) {

    return (
      <div className="min-h-screen flex flex-col items-center justify-center">

        <h1 className="text-3xl font-bold mb-4">
          Product Not Found
        </h1>

        <button
          onClick={() => navigate("/")}
          className="bg-black text-white px-6 py-3 rounded-xl"
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

    for (let i = 0; i < quantity; i++) {
      addToCart(product);
    }

    toast.success("Added to cart");
  };

  return (
    <div className="min-h-screen bg-gray-100 px-6 py-10">

      <div className="max-w-7xl mx-auto">

        {/* MAIN PRODUCT */}
        <div className="bg-white rounded-3xl shadow-md p-6 md:p-10 grid grid-cols-1 lg:grid-cols-2 gap-10">

          {/* IMAGE */}
          <div className="flex items-center justify-center bg-gray-100 rounded-3xl p-6">

            <img
              src={product.image}
              alt={product.name}
              className="w-full max-w-md object-cover rounded-2xl"
            />

          </div>

          {/* DETAILS */}
          <div className="flex flex-col justify-center">

            <div className="mb-4">

              <span className="bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm font-semibold">
                In Stock
              </span>

            </div>

            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              {product.name}
            </h1>

            <p className="text-3xl font-bold text-black mb-6">
              ₹ {product.price}
            </p>

            <p className="text-gray-600 leading-7 mb-8">
              Premium quality product designed for modern users.
              Smooth experience, reliable performance and stylish design
              built for your daily lifestyle.
            </p>

            {/* DELIVERY */}
            <div className="bg-gray-100 rounded-2xl p-4 mb-8">

              <p className="font-semibold">
                🚚 Free Delivery Available
              </p>

              <p className="text-gray-500 text-sm mt-1">
                Delivery within 3-5 business days
              </p>

            </div>

            {/* QUANTITY */}
            <div className="flex items-center gap-4 mb-8">

              <button
                onClick={() =>
                  setQuantity((prev) =>
                    prev > 1 ? prev - 1 : 1
                  )
                }
                className="bg-gray-200 px-4 py-2 rounded-xl hover:bg-gray-300 transition"
              >
                -
              </button>

              <span className="text-2xl font-bold">
                {quantity}
              </span>

              <button
                onClick={() =>
                  setQuantity((prev) => prev + 1)
                }
                className="bg-gray-200 px-4 py-2 rounded-xl hover:bg-gray-300 transition"
              >
                +
              </button>

            </div>

            {/* ACTIONS */}
            <div className="flex flex-col sm:flex-row gap-4">

              <button
                onClick={handleAddToCart}
                className="bg-black text-white px-8 py-4 rounded-2xl hover:bg-gray-800 transition w-full"
              >
                Add To Cart
              </button>

              <button
                onClick={() => navigate("/cart")}
                className="border border-black px-8 py-4 rounded-2xl hover:bg-black hover:text-white transition w-full"
              >
                Go To Cart
              </button>

            </div>

          </div>

        </div>

        {/* RELATED PRODUCTS */}
        <div className="mt-16">

          <div className="flex items-center justify-between mb-8">

            <h2 className="text-4xl font-bold">
              Related Products
            </h2>

          </div>

          {relatedProducts.length === 0 ? (

            <div className="text-gray-500">
              No related products found
            </div>

          ) : (

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">

              {relatedProducts.map((item) => (

                <ProductCard
                  key={item.id}
                  product={item}
                />

              ))}

            </div>

          )}

        </div>

      </div>

    </div>
  );
}

export default SingleProduct;