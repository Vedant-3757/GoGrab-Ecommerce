import { useContext } from "react";

import SearchContext from "../../fContext/cSearchContext.jsx";
import ProductCard from "../../bComponents/cProductCard/aProductCard.jsx";
import products from "../../jData/Products.js";

function Home() {

  const context = useContext(SearchContext);

  const searchTerm = context?.searchTerm || "";

  const filteredProducts = products.filter((product) =>
    product.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-100">

      {/* HERO SECTION (UPGRADED) */}
      <div className="bg-gradient-to-r from-black via-gray-900 to-gray-800 text-white py-28 px-6">

        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-12">

          {/* LEFT CONTENT */}
          <div className="flex-1 text-center md:text-left">

            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
              Shop Smarter
              <br />
              With GoGrab
            </h1>

            <p className="text-lg text-gray-300 max-w-xl mb-10">
              Discover premium gadgets, electronics and accessories with a smooth, fast and modern shopping experience built for you.
            </p>

            <a href="#products">
              <button className="bg-white text-black px-8 py-4 rounded-2xl font-semibold hover:scale-105 transition">
                Explore Products
              </button>
            </a>

          </div>

          {/* RIGHT VISUAL CARD */}
          <div className="flex-1 flex justify-center">

            <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-3xl p-8 w-72 h-72 flex items-center justify-center shadow-2xl">

              <div className="text-center">

                <div className="text-6xl mb-4">🛍️</div>

                <p className="text-lg font-semibold">
                  Fast Shopping
                </p>

                <p className="text-sm text-gray-300">
                  Modern UI Experience
                </p>

              </div>

            </div>

          </div>

        </div>

      </div>

      {/* CATEGORY SECTION */}
      <div className="max-w-7xl mx-auto px-6 py-14">

        <h2 className="text-4xl font-bold mb-10">
          Categories
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">

          <div className="bg-white p-8 rounded-2xl shadow-md text-center hover:shadow-xl hover:scale-105 transition cursor-pointer">
            📱 Electronics
          </div>

          <div className="bg-white p-8 rounded-2xl shadow-md text-center hover:shadow-xl hover:scale-105 transition cursor-pointer">
            🎧 Accessories
          </div>

          <div className="bg-white p-8 rounded-2xl shadow-md text-center hover:shadow-xl hover:scale-105 transition cursor-pointer">
            💻 Laptops
          </div>

          <div className="bg-white p-8 rounded-2xl shadow-md text-center hover:shadow-xl hover:scale-105 transition cursor-pointer">
            ⌚ Smart Gadgets
          </div>

        </div>

      </div>

      {/* PRODUCTS */}
      <div id="products" className="max-w-7xl mx-auto px-6 pb-20">

        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-10">

          <h2 className="text-4xl font-bold">
            Featured Products
          </h2>

          <p className="text-gray-600 mt-2 md:mt-0">
            Showing {filteredProducts.length} products
          </p>

        </div>

        {/* EMPTY STATE */}
        {filteredProducts.length === 0 ? (
          <div className="text-center py-20 text-gray-500 text-lg">
            No products found 😢
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">

            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
              />
            ))}

          </div>
        )}

      </div>
    </div>
  );
}

export default Home;