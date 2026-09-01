import { useContext, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";

import SearchContext from "../../fContext/cSearchContext.jsx";
import CartContext from "../../fContext/aCartContext.jsx";
import AuthContext from "../../fContext/eAuthContext.jsx";

function Navbar() {

  const navigate = useNavigate();
  const location = useLocation();

  const [menuOpen, setMenuOpen] = useState(false);

  const searchContext = useContext(SearchContext);
  const cartContext = useContext(CartContext);
  const authContext = useContext(AuthContext);

  const cartItems = cartContext?.cartItems ?? [];

  const totalItems = cartItems.reduce(
    (total, item) => total + (item?.quantity || 0),
    0
  );

  const setSearchTerm =
    searchContext?.setSearchTerm;

  const user =
    authContext?.user;

  const logout =
    authContext?.logout;

  const handleSearch = (e) => {

    const value = e.target.value;

    setSearchTerm?.(value);

    if (
      value.trim() !== "" &&
      location.pathname !== "/search"
    ) {
      navigate("/search");
    }

  };

  const handleNav = (path) => {

    navigate(path);

    setMenuOpen(false);

  };

  const handleLogout = () => {

    localStorage.removeItem("user");
    localStorage.removeItem("token");

    logout?.();

    navigate("/login");

    setMenuOpen(false);

  };

  const isActive = (path) =>

    location.pathname === path ||

    location.pathname.startsWith(path + "/");

  const linkClass = (path) =>

    isActive(path)

      ? "text-white font-semibold border-b-2 border-white pb-1"

      : "text-gray-300 hover:text-white transition";

  return (

    <nav className="bg-black text-white sticky top-0 z-50 border-b border-gray-800">

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">

        <div className="flex items-center justify-between gap-4">

          <div
            onClick={() => handleNav("/")}
            className="text-2xl sm:text-3xl font-bold cursor-pointer"
          >
            GoGrab
          </div>

          <div className="hidden md:block flex-1 max-w-md">

            <input
              type="text"
              placeholder="Search products..."
              onChange={handleSearch}
              className="w-full bg-gray-900 border border-gray-700 rounded-xl px-4 py-2"
            />

          </div>

          <div className="hidden md:flex items-center gap-6">

            <Link
              to="/"
              className={linkClass("/")}
            >
              Home
            </Link>

            <Link
              to="/ai"
              className={linkClass("/ai")}
            >
              AI Assistant
            </Link>

            <Link
              to="/activities"
              className={linkClass("/activities")}
            >
              Activities
            </Link>

            <Link
              to="/cart"
              className={`relative ${linkClass("/cart")}`}
            >

              Cart

              {totalItems > 0 && (

                <span className="absolute -top-2 -right-4 bg-red-500 text-xs px-2 py-1 rounded-full">
                  {totalItems}
                </span>

              )}

            </Link>

            {/* AUTH UI */}

            {user ? (

              <>

                {user?.role === "admin" && (

                  <Link
                    to="/admin"
                    className={linkClass("/admin")}
                  >
                    Admin Panel
                  </Link>

                )}

                <Link
                  to="/profile"
                  className={linkClass("/profile")}
                >
                  Profile
                </Link>

                <button
                  onClick={handleLogout}
                  className="text-gray-300 hover:text-red-400 transition"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className={linkClass("/login")}
                >
                  Login
                </Link>
                
              </>
            )}
            {user?.name && (
              <div
                className="
                px-4 py-2
                rounded-full
                border border-gray-700
                bg-gray-900
                shadow-lg
                hover:scale-105
                hover:border-white
                transition-all
                duration-300
                animate-pulse
              "
              >
                <p className="text-sm text-gray-300 font-medium">
                  👋 Hi,{" "}
                  <span className="text-white">
                    {user.name}
                  </span>
                </p>
              </div>
            )}
          </div>
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden"
          >
            {
              menuOpen
                ? <X size={28} />
                : <Menu size={28} />
            }
          </button>
        </div>
        {menuOpen && (
          <div className="md:hidden flex flex-col gap-5 mt-6 pb-4">
            <Link
              to="/"
              onClick={() => setMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              to="/ai"
              onClick={() => setMenuOpen(false)}
            >
              AI Assistant
            </Link>
            <Link
              to="/activities"
              onClick={() => setMenuOpen(false)}
            >
              Activities
            </Link>
            <Link
              to="/cart"
              onClick={() => setMenuOpen(false)}
            >
              Cart ({totalItems})
            </Link>
            {user ? (
              <>
                {user?.role === "admin" && (
                  <Link
                    to="/admin"
                    onClick={() => setMenuOpen(false)}
                  >
                    Admin Panel
                  </Link>
                )}
                <Link
                  to="/profile"
                  onClick={() => setMenuOpen(false)}
                >
                  Profile
                </Link>
                <button
                  onClick={handleLogout}
                  className="text-left text-red-400"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  onClick={() => setMenuOpen(false)}
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  onClick={() => setMenuOpen(false)}
                >
                  Register
                </Link>
              </>
            )}
            {user?.name && (
              <div
                className="
                px-4 py-2
                rounded-full
                border border-gray-700
                bg-gray-900
                w-fit
                animate-pulse
              "
              >
                👋 Hi, {user.name}
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}
export default Navbar;