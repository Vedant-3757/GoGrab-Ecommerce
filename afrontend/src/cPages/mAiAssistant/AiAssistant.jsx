import { useState, useRef, useEffect } from "react";

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

  // ✅ NEW
  const [loading, setLoading] = useState(false);

  const chatContainerRef = useRef(null);

  // ✅ AUTO SCROLL
  useEffect(() => {

    const container =
      chatContainerRef.current;

    if (container) {

      container.scrollTo({
        top: container.scrollHeight,
        behavior: "smooth",
      });

    }

  }, [messages, loading]);

  const handleSend = async () => {

    if (!input.trim() || loading) return;

    const userMsg = {
      role: "user",
      text: input
    };

    setMessages((prev) => [
      ...prev,
      userMsg
    ]);

    // ✅ NEW
    setLoading(true);

    try {

      const response =
        await getAIResponse(input);

      const botMsg = {
        role: "bot",
        text: response.text,
        products:
          response.products || []
      };

      setMessages((prev) => [
        ...prev,
        botMsg
      ]);

    } catch {

      setMessages((prev) => [
        ...prev,
        {
          role: "bot",
          text:
            "Something went wrong. Try again."
        }
      ]);

    } finally {

      // ✅ NEW
      setLoading(false);

    }

    setInput("");
  };

  return (
    <div className="h-[calc(100vh-72px)] flex flex-col bg-gradient-to-br from-gray-100 to-gray-200 overflow-hidden">

      {/* HEADER */}
      <div className="px-4 py-2 bg-white border-b shadow-sm shrink-0">

        <h1 className="text-lg font-bold">
          GoGrab AI Assistant 🤖
        </h1>

        <p className="text-xs text-gray-500">
          Ask anything — products, prices, recommendations
        </p>

      </div>

      {/* CHAT AREA */}
      <div
        ref={chatContainerRef}
        className="flex-1 overflow-y-auto px-4 py-4 space-y-4"
      >

        {messages.map((msg, index) => (

          <div
            key={index}
            className={`flex ${
              msg.role === "user"
                ? "justify-end"
                : "justify-start"
            }`}
          >

            <div className="space-y-2 max-w-full">

              <div
                className={`max-w-[85%] sm:max-w-xl px-4 py-3 rounded-2xl text-sm shadow break-words ${
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

                    <ProductCard
                      key={p.id}
                      product={p}
                    />

                  ))}

                </div>

              )}

            </div>

          </div>

        ))}

        {/* ✅ LOADING MESSAGE */}
        {loading && (

          <div className="flex items-center gap-2 bg-white w-fit px-4 py-3 rounded-xl shadow">

            <div className="w-2 h-2 bg-black rounded-full animate-bounce"></div>

            <div className="w-2 h-2 bg-black rounded-full animate-bounce [animation-delay:0.2s]"></div>

            <div className="w-2 h-2 bg-black rounded-full animate-bounce [animation-delay:0.4s]"></div>

          </div>

        )}

      </div>

      {/* INPUT FIXED BOTTOM */}
      <div className="p-3 bg-white border-t shadow-md shrink-0">

        <div className="max-w-2xl mx-auto flex gap-2">

          <input
            value={input}
            onChange={(e) =>
              setInput(e.target.value)
            }
            onKeyDown={(e) =>
              e.key === "Enter" &&
              handleSend()
            }
            placeholder="Ask something..."
            disabled={loading}
            className="flex-1 border rounded-xl px-4 py-2 outline-none focus:border-black disabled:bg-gray-100"
          />

          <button
            onClick={handleSend}
            disabled={loading}
            className="bg-black text-white px-4 py-2 rounded-xl disabled:opacity-60"
          >
            {loading ? "..." : "Send"}
          </button>

        </div>

      </div>

    </div>
  );
}

export default AiAssistant;