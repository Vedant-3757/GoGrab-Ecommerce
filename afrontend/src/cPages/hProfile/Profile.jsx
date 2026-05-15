import { useContext } from "react";
import { Navigate, useNavigate } from "react-router-dom";

import AuthContext from "../../fContext/eAuthContext.jsx";

function Profile() {
  const navigate = useNavigate();

  const authContext = useContext(AuthContext);

  const user = authContext?.user;
  const logout = authContext?.logout;

  if (!user) return <Navigate to="/login" replace />;

  const handleLogout = () => {
    logout?.();
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">

      <h1 className="text-3xl font-bold mb-6">
        Welcome {user.name}
      </h1>

      <div className="grid grid-cols-2 gap-4">

        <div className="bg-white p-4 rounded-xl">
          {user.email}
        </div>

        <div
          onClick={() => navigate("/activities")}
          className="bg-white p-4 rounded-xl cursor-pointer"
        >
          Orders
        </div>

        <div
          onClick={() => navigate("/cart")}
          className="bg-white p-4 rounded-xl cursor-pointer"
        >
          Cart
        </div>

        <div
          onClick={handleLogout}
          className="bg-red-500 text-white p-4 rounded-xl cursor-pointer"
        >
          Logout
        </div>

      </div>

    </div>
  );
}

export default Profile;