function SavedCards() {

  const cards = [
    {
      bank: "HDFC Bank",
      number: "**** 4832",
    },
    {
      bank: "SBI Debit Card",
      number: "**** 9211",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-100 p-4 sm:p-6">

      <div className="max-w-4xl mx-auto">

        <h1 className="text-3xl font-bold mb-8">
          Saved Cards
        </h1>

        <div className="space-y-5">

          {cards.map((card, index) => (

            <div
              key={index}
              className="bg-white rounded-3xl shadow-md p-6 flex items-center justify-between"
            >

              <div>

                <h2 className="text-xl font-semibold">
                  {card.bank}
                </h2>

                <p className="text-gray-500 mt-2">
                  {card.number}
                </p>

              </div>

              <button className="bg-red-500 text-white px-5 py-2 rounded-xl">
                Remove
              </button>

            </div>

          ))}

          <button className="w-full bg-black text-white py-4 rounded-2xl mt-3">
            Add New Card
          </button>

        </div>

      </div>

    </div>
  );
}

export default SavedCards;