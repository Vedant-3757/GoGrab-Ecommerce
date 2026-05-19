import { useState, useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import AuthContext from "../../fContext/eAuthContext.jsx";

function Login() {
  const navigate = useNavigate();
  const location = useLocation();

  const authContext = useContext(AuthContext);
  const login = authContext?.login;

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const redirectPath =
    typeof location.state?.from === "string"
      ? location.state.from
      : "/profile";

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      alert("Please Fill All Fields");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch(
        "http://localhost:5000/api/auth/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: email.trim(),
            password,
          }),
        }
      );

      const data = await res.json();

      if (res.ok) {
        // ✅ STEP 1: ALWAYS save to localStorage FIRST (safe fallback)
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));

        // ✅ STEP 2: sync context (if available)
        login?.(data.user, data.token);

        alert("Login Successful");

        navigate(redirectPath, { replace: true });
      } else {
        alert(data.message || "Invalid Email Or Password");
      }
    } catch (error) {
      console.log(error);
      alert("Server Error");
    }

    setLoading(false);
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
            className="w-full px-4 py-3 rounded-xl border"
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-3 rounded-xl border"
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-black text-white py-3 rounded-xl"
          >
            {loading ? "Logging In..." : "Login"}
          </button>

        </form>

        {/* ✅ ADDED ONLY THIS (REGISTER LINK) */}
        <p className="text-center mt-6 text-gray-600">
          Don’t have an account?{" "}
          <span
            onClick={() => navigate("/register")}
            className="text-black font-semibold cursor-pointer"
          >
            Register
          </span>
        </p>

      </div>
    </div>
  );
}

export default Login;