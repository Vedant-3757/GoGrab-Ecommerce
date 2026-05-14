import { useContext } from "react";

import SearchContext from "../../fContext/cSearchContext.jsx";
import ProductCard from "../../bComponents/cProductCard/aProductCard.jsx";
import products from "../../jData/Products.js";

function Home() {

  const context = useContext(SearchContext);

  // safety check (prevents white screen crash)
  const searchTerm = context?.searchTerm || "";

  const filteredProducts = products.filter((product) =>
    product.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-100">

      {/* HERO SECTION */}
      <div
        style={{
          background:
            "linear-gradient(to right, black, #1f2937)",
        }}
        className="text-white py-24 px-6"
      >
        <div className="max-w-7xl mx-auto">

          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            Shop Smarter
            <br />
            With GoGrab
          </h1>

          <p className="text-lg text-gray-300 max-w-2xl mb-8">
            Discover premium gadgets, electronics
            and accessories with the best shopping
            experience.
          </p>

          <button className="bg-white text-black px-8 py-4 rounded-2xl font-semibold hover:scale-105 transition">
            Explore Products
          </button>

        </div>
      </div>

      {/* CATEGORY SECTION */}
      <div className="max-w-7xl mx-auto px-6 py-14">

        <h2 className="text-4xl font-bold mb-8">
          Categories
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">

          <div className="bg-white p-8 rounded-2xl shadow-md text-center hover:scale-105 transition">
            📱 Electronics
          </div>

          <div className="bg-white p-8 rounded-2xl shadow-md text-center hover:scale-105 transition">
            🎧 Accessories
          </div>

          <div className="bg-white p-8 rounded-2xl shadow-md text-center hover:scale-105 transition">
            💻 Laptops
          </div>

          <div className="bg-white p-8 rounded-2xl shadow-md text-center hover:scale-105 transition">
            ⌚ Smart Gadgets
          </div>

        </div>
      </div>

      {/* PRODUCTS */}
      <div className="max-w-7xl mx-auto px-6 pb-16">

        <h2 className="text-4xl font-bold mb-10">
          Featured Products
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">

          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
            />
          ))}

        </div>
      </div>
    </div>
  );
}

export default Home;