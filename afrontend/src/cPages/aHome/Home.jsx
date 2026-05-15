import {
  useContext,
  useState,
  useEffect,
  useMemo,
} from "react";

import SearchContext from "../../fContext/cSearchContext.jsx";
import ProductCard from "../../bComponents/cProductCard/aProductCard.jsx";
import ProductSkeleton from "../../bComponents/cProductCard/bProductSkeleton.jsx";
import products from "../../jData/Products.js";

function Home() {

  const searchTerm =
    useContext(SearchContext)?.searchTerm || "";

  const [loading, setLoading] = useState(true);

  const [category, setCategory] = useState("All");

  const [sortBy, setSortBy] = useState("");

  useEffect(() => {

    const timer = setTimeout(() => {
      setLoading(false);
    }, 800);

    return () => clearTimeout(timer);

  }, []);

  const filteredProducts = useMemo(() => {

    let filtered = [...products];

    // SEARCH
    filtered = filtered.filter((product) =>
      product.name
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
    );

    // CATEGORY
    if (category !== "All") {
      filtered = filtered.filter(
        (product) =>
          product.category === category
      );
    }

    // SORT
    if (sortBy === "low") {
      filtered.sort(
        (a, b) => a.price - b.price
      );
    }

    if (sortBy === "high") {
      filtered.sort(
        (a, b) => b.price - a.price
      );
    }

    return filtered;

  }, [searchTerm, category, sortBy]);

  return (
    <div className="min-h-screen bg-gray-100">

      {/* HERO */}
      <div className="bg-gradient-to-r from-black via-gray-900 to-gray-800 text-white py-28 px-6">

        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-12">

          <div className="flex-1 text-center md:text-left">

            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              Shop Smarter
              <br />
              With GoGrab
            </h1>

            <p className="text-gray-300 mb-10">
              Premium shopping experience.
            </p>

            <a href="#products">

              <button className="bg-white text-black px-8 py-4 rounded-2xl hover:scale-105 transition">
                Explore Products
              </button>

            </a>

          </div>

        </div>

      </div>

      {/* FILTER BAR */}
      <div className="max-w-7xl mx-auto px-6 pt-10">

        <div className="bg-white rounded-2xl shadow-md p-4 flex flex-col md:flex-row gap-4 md:items-center md:justify-between">

          {/* CATEGORY */}
          <select
            value={category}
            onChange={(e) =>
              setCategory(e.target.value)
            }
            className="border rounded-xl px-4 py-3 outline-none"
          >

            <option value="All">
              All Categories
            </option>

            <option value="Electronics">
              Electronics
            </option>

            <option value="Accessories">
              Accessories
            </option>

            <option value="Laptops">
              Laptops
            </option>

            <option value="Smart Gadgets">
              Smart Gadgets
            </option>

          </select>

          {/* SORT */}
          <select
            value={sortBy}
            onChange={(e) =>
              setSortBy(e.target.value)
            }
            className="border rounded-xl px-4 py-3 outline-none"
          >

            <option value="">
              Sort By
            </option>

            <option value="low">
              Price: Low to High
            </option>

            <option value="high">
              Price: High to Low
            </option>

          </select>

        </div>

      </div>

      {/* PRODUCTS */}
      <div
        id="products"
        className="max-w-7xl mx-auto px-6 py-20"
      >

        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-10">

          <h2 className="text-4xl font-bold">
            Featured Products
          </h2>

          <p className="text-gray-600 mt-2 md:mt-0">
            Showing {filteredProducts.length} products
          </p>

        </div>

        {loading ? (

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">

            {Array(8)
              .fill(0)
              .map((_, i) => (
                <ProductSkeleton key={i} />
              ))}

          </div>

        ) : filteredProducts.length === 0 ? (

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