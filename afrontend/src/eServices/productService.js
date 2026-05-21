import api from "./api";

// GET ALL PRODUCTS
export const getProducts = async () => {

  const res =
    await api.get("/products");

  return res.data;
};

// GET SINGLE PRODUCT
export const getSingleProduct =
  async (id) => {

    const res =
      await api.get(
        `/products/${id}`
      );

    return res.data;
};