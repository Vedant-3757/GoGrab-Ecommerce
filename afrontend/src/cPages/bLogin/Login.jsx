import { useState, useContext } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import AuthContext from "../../fContext/eAuthContext.jsx";

function Login() {
  const navigate = useNavigate();
  const location = useLocation();

  const authContext = useContext(AuthContext);

  const login = authContext?.login || (() => false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    if (!email || !password) {
      alert("Please Fill All Fields");
      return;
    }

    const success = login(email, password);

    if (success) {
      alert("Login Successful");

      // ✅ MODIFIED ONLY HERE (redirect fix)
      const redirectPath = location.state?.from?.pathname;

      if (redirectPath) {
        navigate(redirectPath, { replace: true });
      } else {
        navigate("/profile");
      }

    } else {
      alert("Invalid Email Or Password");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">

      <div className="bg-white p-10 rounded-3xl shadow-lg w-full max-w-md">

        <h1 className="text-4xl font-bold mb-8 text-center">
          Login
        </h1>

        <form onSubmit={handleLogin} className="space-y-6">

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-3 rounded-xl border outline-none"
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-3 rounded-xl border outline-none"
          />

          <button
            type="submit"
            className="w-full bg-black text-white py-3 rounded-xl hover:bg-gray-800 transition"
          >
            Login
          </button>

        </form>

        <p className="text-center mt-6 text-gray-600">
          Don't have an account?{" "}
          <Link to="/register" className="text-black font-semibold">
            Register
          </Link>
        </p>

      </div>
    </div>
  );
}

export default Login;