import { useContext, useState, useEffect } from "react";

import { motion } from "framer-motion";

import SearchContext from "../../fContext/cSearchContext.jsx";

import ProductCard from "../../bComponents/cProductCard/aProductCard.jsx";

import ProductSkeleton from "../../bComponents/cProductCard/bProductSkeleton.jsx";

import products from "../../jData/Products.js";

function Home() {

  const searchTerm =
    useContext(SearchContext)?.searchTerm || "";

  const [loading, setLoading] =
    useState(true);

  const [sortBy, setSortBy] =
    useState("default");

  useEffect(() => {

    const timer =
      setTimeout(() => {
        setLoading(false);
      }, 800);

    return () => clearTimeout(timer);

  }, []);

  let filteredProducts =
    products.filter((p) =>
      p.name
        .toLowerCase()
        .includes(
          searchTerm.toLowerCase()
        )
    );

  // SORTING
  if (sortBy === "low-high") {

    filteredProducts =
      [...filteredProducts].sort(
        (a, b) => a.price - b.price
      );

  }

  if (sortBy === "high-low") {

    filteredProducts =
      [...filteredProducts].sort(
        (a, b) => b.price - a.price
      );

  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{
        duration: 0.35,
        ease: "easeInOut",
      }}
      className="min-h-screen bg-gray-100"
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
              Discover premium gadgets,
              accessories and smart
              shopping with modern UX.
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

          {/* HERO CARD */}
          <div className="flex-1 flex justify-center">

            <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-3xl p-8 w-72 h-72 flex items-center justify-center shadow-2xl">

              <div className="text-center">

                <div className="text-6xl mb-4">
                  🛍️
                </div>

                <p className="text-lg font-semibold">
                  Fast Shopping
                </p>

                <p className="text-sm text-gray-300">
                  Premium Experience
                </p>

              </div>

            </div>

          </div>

        </div>

      </div>

      {/* CATEGORIES */}
      <div className="max-w-7xl mx-auto px-6 py-14">

        <h2 className="text-4xl font-bold mb-10">
          Categories
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">

          <motion.div
            whileHover={{
              y: -5,
            }}
            className="bg-white p-8 rounded-2xl shadow-md hover:shadow-2xl transition text-center cursor-pointer"
          >
            📱 Electronics
          </motion.div>

          <motion.div
            whileHover={{
              y: -5,
            }}
            className="bg-white p-8 rounded-2xl shadow-md hover:shadow-2xl transition text-center cursor-pointer"
          >
            🎧 Accessories
          </motion.div>

          <motion.div
            whileHover={{
              y: -5,
            }}
            className="bg-white p-8 rounded-2xl shadow-md hover:shadow-2xl transition text-center cursor-pointer"
          >
            💻 Laptops
          </motion.div>

          <motion.div
            whileHover={{
              y: -5,
            }}
            className="bg-white p-8 rounded-2xl shadow-md hover:shadow-2xl transition text-center cursor-pointer"
          >
            ⌚ Smart Gadgets
          </motion.div>

        </div>

      </div>

      {/* PRODUCTS */}
      <div
        id="products"
        className="max-w-7xl mx-auto px-6 pb-20"
      >

        {/* TOP BAR */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5 mb-10">

          <div>

            <h2 className="text-4xl font-bold">
              Featured Products
            </h2>

            <p className="text-gray-500 mt-2">
              Showing
              {" "}
              {filteredProducts.length}
              {" "}
              products
            </p>

          </div>

          {/* SORT */}
          <select
            value={sortBy}
            onChange={(e) =>
              setSortBy(e.target.value)
            }
            className="bg-white border border-gray-300 px-4 py-3 rounded-2xl outline-none"
          >

            <option value="default">
              Sort By
            </option>

            <option value="low-high">
              Price: Low to High
            </option>

            <option value="high-low">
              Price: High to Low
            </option>

          </select>

        </div>

        {/* LOADING */}
        {loading ? (

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">

            {Array(8)
              .fill(0)
              .map((_, i) => (
                <ProductSkeleton key={i} />
              ))}

          </div>

        ) : filteredProducts.length === 0 ? (

          <div className="text-center py-24">

            <div className="text-6xl mb-4">
              😢
            </div>

            <h2 className="text-2xl font-bold mb-2">
              No Products Found
            </h2>

            <p className="text-gray-500">
              Try searching something else
            </p>

          </div>

        ) : (

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">

            {filteredProducts.map((p) => (

              <ProductCard
                key={p.id}
                product={p}
              />

            ))}

          </div>

        )}

      </div>

    </motion.div>
  );
}

export default Home;