import products from "../jData/Products.js";

export const getAIResponse = async (input) => {
  const query = input.toLowerCase();

  const matchedProducts = products.filter((p) =>
    p.name.toLowerCase().includes(query)
  );

  if (matchedProducts.length > 0) {
    return {
      text: `Found ${matchedProducts.length} product(s)`,
      products: matchedProducts
    };
  }

  return {
    text: "Sorry 😢 I couldn't find matching products",
    products: []
  };
};