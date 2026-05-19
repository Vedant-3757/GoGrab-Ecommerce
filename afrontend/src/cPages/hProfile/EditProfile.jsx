import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

import AuthContext from "../../fContext/eAuthContext.jsx";

function EditProfile() {

  const navigate = useNavigate();

  const authContext = useContext(AuthContext);

  const user = authContext?.user;

  const setUser = authContext?.setUser;

  const [name, setName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");
  const [mobile, setMobile] = useState(user?.mobile || "");

  const handleSave = () => {

    if (!name || !email || !mobile) {
      alert("Please fill all fields");
      return;
    }

    const updatedUser = {
      ...user,
      name,
      email,
      mobile,
    };

    localStorage.setItem(
      "user",
      JSON.stringify(updatedUser)
    );

    setUser?.(updatedUser);

    alert("Profile Updated");

    navigate("/profile");
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4 sm:p-6">

      <div className="max-w-3xl mx-auto bg-white rounded-3xl shadow-md p-6 sm:p-8">

        <div className="flex flex-col items-center mb-8">

          <div className="w-28 h-28 rounded-full bg-black text-white flex items-center justify-center text-5xl font-bold shadow-lg">

            {(name || "U")
              .charAt(0)
              .toUpperCase()}

          </div>

          <h1 className="text-3xl font-bold mt-5">
            Edit Profile
          </h1>

        </div>

        <div className="space-y-6">

          <input
            type="text"
            value={name}
            onChange={(e) =>
              setName(e.target.value)
            }
            placeholder="Full Name"
            className="w-full border rounded-2xl px-4 py-3 outline-none focus:border-black"
          />

          <input
            type="email"
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
            placeholder="Email"
            className="w-full border rounded-2xl px-4 py-3 outline-none focus:border-black"
          />

          <input
            type="text"
            value={mobile}
            onChange={(e) =>
              setMobile(e.target.value)
            }
            placeholder="Mobile Number"
            className="w-full border rounded-2xl px-4 py-3 outline-none focus:border-black"
          />

          <button
            onClick={handleSave}
            className="w-full bg-black text-white py-3 rounded-2xl hover:opacity-90 transition"
          >
            Save Changes
          </button>

        </div>

      </div>

    </div>
  );
}

export default EditProfile;