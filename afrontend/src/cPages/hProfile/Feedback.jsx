import { useState } from "react";

function Feedback() {

  const [rating, setRating] = useState(0);

  const [message, setMessage] = useState("");

  const handleSubmit = () => {

    if (!message) {
      alert("Please enter feedback");
      return;
    }

    alert("Feedback Submitted");

    setMessage("");
    setRating(0);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4 sm:p-6">

      <div className="max-w-3xl mx-auto bg-white rounded-3xl shadow-md p-6 sm:p-8">

        <h1 className="text-3xl font-bold mb-8">
          Feedback
        </h1>

        <div className="flex gap-3 mb-8">

          {[1, 2, 3, 4, 5].map((star) => (

            <button
              key={star}
              onClick={() => setRating(star)}
              className={`text-4xl transition ${
                rating >= star
                  ? "text-yellow-400 scale-110"
                  : "text-gray-300"
              }`}
            >
              ★
            </button>

          ))}

        </div>

        <textarea
          rows="6"
          value={message}
          onChange={(e) =>
            setMessage(e.target.value)
          }
          placeholder="Write your feedback..."
          className="w-full border rounded-2xl p-4 outline-none resize-none focus:border-black"
        />

        <button
          onClick={handleSubmit}
          className="w-full bg-black text-white py-3 rounded-2xl mt-6 hover:opacity-90 transition"
        >
          Submit Feedback
        </button>

      </div>

    </div>
  );
}

export default Feedback;