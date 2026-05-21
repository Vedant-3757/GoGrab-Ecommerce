import { useContext, useEffect, useState } from "react";

import SearchContext from "../../fContext/cSearchContext.jsx";

import ProductCard from "../../bComponents/cProductCard/aProductCard.jsx";

import api from "../../eServices/api";

function Search() {

  const searchContext =
    useContext(SearchContext);

  const searchTerm =
    searchContext?.searchTerm || "";

  const [products, setProducts] = useState([]);

  useEffect(() => {

    const fetchProducts = async () => {

      try {

        const res = await api.get("/products");

        setProducts(res.data);

      } catch (err) {
        console.log(err);
      }

    };

    fetchProducts();

  }, []);

  const filteredProducts =
    products.filter(
      (product) =>
        (product.name || "")
          .toLowerCase()
          .includes(
            searchTerm.toLowerCase()
          )
    );

  return (
    <div className="min-h-screen bg-gray-100 p-6">

      <div className="max-w-7xl mx-auto">

        <h1 className="text-4xl font-bold mb-3">
          Search Results
        </h1>

        <p className="text-gray-600 mb-10">

          {searchTerm.trim()
            ? `${filteredProducts.length} products found for "${searchTerm}"`
            : "Search products from GoGrab"}

        </p>

        {filteredProducts.length === 0 ? (

          <div className="bg-white rounded-2xl p-10 text-center shadow-md">

            <div className="text-6xl mb-5">
              🔍
            </div>

            <h2 className="text-2xl font-semibold mb-4">
              No Products Found
            </h2>

            <p className="text-gray-500">
              Try searching with another keyword.
            </p>

          </div>

        ) : (

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">

            {filteredProducts.map(
              (product) => (

                <ProductCard
                  key={product._id}
                  product={product}
                />

              )
            )}

          </div>

        )}

      </div>

    </div>
  );
}

export default Search;