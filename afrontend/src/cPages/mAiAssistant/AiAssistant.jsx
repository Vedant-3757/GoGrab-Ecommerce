import { useState } from "react";
import { getAIResponse } from "../../services/aiServices.js";
import ProductCard from "../../bComponents/cProductCard/aProductCard.jsx";

function AiAssistant() {
  const [messages, setMessages] = useState([
    {
      role: "bot",
      text: "Hi 👋 I am GoGrab AI. Ask me about products!"
    }
  ]);

  const [input, setInput] = useState("");

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMsg = { role: "user", text: input };
    setMessages((prev) => [...prev, userMsg]);

    try {
      const response = await getAIResponse(input);

      const botMsg = {
        role: "bot",
        text: response.text,
        products: response.products || []
      };

      setMessages((prev) => [...prev, botMsg]);
    } catch  {
      setMessages((prev) => [
        ...prev,
        { role: "bot", text: "Something went wrong. Try again." }
      ]);
    }

    setInput("");
  };

  return (
    <div className="h-[calc(100vh-72px)] flex flex-col bg-gradient-to-br from-gray-100 to-gray-200 overflow-hidden">

      {/* HEADER (NO GAP FIX) */}
      <div className="px-4 py-2 bg-white border-b shadow-sm">
        <h1 className="text-lg font-bold">
          GoGrab AI Assistant 🤖
        </h1>

        <p className="text-xs text-gray-500">
          Ask anything — products, prices, recommendations
        </p>
      </div>

      {/* CHAT AREA */}
      <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3">

        {messages.map((msg, index) => (
          <div key={index} className="space-y-2">

            <div
              className={`max-w-xl px-4 py-3 rounded-xl text-sm shadow ${
                msg.role === "user"
                  ? "bg-black text-white ml-auto"
                  : "bg-white text-gray-800"
              }`}
            >
              {msg.text}
            </div>

            {msg.products?.length > 0 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {msg.products.map((p) => (
                  <ProductCard key={p.id} product={p} />
                ))}
              </div>
            )}

          </div>
        ))}

      </div>

      {/* INPUT FIXED BOTTOM */}
      <div className="p-3 bg-white border-t shadow-md shrink-0">
        <div className="max-w-2xl mx-auto flex gap-2">

          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
            placeholder="Ask something..."
            className="flex-1 border rounded-xl px-4 py-2 outline-none focus:border-black"
          />

          <button
            onClick={handleSend}
            className="bg-black text-white px-4 py-2 rounded-xl"
          >
            Send
          </button>

        </div>
      </div>

    </div>
  );
}

export default AiAssistant;