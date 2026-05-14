import { useContext, useState } from "react";

import {
  Link,
  useNavigate,
  useLocation,
} from "react-router-dom";

import SearchContext from "../../fContext/cSearchContext.jsx";
import CartContext from "../../fContext/aCartContext.jsx";

function Navbar() {

  const navigate = useNavigate();
  const location = useLocation();

  const [menuOpen, setMenuOpen] = useState(false);

  // SAFE SEARCH
  const searchContext = useContext(SearchContext);

  const searchTerm =
    searchContext?.searchTerm ?? "";

  const setSearchTerm =
    searchContext?.setSearchTerm ?? (() => {});

  // SAFE CART
  const cartContext = useContext(CartContext);

  const cartItems =
    cartContext?.cartItems ?? [];

  const totalItems = Array.isArray(cartItems)
    ? cartItems.reduce(
        (total, item) =>
          total + (item?.quantity || 0),
        0
      )
    : 0;

  // SEARCH NAVIGATION
  const handleSearch = (e) => {

    const value = e.target.value;

    setSearchTerm(value);

    if (
      value.trim() !== "" &&
      location.pathname !== "/search"
    ) {
      navigate("/search");
    }
  };

  return (
    <nav className="bg-black text-white sticky top-0 z-50 border-b border-gray-800 shadow-lg">

      <div className="max-w-7xl mx-auto px-4 py-4">

        {/* TOP BAR */}
        <div className="flex items-center justify-between gap-4">

          {/* LOGO */}
          <Link
            to="/"
            className="text-3xl font-bold"
          >
            GoGrab
          </Link>

          {/* DESKTOP SEARCH */}
          <div className="hidden md:block">

            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={handleSearch}
              className="w-96 px-4 py-2 rounded-xl bg-black text-white outline-none border border-white/20 focus:border-white/50 transition"
            />

          </div>

          {/* DESKTOP NAV */}
          <div className="hidden md:flex items-center gap-6">

            <Link
              to="/"
              className="hover:text-gray-300"
            >
              Home
            </Link>

            <Link
              to="/activities"
              className="hover:text-gray-300"
            >
              Activities
            </Link>

            <Link
              to="/cart"
              className="relative hover:text-gray-300"
            >
              Cart

              {totalItems > 0 && (
                <span className="absolute -top-3 -right-4 bg-red-500 text-xs px-2 py-1 rounded-full">
                  {totalItems}
                </span>
              )}
            </Link>

            <Link
              to="/profile"
              className="hover:text-gray-300"
            >
              Profile
            </Link>

          </div>

          {/* MOBILE MENU BUTTON */}
          <button
            onClick={() =>
              setMenuOpen(!menuOpen)
            }
            className="md:hidden text-3xl"
          >
            {menuOpen ? "✖" : "☰"}
          </button>

        </div>

        {/* MOBILE SEARCH */}
        <div className="mt-4 md:hidden">

          <input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={handleSearch}
            className="w-full px-4 py-2 rounded-xl bg-black text-white outline-none border border-white/20 focus:border-white/50 transition"
          />

        </div>

        {/* MOBILE MENU */}
        {menuOpen && (

          <div className="md:hidden flex flex-col gap-4 mt-5 bg-gray-900 p-4 rounded-2xl">

            <Link
              to="/"
              onClick={() => setMenuOpen(false)}
              className="hover:text-gray-300"
            >
              Home
            </Link>

            <Link
              to="/activities"
              onClick={() => setMenuOpen(false)}
              className="hover:text-gray-300"
            >
              Activities
            </Link>

            <Link
              to="/cart"
              onClick={() => setMenuOpen(false)}
              className="hover:text-gray-300"
            >
              Cart ({totalItems})
            </Link>

            <Link
              to="/profile"
              onClick={() => setMenuOpen(false)}
              className="hover:text-gray-300"
            >
              Profile
            </Link>

          </div>

        )}

      </div>

    </nav>
  );
}

export default Navbar;