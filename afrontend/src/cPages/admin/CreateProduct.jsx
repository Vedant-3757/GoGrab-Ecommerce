import { useState } from "react";
import api from "../../eServices/api";

function CreateProduct() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");

  {/* multiple image state */}
  const [images, setImages] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();

      formData.append("name", name);
      formData.append("description", description);
      formData.append("price", price);
      formData.append("category", category);

      {/* multiple image loop */}
      images.forEach((img) => {
        formData.append("images", img);
      });

      const res = await api.post("/products", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      alert("Product Created Successfully");
      console.log(res.data);

      {/*reset*/}
      setName("");
      setDescription("");
      setPrice("");
      setCategory("");
      setImages([]);
    } catch (err) {
      console.log(err);
      alert("Error creating product");
    }
  };

  return (
    <div className="min-h-screen p-6 bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="max-w-2xl mx-auto bg-white p-6 rounded-xl space-y-4"
      >
        <h1 className="text-2xl font-bold">Create Product</h1>

        <input
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full border p-2"
        />

        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full border p-2"
        />

        <input
          placeholder="Price"
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className="w-full border p-2"
        />

        <input
          placeholder="Category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full border p-2"
        />

        {/* multiple images input */}
        <input
          type="file"
          multiple
          onChange={(e) =>
            setImages([...e.target.files])
          }
          className="w-full border p-2"
        />

        <button
          type="submit"
          className="w-full bg-black text-white p-3"
        >
          Create Product
        </button>
      </form>
    </div>
  );
}

export default CreateProduct;