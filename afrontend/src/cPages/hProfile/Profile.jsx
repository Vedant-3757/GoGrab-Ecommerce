import { useContext } from "react";
import { Navigate, useNavigate } from "react-router-dom";

import AuthContext from "../../fContext/eAuthContext.jsx";

function Profile() {

  const navigate = useNavigate();

  const authContext = useContext(AuthContext);

  const user = authContext?.user;
  const logout = authContext?.logout;

  // PROTECTED ROUTE
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  const handleLogout = () => {
    logout?.();
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4 sm:px-6">

      <div className="max-w-7xl mx-auto">

        {/* TOP SECTION */}
        <div className="bg-black text-white rounded-3xl p-6 sm:p-10 shadow-lg mb-10">

          <h1 className="text-3xl sm:text-5xl font-bold mb-4 break-words">
            Welcome, {user?.name || "User"}
          </h1>

          <p className="text-gray-300 text-base sm:text-lg">
            Manage your GoGrab account, orders and activities.
          </p>

        </div>

        {/* GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

          {/* PROFILE */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-md hover:shadow-xl transition">

            <div className="text-5xl mb-4">👤</div>

            <h2 className="text-2xl font-bold mb-3">
              Profile
            </h2>

            <p className="text-gray-600 break-all">
              {user?.email || "No email"}
            </p>

          </div>

          {/* ORDERS */}
          <div
            onClick={() => navigate("/activities")}
            className="bg-white rounded-3xl p-6 sm:p-8 shadow-md hover:shadow-xl transition cursor-pointer"
          >
            <div className="text-5xl mb-4">📦</div>

            <h2 className="text-2xl font-bold mb-3">
              Orders
            </h2>

            <p className="text-gray-600">
              View your recent orders
            </p>
          </div>

          {/* CART */}
          <div
            onClick={() => navigate("/cart")}
            className="bg-white rounded-3xl p-6 sm:p-8 shadow-md hover:shadow-xl transition cursor-pointer"
          >
            <div className="text-5xl mb-4">🛒</div>

            <h2 className="text-2xl font-bold mb-3">
              Cart
            </h2>

            <p className="text-gray-600">
              Manage your cart items
            </p>
          </div>

          {/* LOGOUT */}
          <div
            onClick={handleLogout}
            className="bg-red-500 text-white rounded-3xl p-6 sm:p-8 shadow-md hover:bg-red-600 transition cursor-pointer"
          >
            <div className="text-5xl mb-4">🚪</div>

            <h2 className="text-2xl font-bold mb-3">
              Logout
            </h2>

            <p>
              Securely logout account
            </p>
          </div>

        </div>

        {/* RECENT ACTIVITY */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 shadow-md mt-10">

          <h2 className="text-2xl sm:text-3xl font-bold mb-8">
            Recent Activity
          </h2>

          <div className="space-y-5">

            <div className="flex items-start gap-4 border-b pb-4">
              <div className="text-3xl">✅</div>
              <div>
                <h3 className="font-semibold text-lg">
                  Logged Into Account
                </h3>
                <p className="text-gray-500">
                  Recently accessed GoGrab
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 border-b pb-4">
              <div className="text-3xl">🛍️</div>
              <div>
                <h3 className="font-semibold text-lg">
                  Shopping Activity
                </h3>
                <p className="text-gray-500">
                  Browsed latest products
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="text-3xl">❤️</div>
              <div>
                <h3 className="font-semibold text-lg">
                  Wishlist Active
                </h3>
                <p className="text-gray-500">
                  Save and manage favorite products
                </p>
              </div>
            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Profile;