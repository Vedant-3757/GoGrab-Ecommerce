import { useContext, useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import AuthContext from "../../fContext/eAuthContext.jsx";

function Profile() {
  const navigate = useNavigate();
  const authContext = useContext(AuthContext);

  const user = authContext?.user;
  const setUser = authContext?.setUser;
  const logout = authContext?.logout;

  {/*sync on mount*/}
  useEffect(() => {
    const storedUser = localStorage.getItem("user");

    if (storedUser) {
      setUser?.(JSON.parse(storedUser));
    }
  }, []);

  { /* redirect if not logged in */ }
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    logout?.();
    navigate("/login", { replace: true });
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4 sm:p-6">

      <div className="max-w-5xl mx-auto">

        {/* profile card */}
        <div className="bg-white rounded-3xl shadow-md p-6 sm:p-8 mb-8">

          <div className="flex flex-col sm:flex-row sm:items-center gap-5">

            <div className="w-20 h-20 rounded-full bg-black text-white flex items-center justify-center text-3xl font-bold">
              {(user?.name || "U").charAt(0).toUpperCase()}
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

        {/* profile options */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">

          <div onClick={() => navigate("/profile/edit")}
            className="bg-white p-6 rounded-2xl shadow-md cursor-pointer hover:shadow-xl transition">
            ✏️ Edit Profile
          </div>

          <div onClick={() => navigate("/profile/payments")}
            className="bg-white p-6 rounded-2xl shadow-md cursor-pointer hover:shadow-xl transition">
            💳 Payments
          </div>

          <div onClick={() => navigate("/profile/recent")}
            className="bg-white p-6 rounded-2xl shadow-md cursor-pointer hover:shadow-xl transition">
            🕒 Recent
          </div>

          <div onClick={() => navigate("/profile/stores")}
            className="bg-white p-6 rounded-2xl shadow-md cursor-pointer hover:shadow-xl transition">
            🏪 Stores
          </div>

          <div onClick={() => navigate("/profile/devices")}
            className="bg-white p-6 rounded-2xl shadow-md cursor-pointer hover:shadow-xl transition">
            📱 Devices
          </div>

          <div onClick={() => navigate("/profile/feedback")}
            className="bg-white p-6 rounded-2xl shadow-md cursor-pointer hover:shadow-xl transition">
            ⭐ Feedback
          </div>

          <div onClick={handleLogout}
            className="bg-red-500 text-white p-6 rounded-2xl shadow-md cursor-pointer hover:bg-red-600 transition">
            🚪 Logout
          </div>

        </div>

      </div>

    </div>
  );
}

export default Profile;