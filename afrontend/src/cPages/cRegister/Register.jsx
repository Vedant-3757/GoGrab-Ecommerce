import { useState, useContext } from "react";

import {
  useNavigate,
  Link,
} from "react-router-dom";

import AuthContext from "../../fContext/eAuthContext.jsx";

function Register() {

  const navigate = useNavigate();

  const authContext =
    useContext(AuthContext);

  const register =
    authContext?.register ||
    (() => {});

  const [name, setName] =
    useState("");

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [passwordError, setPasswordError] =
    useState("");

  const handleRegister = (e) => {

    e.preventDefault();

    // EMPTY VALIDATION
    if (
      !name ||
      !email ||
      !password
    ) {

      alert(
        "Please Fill All Fields"
      );

      return;
    }

    // PASSWORD VALIDATION
    const passwordRegex =
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{6,}$/;

    if (
      !passwordRegex.test(password)
    ) {

      setPasswordError(
        "Password must contain minimum 6 characters, 1 letter, 1 number and 1 special character."
      );

      return;
    }

    // CLEAR ERROR
    setPasswordError("");

    // USER DATA
    const userData = {
      name,
      email,
      password,
    };

    // REGISTER
    register(userData);

    alert(
      "Registration Successful"
    );

    navigate("/profile");
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
            className="w-full px-4 py-3 rounded-xl border outline-none"
          />

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
            className="w-full px-4 py-3 rounded-xl border outline-none"
          />

          <div>

            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => {

                setPassword(
                  e.target.value
                );

                setPasswordError("");
              }}
              className="w-full px-4 py-3 rounded-xl border outline-none"
            />

            {passwordError && (

              <p className="text-red-500 text-sm mt-2">
                {passwordError}
              </p>

            )}

          </div>

          <button
            type="submit"
            className="w-full bg-black text-white py-3 rounded-xl hover:bg-gray-800 transition"
          >
            Create Account
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