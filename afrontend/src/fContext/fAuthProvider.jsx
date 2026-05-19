import { useState } from "react";
import AuthContext from "./eAuthContext.jsx";

function AuthProvider({ children }) {

  // load user 
  const [user, setUser] = useState(() => {
    try {
      const savedUser = localStorage.getItem("gograb-user");
      return savedUser ? JSON.parse(savedUser) : null;
    } catch {
      return null;
    }
  });

  // register
  const register = (userData) => {
    localStorage.setItem(
      "gograb-user",
      JSON.stringify(userData)
    );

    setUser(userData);
  };

  // login
  const login = (email, password) => {
    try {
      const savedUserRaw = localStorage.getItem("gograb-user");
      const savedUser = savedUserRaw ? JSON.parse(savedUserRaw) : null;

      if (
        savedUser?.email?.trim() === email?.trim() &&
        savedUser?.password === password
      ) {
        setUser(savedUser);
        return true;
      }

      return false;
    } catch {
      return false;
    }
  };

  // logout
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