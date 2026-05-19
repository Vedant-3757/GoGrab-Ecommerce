import { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import toast from "react-hot-toast";

import api from "../../eServices/api";
import AuthContext from "../../fContext/eAuthContext.jsx";

function Register() {

  const navigate = useNavigate();

  const authContext = useContext(AuthContext);

  const login = authContext?.login;

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] =
    useState("");

  const [passwordError, setPasswordError] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const handleRegister = async (e) => {

    e.preventDefault();

    if (
      !name ||
      !email ||
      !password ||
      !confirmPassword
    ) {

      toast.error("Please Fill All Fields");

      return;

    }

    const passwordRegex =
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{6,}$/;

    if (!passwordRegex.test(password)) {

      setPasswordError(
        "Password must contain minimum 6 characters, 1 letter, 1 number and 1 special character."
      );

      return;
    }

    if (password !== confirmPassword) {

      setPasswordError(
        "Passwords do not match."
      );

      return;
    }

    setLoading(true);

    setPasswordError("");

    try {

      const res = await api.post(
        "/auth/register",
        {
          name: name.trim(),
          email: email.trim(),
          password,
        }
      );

      const data = res.data;

      login?.(data.user, data.token);

      toast.success(
        data.message ||
        "Registration Successful"
      );

      navigate("/profile");

    } catch (error) {

      console.log(error);

      toast.error(
        error?.response?.data?.message ||
        "Server Error"
      );

    }

    setLoading(false);

  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">

      <div className="bg-white p-10 rounded-3xl shadow-lg w-full max-w-md">

        <h1 className="text-4xl font-bold mb-8 text-center">
          Register
        </h1>

        <form
          onSubmit={handleRegister}
          className="space-y-6"
        >

          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) =>
              setName(e.target.value)
            }
            className="w-full px-4 py-3 rounded-xl border outline-none focus:border-black"
          />

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
            className="w-full px-4 py-3 rounded-xl border outline-none focus:border-black"
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => {

              setPassword(e.target.value);

              setPasswordError("");

            }}
            className="w-full px-4 py-3 rounded-xl border outline-none focus:border-black"
          />

          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => {

              setConfirmPassword(
                e.target.value
              );

              setPasswordError("");

            }}
            className="w-full px-4 py-3 rounded-xl border outline-none focus:border-black"
          />

          {passwordError && (

            <p className="text-red-500 text-sm">
              {passwordError}
            </p>

          )}

          <button
            type="submit"
            disabled={loading}
            className="
              w-full
              bg-black
              text-white
              py-3
              rounded-xl
              hover:bg-gray-800
              transition
              active:scale-[0.98]
              disabled:opacity-70
              disabled:cursor-not-allowed
              flex
              items-center
              justify-center
              gap-2
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

                Creating Account...
              </>
            ) : (
              "Create Account"
            )}

          </button>

        </form>

        <p className="text-center mt-6 text-gray-600">

          Already have an account?{" "}

          <Link
            to="/login"
            className="text-black font-semibold"
          >
            Login
          </Link>

        </p>

      </div>

    </div>
  );
}

export default Register;