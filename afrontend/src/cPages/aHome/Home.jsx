import { useContext, useState, useEffect } from "react";

import SearchContext from "../../fContext/cSearchContext.jsx";
import ProductCard from "../../bComponents/cProductCard/aProductCard.jsx";
import ProductSkeleton from "../../bComponents/cProductCard/bProductSkeleton.jsx";
import products from "../../jData/Products.js";

function Home() {
  const searchTerm = useContext(SearchContext)?.searchTerm || "";

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  const filteredProducts = products.filter((p) =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-100">
      {/* HERO */}
      <div className="bg-gradient-to-r from-black via-gray-900 to-gray-800 text-white py-28 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-12">

          <div className="flex-1 text-center md:text-left">
            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              Shop Smarter <br /> With GoGrab
            </h1>

            <p className="text-gray-300 mb-10">
              Premium shopping experience.
            </p>

            <a href="#products">
              <button className="bg-white text-black px-8 py-4 rounded-2xl">
                Explore Products
              </button>
            </a>
          </div>

        </div>
      </div>

      {/* PRODUCTS */}
      <div id="products" className="max-w-7xl mx-auto px-6 py-20">

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {Array(8).fill(0).map((_, i) => (
              <ProductSkeleton key={i} />
            ))}
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="text-center py-20 text-gray-500">
            No products found
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {filteredProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        )}

      </div>
    </div>
  );
}

export default Home;