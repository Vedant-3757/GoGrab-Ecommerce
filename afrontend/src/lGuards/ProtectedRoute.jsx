import { useContext } from "react";
import { Navigate } from "react-router-dom";

import AuthContext from "../fContext/eAuthContext.jsx";

function ProtectedRoute({ children }) {

  const authContext = useContext(AuthContext);

  const user = authContext?.user;

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

export default ProtectedRoute;