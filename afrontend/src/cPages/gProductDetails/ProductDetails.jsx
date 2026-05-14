import { useContext } from "react";

import {
  useParams,
  useNavigate,
} from "react-router-dom";

import products from "../../jData/Products.js";

import CartContext from "../../fContext/aCartContext.jsx";
import AuthContext from "../../fContext/eAuthContext.jsx";

function ProductDetails() {

  const { id } = useParams();

  const navigate = useNavigate();

  // FIND PRODUCT
  const product = products.find(
    (item) => item.id === Number(id)
  );

  // CART
  const cartContext =
    useContext(CartContext);

  const addToCart =
    cartContext?.addToCart;

  // AUTH
  const authContext =
    useContext(AuthContext);

  const user =
    authContext?.user;

  // PRODUCT NOT FOUND
  if (!product) {

    return (
      <div className="min-h-screen flex items-center justify-center text-3xl font-bold">
        Product Not Found
      </div>
    );
  }

  // ADD TO CART
  const handleAddToCart = () => {

    if (!user) {

      navigate("/login");

      return;
    }

    addToCart(product);

    alert("Product Added To Cart");
  };

  // GRAB IT NOW
  const handleBuyNow = () => {

  // NOT LOGGED IN
  if (!user) {

    navigate("/login", {
      state: {
        redirectToCheckout: true,
        buyNowProduct: product,
      },
    });

    return;
  }

  // LOGGED IN
  navigate("/checkout", {
    state: {
      buyNowProduct: product,
    },
  });
};

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-6">

      <div className="max-w-7xl mx-auto bg-white rounded-3xl shadow-lg overflow-hidden grid md:grid-cols-2 gap-10 p-8">

        {/* IMAGE */}
        <div>

          <img
            src={product.image}
            alt={product.name}
            className="w-full h-125 object-cover rounded-2xl"
          />

        </div>

        {/* DETAILS */}
        <div className="flex flex-col justify-center">

          <h1 className="text-5xl font-bold mb-6">
            {product.name}
          </h1>

          <p className="text-3xl font-semibold text-gray-800 mb-6">
            ₹ {product.price}
          </p>

          <p className="text-gray-600 text-lg leading-relaxed mb-8">
            Premium quality product from GoGrab.
            Designed for performance, style,
            and modern shopping experience.
          </p>

          {/* STOCK */}
          <div className="mb-8">

            <span className="bg-green-100 text-green-700 px-4 py-2 rounded-full font-semibold">
              In Stock
            </span>

          </div>

          {/* BUTTONS */}
          <div className="flex flex-col sm:flex-row gap-4">

            <button
              onClick={handleAddToCart}
              className="bg-black text-white px-8 py-4 rounded-2xl hover:bg-gray-800 transition"
            >
              Add To Cart
            </button>

            <button
              onClick={handleBuyNow}
              className="bg-orange-500 text-white px-8 py-4 rounded-2xl hover:bg-orange-600 transition"
            >
              Grab It Now
            </button>

          </div>

        </div>
      </div>
    </div>
  );
}

export default ProductDetails;