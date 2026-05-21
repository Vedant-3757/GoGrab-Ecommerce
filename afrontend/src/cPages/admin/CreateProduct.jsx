import { useState } from "react";
import toast from "react-hot-toast";
import { motion } from "framer-motion";

import api from "../../eServices/api";

function CreateProduct() {

  const [name, setName] =
    useState("");

  const [description, setDescription] =
    useState("");

  const [price, setPrice] =
    useState("");

  const [category, setCategory] =
    useState("");

  const [images, setImages] =
    useState([]);

  const [previewImages, setPreviewImages] =
    useState([]);

  const [loading, setLoading] =
    useState(false);

  const handleImageChange = (e) => {

    const files =
      [...e.target.files];

    setImages(files);

    const previewUrls =
      files.map((file) =>
        URL.createObjectURL(file)
      );

    setPreviewImages(previewUrls);

  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    if (
      !name ||
      !description ||
      !price ||
      !category ||
      images.length === 0
    ) {

      toast.error(
        "Please fill all fields"
      );

      return;

    }

    setLoading(true);

    try {

      const formData =
        new FormData();

      formData.append(
        "name",
        name
      );

      formData.append(
        "description",
        description
      );

      formData.append(
        "price",
        price
      );

      formData.append(
        "category",
        category
      );

      images.forEach((img) => {

        formData.append(
          "images",
          img
        );

      });

      const res =
        await api.post(
          "/products",
          formData,
          {
            headers: {
              "Content-Type":
                "multipart/form-data",
            },
          }
        );

      console.log(res.data);

      toast.success(
        "Product Created Successfully"
      );

      setName("");
      setDescription("");
      setPrice("");
      setCategory("");
      setImages([]);
      setPreviewImages([]);

    } catch (err) {

      console.log(err);

      toast.error(
        "Error creating product"
      );

    }

    setLoading(false);

  };

  return (

    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{
        duration: 0.3,
      }}
      className="min-h-screen bg-gray-100 px-4 py-10"
    >

      <div className="max-w-3xl mx-auto bg-white rounded-3xl shadow-lg p-6 sm:p-8">

        <h1 className="text-3xl font-bold mb-8">
          Add New Product
        </h1>

        <form
          onSubmit={handleSubmit}
          className="space-y-6"
        >

          <input
            type="text"
            placeholder="Product Name"
            value={name}
            onChange={(e) =>
              setName(e.target.value)
            }
            className="w-full border border-gray-300 p-4 rounded-2xl outline-none focus:border-black"
          />

          <textarea
            placeholder="Product Description"
            value={description}
            onChange={(e) =>
              setDescription(
                e.target.value
              )
            }
            rows={5}
            className="w-full border border-gray-300 p-4 rounded-2xl outline-none focus:border-black resize-none"
          />

          <input
            type="number"
            placeholder="Price"
            value={price}
            onChange={(e) =>
              setPrice(e.target.value)
            }
            className="w-full border border-gray-300 p-4 rounded-2xl outline-none focus:border-black"
          />

          <select
            value={category}
            onChange={(e) =>
              setCategory(
                e.target.value
              )
            }
            className="w-full border border-gray-300 p-4 rounded-2xl outline-none focus:border-black"
          >

            <option value="">
              Select Category
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

          <input
            type="file"
            multiple
            onChange={
              handleImageChange
            }
            className="w-full border border-gray-300 p-4 rounded-2xl"
          />

          {previewImages.length > 0 && (

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">

              {previewImages.map(
                (img, index) => (

                  <img
                    key={index}
                    src={img}
                    alt="preview"
                    className="w-full h-32 object-cover rounded-2xl border"
                  />

                )
              )}

            </div>

          )}

          <motion.button
            whileTap={{
              scale: 0.97,
            }}
            whileHover={{
              scale: 1.01,
            }}
            type="submit"
            disabled={loading}
            className="w-full bg-black text-white py-4 rounded-2xl hover:bg-gray-800 transition disabled:opacity-60"
          >

            {loading
              ? "Creating Product..."
              : "Create Product"}

          </motion.button>

        </form>

      </div>

    </motion.div>

  );
}

export default CreateProduct; 