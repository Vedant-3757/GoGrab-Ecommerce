import { useContext } from "react";

import {
  Navigate,
  useNavigate,
} from "react-router-dom";

import AuthContext from "../../fContext/eAuthContext.jsx";

function Profile() {

  const navigate =
    useNavigate();

  const authContext =
    useContext(AuthContext);

  const user =
    authContext?.user;

  const logout =
    authContext?.logout;

  if (!user) {

    return (
      <Navigate
        to="/login"
        replace
      />
    );

  }

  const handleLogout = () => {

    logout?.();

    navigate(
      "/login",
      {
        replace: true,
      }
    );

  };

  return (
    <div className="min-h-screen bg-gray-100 p-4 sm:p-6">

      <div className="max-w-5xl mx-auto">

        {/* PROFILE CARD */}
        <div className="bg-white rounded-3xl shadow-md p-6 sm:p-8 mb-8">

          <div className="flex flex-col sm:flex-row sm:items-center gap-5">

            <div className="w-20 h-20 rounded-full bg-black text-white flex items-center justify-center text-3xl font-bold">

              {(user?.name || "U")
                .charAt(0)
                .toUpperCase()}

            </div>

            <div>

              <h1 className="text-3xl font-bold mb-2">
                Welcome {user?.name}
              </h1>

              <p className="text-gray-500 break-all">
                {user?.email}
              </p>

            </div>

          </div>

        </div>

        {/* ACTIONS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">

          <div
            onClick={() =>
              navigate("/activities")
            }
            className="bg-white p-6 rounded-2xl shadow-md cursor-pointer hover:shadow-xl transition"
          >

            <h2 className="text-2xl mb-2">
              📦
            </h2>

            <p className="font-semibold text-lg">
              Orders
            </p>

            <p className="text-gray-500 text-sm mt-1">
              View your activities and orders
            </p>

          </div>

          <div
            onClick={() =>
              navigate("/cart")
            }
            className="bg-white p-6 rounded-2xl shadow-md cursor-pointer hover:shadow-xl transition"
          >

            <h2 className="text-2xl mb-2">
              🛒
            </h2>

            <p className="font-semibold text-lg">
              Cart
            </p>

            <p className="text-gray-500 text-sm mt-1">
              Manage products in your cart
            </p>

          </div>

          <div
            onClick={() =>
              navigate("/wishlist")
            }
            className="bg-white p-6 rounded-2xl shadow-md cursor-pointer hover:shadow-xl transition"
          >

            <h2 className="text-2xl mb-2">
              ❤️
            </h2>

            <p className="font-semibold text-lg">
              Wishlist
            </p>

            <p className="text-gray-500 text-sm mt-1">
              Your saved favorite products
            </p>

          </div>

          <div
            onClick={handleLogout}
            className="bg-red-500 text-white p-6 rounded-2xl shadow-md cursor-pointer hover:bg-red-600 transition"
          >

            <h2 className="text-2xl mb-2">
              🚪
            </h2>

            <p className="font-semibold text-lg">
              Logout
            </p>

            <p className="text-red-100 text-sm mt-1">
              Sign out from your account
            </p>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Profile;