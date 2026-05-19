import { useContext } from "react";
import {
  Navigate,
  useLocation,
} from "react-router-dom";

import AuthContext from "../fContext/eAuthContext.jsx";

function ProtectedRoute({ children }) {

  const authContext =
    useContext(AuthContext);

  const user =
    authContext?.user;

  const location =
    useLocation();

  // strict auth check
  if (!user) {

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