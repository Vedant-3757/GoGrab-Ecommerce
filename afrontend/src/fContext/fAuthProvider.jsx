import { useState } from "react";

import AuthContext from "./eAuthContext.jsx";

function AuthProvider({ children }) {

  // LOAD USER DIRECTLY
  const [user, setUser] = useState(() => {

    const savedUser =
      localStorage.getItem("gograb-user");

    return savedUser
      ? JSON.parse(savedUser)
      : null;
  });

  // REGISTER
  const register = (userData) => {

    localStorage.setItem(
      "gograb-user",
      JSON.stringify(userData)
    );

    setUser(userData);
  };

  // LOGIN
  const login = (email, password) => {

    const savedUser = JSON.parse(
      localStorage.getItem("gograb-user")
    );

    if (
      savedUser?.email === email &&
      savedUser?.password === password
    ) {

      setUser(savedUser);

      return true;
    }

    return false;
  };

  // LOGOUT (FIXED: clear storage also)
  const logout = () => {

    localStorage.removeItem("gograb-user");
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        register,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;