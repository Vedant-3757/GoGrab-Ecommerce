
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../../eServices/api";
import ProductCard from "../../bComponents/cProductCard/aProductCard.jsx";

function CategoryProducts() {
  const { category } = useParams();

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await api.get("/products");
        setProducts(res.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  
  const selectedCategory = decodeURIComponent(
    category || ""
  ).toLowerCase();

  const filteredProducts =
    selectedCategory === "new arrivals"
      ? [...products].sort((a, b) =>
          String(b._id || b.id).localeCompare(
            String(a._id || a.id)
          )
        )
      : products.filter((product) => {
          const productCategory = (
            product.category || ""
          ).toLowerCase();

          if (selectedCategory === "electronics") {
            return [
              "electronics",
              "laptops",
              "laptop",
              "accessories",
              "smart gadgets",
            ].includes(productCategory);
          }

          if (selectedCategory === "clothing") {
            return ["clothing", "clothes"].includes(
              productCategory
            );
          }

          if (selectedCategory === "food") {
            return productCategory === "food";
          }

          return productCategory === selectedCategory;
        });

    return (
      <div className="min-h-screen bg-gray-50 px-6 py-10">
        <h1 className="mb-8 text-3xl font-bold text-gray-900">
          {decodeURIComponent(category || "")}
        </h1>

        {loading ? (
          <p>Loading products...</p>
        ) : filteredProducts.length === 0 ? (
          <p>No products found in this category.</p>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product._id || product.id}
                product={product}
              />
            ))}
          </div>
        )}
      </div>
    );
  }

export default CategoryProducts;
