import { useState } from "react";

function RecentlyViewed() {

  const [products, setProducts] = useState([
    {
      name: "Wireless Headphones",
      price: "₹2,999",
    },
    {
      name: "Gaming Mouse",
      price: "₹1,499",
    },
    {
      name: "Smart Watch",
      price: "₹4,999",
    },
  ]);

  const handleClear = () => {

    setProducts([]);

    alert("Recently Viewed Cleared");
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4 sm:p-6">

      <div className="max-w-6xl mx-auto">

        <div className="flex items-center justify-between mb-8">

          <h1 className="text-3xl font-bold">
            Recently Viewed
          </h1>

          <button
            onClick={handleClear}
            className="bg-black text-white px-5 py-2 rounded-xl"
          >
            Clear All
          </button>

        </div>

        {products.length === 0 ? (

          <div className="bg-white rounded-3xl p-10 text-center shadow-md">

            <p className="text-2xl font-semibold">
              No Recently Viewed Products
            </p>

          </div>

        ) : (

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

            {products.map((item, index) => (

              <div
                key={index}
                className="bg-white rounded-3xl shadow-md p-6 hover:shadow-xl transition"
              >

                <div className="h-40 bg-gray-200 rounded-2xl mb-5"></div>

                <h2 className="text-xl font-semibold">
                  {item.name}
                </h2>

                <p className="text-gray-500 mt-2">
                  {item.price}
                </p>

                <button className="mt-5 w-full bg-black text-white py-3 rounded-xl">
                  View Product
                </button>

              </div>

            ))}

          </div>

        )}

      </div>

    </div>
  );
}

export default RecentlyViewed;