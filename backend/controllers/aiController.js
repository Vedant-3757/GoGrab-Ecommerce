const OpenAI = require("openai");
const Product = require("../models/Product");

const client = new OpenAI({
  apiKey: process.env.AI_API_KEY,
  baseURL: process.env.AI_BASE_URL,
});

exports.askAI = async (req, res) => {
  try {
    const { prompt } = req.body;

    // STEP 1: SIMPLE PRODUCT SEARCH
    const products = await Product.find({
      $or: [
        { name: { $regex: prompt, $options: "i" } },
        { category: { $regex: prompt, $options: "i" } },
      ],
    }).limit(6);

    // IF PRODUCTS FOUND → RETURN DIRECTLY
    if (products.length > 0) {
      return res.json({
        success: true,
        text: `I found ${products.length} product(s) for you.`,
        products,
      });
    }

    // STEP 2: NORMAL AI CHAT
    const completion = await client.chat.completions.create({
      model: process.env.AI_MODEL,

      messages: [
        {
          role: "system",
          content: `
You are GoGrab AI assistant.

Rules:
- Reply in same language user uses.
- Marathi typed in English → Marathi response.
- Hindi → Hindi response.
- English → English response.
- Keep replies short.
- Focus on shopping only.
- If product not found, say "not available on GoGrab".
`,
        },
        {
          role: "user",
          content: prompt,
        },
      ],

      temperature: 0.7,
      max_tokens: 120,
    });

    return res.json({
      success: true,
      text: completion.choices[0].message.content,
      products: [],
    });
  } catch (error) {
    console.log("AI ERROR:", error);

    return res.status(500).json({
      success: false,
      text: "AI Error",
    });
  }
};