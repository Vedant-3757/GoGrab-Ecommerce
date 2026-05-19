import { useState } from "react";

function Payments() {

  const [cards, setCards] = useState([
    {
      number: "**** **** **** 4832",
      type: "Visa",
    },
    {
      number: "**** **** **** 9211",
      type: "MasterCard",
    },
  ]);

  const handleDelete = (index) => {

    const updated =
      cards.filter((_, i) => i !== index);

    setCards(updated);

    alert("Card Removed");
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4 sm:p-6">

      <div className="max-w-4xl mx-auto">

        <h1 className="text-3xl font-bold mb-8">
          Payments & Cards
        </h1>

        <div className="grid gap-5">

          {cards.map((card, index) => (

            <div
              key={index}
              className="bg-white rounded-3xl shadow-md p-6 flex items-center justify-between"
            >

              <div>

                <p className="text-xl font-semibold">
                  {card.type}
                </p>

                <p className="text-gray-500 mt-2">
                  {card.number}
                </p>

              </div>

              <button
                onClick={() =>
                  handleDelete(index)
                }
                className="bg-red-500 text-white px-5 py-2 rounded-xl hover:bg-red-600 transition"
              >
                Remove
              </button>

            </div>

          ))}

          <div className="bg-white rounded-3xl shadow-md p-6 border-2 border-dashed border-gray-300 cursor-pointer hover:border-black transition">

            <p className="text-center text-lg font-semibold">
              + Add New Card
            </p>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Payments;