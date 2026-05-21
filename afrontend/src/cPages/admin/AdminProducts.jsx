import { useEffect, useState } from "react";
import api from "../../eServices/api";
import { useNavigate } from "react-router-dom";

function AdminProducts() {

  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  // ✔ FETCH PRODUCTS
  useEffect(() => {

    const fetchProducts = async () => {
      try {
        const res = await api.get("/products");
        setProducts(res.data);
      } catch (err) {
        console.log("Fetch error:", err);
      }
    };

    fetchProducts();

  }, []);

  // ✔ DELETE PRODUCT
  const deleteProduct = async (id) => {
    try {
      await api.delete(`/products/${id}`);

      setProducts((prev) =>
        prev.filter((p) => p._id !== id)
      );

    } catch (err) {
      console.log("Delete error:", err);
    }
  };

  return (
    <div>

      {/* HEADER */}
      <div className="flex justify-between mb-6">
        <h1 className="text-2xl font-bold">
          Products
        </h1>

        <button
          onClick={() => navigate("/admin/add-product")}
          className="bg-black text-white px-4 py-2 rounded"
        >
          + Add Product
        </button>
      </div>

      {/* PRODUCT LIST */}
      <div className="grid gap-4">

        {products.map((p) => (
          <div
            key={p._id}
            className="bg-white p-4 rounded shadow flex justify-between items-center"
          >

            {/* DETAILS */}
            <div>
              <h2 className="font-semibold">
                {p.name}
              </h2>

              <p className="text-gray-600">
                ₹ {p.price}
              </p>
            </div>

            {/* ACTIONS */}
            <div className="flex gap-2">

              <button
                onClick={() =>
                  navigate(`/admin/edit-product/${p._id}`)
                }
                className="bg-blue-500 text-white px-3 py-1 rounded"
              >
                Edit
              </button>

              <button
                onClick={() => deleteProduct(p._id)}
                className="bg-red-500 text-white px-3 py-1 rounded"
              >
                Delete
              </button>

            </div>

          </div>
        ))}

      </div>

    </div>
  );
}

export default AdminProducts;