import api from "../eServices/api";

export const getAIResponse = async (prompt) => {
  const res = await api.post("/ai/chat", { prompt });

  return {
    text: res.data.text,
    products: res.data.products || [],
  };
};