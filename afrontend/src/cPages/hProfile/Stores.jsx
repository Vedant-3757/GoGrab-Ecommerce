function Stores() {

  const stores = [
    {
      name: "GoGrab Electronics",
      city: "Pune",
    },
    {
      name: "GoGrab Fashion",
      city: "Mumbai",
    },
    {
      name: "GoGrab Gaming",
      city: "Delhi",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-100 p-4 sm:p-6">

      <div className="max-w-5xl mx-auto">

        <h1 className="text-3xl font-bold mb-8">
          Preferred Stores
        </h1>

        <div className="grid gap-5">

          {stores.map((store, index) => (

            <div
              key={index}
              className="bg-white rounded-3xl shadow-md p-6 flex items-center justify-between hover:shadow-xl transition"
            >

              <div>

                <h2 className="text-2xl font-semibold">
                  {store.name}
                </h2>

                <p className="text-gray-500 mt-2">
                  {store.city}
                </p>

              </div>

              <button className="bg-black text-white px-5 py-2 rounded-xl hover:opacity-90 transition">
                Visit
              </button>

            </div>

          ))}

        </div>

      </div>

    </div>
  );
}

export default Stores;