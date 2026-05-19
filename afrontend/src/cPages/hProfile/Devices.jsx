import { useState } from "react";

function Devices() {

  const [devices, setDevices] = useState([
    {
      device: "Windows PC",
      location: "Pune, India",
      active: true,
    },
    {
      device: "Android Device",
      location: "Mumbai, India",
      active: false,
    },
  ]);

  const handleLogoutDevice = (index) => {

    const updated =
      devices.filter((_, i) => i !== index);

    setDevices(updated);

    alert("Device Logged Out");
  };

  const handleLogoutAll = () => {

    const current =
      devices.filter((item) => item.active);

    setDevices(current);

    alert("Logged out from all other devices");
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4 sm:p-6">

      <div className="max-w-4xl mx-auto">

        <div className="flex items-center justify-between mb-8">

          <h1 className="text-3xl font-bold">
            Devices & Security
          </h1>

          <span className="bg-green-100 text-green-700 px-4 py-2 rounded-xl text-sm font-semibold">
            Secure
          </span>

        </div>

        <div className="space-y-5">

          {devices.map((item, index) => (

            <div
              key={index}
              className="bg-white rounded-3xl shadow-md p-6 flex justify-between items-center"
            >

              <div>

                <h2 className="text-xl font-semibold">
                  {item.device}
                </h2>

                <p className="text-gray-500 mt-1">
                  {item.location}
                </p>

              </div>

              <div>

                {item.active ? (

                  <span className="bg-green-100 text-green-700 px-4 py-2 rounded-xl text-sm font-semibold">
                    Current Device
                  </span>

                ) : (

                  <button
                    onClick={() =>
                      handleLogoutDevice(index)
                    }
                    className="bg-red-500 text-white px-4 py-2 rounded-xl hover:bg-red-600 transition"
                  >
                    Logout
                  </button>

                )}

              </div>

            </div>

          ))}

          <button
            onClick={handleLogoutAll}
            className="w-full bg-black text-white py-4 rounded-2xl mt-4 hover:opacity-90 transition"
          >
            Logout From All Devices
          </button>

        </div>

      </div>

    </div>
  );
}

export default Devices;