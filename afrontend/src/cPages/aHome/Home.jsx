import { useContext, useState, useEffect } from "react";
import { motion } from "framer-motion";

import SearchContext from "../../fContext/cSearchContext.jsx";
import ProductCard from "../../bComponents/cProductCard/aProductCard.jsx";
import ProductSkeleton from "../../bComponents/cProductCard/bProductSkeleton.jsx";
import products from "../../jData/Products.js";

function Home() {

  const searchTerm =
    useContext(SearchContext)?.searchTerm || "";

  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState("default");

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 800);

    return () => clearTimeout(timer);
  }, []);

  let filteredProducts = products.filter((p) =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (sortBy === "low-high") {
    filteredProducts = [...filteredProducts].sort(
      (a, b) => a.price - b.price
    );
  }

  if (sortBy === "high-low") {
    filteredProducts = [...filteredProducts].sort(
      (a, b) => b.price - a.price
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.35, ease: "easeInOut" }}
      className="min-h-[calc(100vh-72px)] bg-gray-100"
    >

      {/* HERO */}
      <div className="bg-gradient-to-r from-black via-gray-900 to-gray-800 text-white py-28 px-6">

        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-12">

          <div className="flex-1 text-center md:text-left">

            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              Shop Smarter
              <br />
              With GoGrab
            </h1>

            <p className="text-gray-300 mb-10 max-w-xl">
              Discover premium gadgets, accessories and smart shopping.
            </p>

            <a href="#products">
              <motion.button
                whileTap={{ scale: 0.95 }}
                whileHover={{ scale: 1.02 }}
                className="bg-white text-black px-8 py-4 rounded-2xl font-semibold"
              >
                Explore Products
              </motion.button>
            </a>

          </div>

          <div className="flex-1 flex justify-center">

            <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-3xl p-8 w-72 h-72 flex items-center justify-center shadow-2xl">

              <div className="text-center">
                <div className="text-6xl mb-4">🛍️</div>
                <p className="text-lg font-semibold">Fast Shopping</p>
                <p className="text-sm text-gray-300">Premium Experience</p>
              </div>

            </div>

          </div>

        </div>

      </div>

      {/* PRODUCTS */}
      <div id="products" className="max-w-7xl mx-auto px-6 py-20">

        <div className="flex justify-between items-center mb-10">

          <h2 className="text-4xl font-bold">
            Featured Products
          </h2>

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="bg-white border px-4 py-3 rounded-2xl"
          >
            <option value="default">Sort By</option>
            <option value="low-high">Low → High</option>
            <option value="high-low">High → Low</option>
          </select>

        </div>

        {loading ? (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {Array(8).fill(0).map((_, i) => (
              <ProductSkeleton key={i} />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">

            {filteredProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}

          </div>
        )}

      </div>

    </motion.div>
  );
}

export default Home;