import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../eServices/api";

function EditProduct() {

  const { id } = useParams();

  const navigate = useNavigate();

  const [product, setProduct] = useState({
    name: "",
    price: "",
    description: ""
  });

  const [loading, setLoading] =
    useState(false);

  // FETCH PRODUCT
  useEffect(() => {

    const fetchProduct = async () => {

      try {

        const res =
          await api.get(
            `/products/${id}`
          );

        setProduct(
          res.data.product || res.data
        );

      } catch (err) {

        console.log(err);

        alert(
          "Failed To Load Product"
        );

      }

    };

    if (id) {
      fetchProduct();
    }

  }, [id]);

  // UPDATE PRODUCT
  const updateProduct = async () => {

    try {

      setLoading(true);

      await api.put(
        `/products/${id}`,
        product
      );

      alert(
        "Product Updated Successfully"
      );

      navigate(
        "/admin/products"
      );

    } catch (err) {

      console.log(err);

      alert(
        "Update Failed"
      );

    } finally {

      setLoading(false);

    }

  };

  return (

    <div className="p-6 max-w-2xl mx-auto">

      <h1 className="text-3xl font-bold mb-6">

        Edit Product

      </h1>

      <div className="space-y-4">

        <input
          type="text"
          placeholder="Product Name"
          value={product.name || ""}
          onChange={(e) =>
            setProduct({
              ...product,
              name: e.target.value
            })
          }
          className="border p-3 w-full rounded-xl outline-none"
        />

        <input
          type="number"
          placeholder="Price"
          value={product.price || ""}
          onChange={(e) =>
            setProduct({
              ...product,
              price: e.target.value
            })
          }
          className="border p-3 w-full rounded-xl outline-none"
        />

        <textarea
          placeholder="Description"
          value={product.description || ""}
          onChange={(e) =>
            setProduct({
              ...product,
              description: e.target.value
            })
          }
          rows="5"
          className="border p-3 w-full rounded-xl outline-none resize-none"
        />

        <button
          onClick={updateProduct}
          disabled={loading}
          className="bg-black text-white px-6 py-3 rounded-xl hover:bg-gray-800 transition w-full"
        >

          {loading
            ? "Updating..."
            : "Update Product"}

        </button>

      </div>

    </div>

  );

}

export default EditProduct;