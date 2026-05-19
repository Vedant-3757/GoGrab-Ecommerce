import { useState, useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import toast from "react-hot-toast";

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

      toast.error("Please Fill All Fields");

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

        localStorage.setItem(
          "user",
          JSON.stringify(data.user)
        );

        localStorage.setItem(
          "token",
          data.token
        );

        login?.(
          data.user,
          data.token
        );

        toast.success("Login Successful");

        setTimeout(() => {

          navigate(
            redirectPath,
            {
              replace: true,
            }
          );

        }, 100);

      } else {

        toast.error(
          data.message ||
          "Invalid Email Or Password"
        );

      }

    } catch (error) {

      console.log(error);

      toast.error("Server Error");

    }

    setLoading(false);

  };

  return (

    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">

      <div className="bg-white p-10 rounded-3xl shadow-lg w-full max-w-md">

        <h1 className="text-4xl font-bold mb-8 text-center">
          Login
        </h1>

        <form
          onSubmit={handleLogin}
          className="space-y-6"
        >

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
            className="w-full px-4 py-3 rounded-xl border"
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
            }
            className="w-full px-4 py-3 rounded-xl border"
          />

          <button
            type="submit"
            disabled={loading}
            className="
              w-full
              bg-black
              text-white
              py-3
              rounded-xl
              flex
              items-center
              justify-center
              gap-2
              disabled:opacity-70
              disabled:cursor-not-allowed
            "
          >

            {loading ? (
              <>
                <div
                  className="
                    w-5
                    h-5
                    border-2
                    border-white
                    border-t-transparent
                    rounded-full
                    animate-spin
                  "
                />

                Logging In...
              </>
            ) : (
              "Login"
            )}

          </button>

        </form>

      </div>

    </div>

  );

}

export default Login;