import { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import AuthContext from "../fContext/eAuthContext.jsx";

function ProtectedRoute({ children }) {

  const authContext = useContext(AuthContext);

  const user = authContext?.user;

  //safe check
  const token =
    localStorage.getItem("token");

  const location =
    useLocation();

  //protected route logic
  if (!user && !token) {

    return (
      <Navigate
        to="/login"
        replace
        state={{
          from:
            location.pathname,
        }}
      />
    );

  }

  return children;
}

export default ProtectedRoute;