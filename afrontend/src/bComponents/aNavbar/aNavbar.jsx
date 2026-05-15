import { useContext, useState } from "react";

import {
  Link,
  useNavigate,
  useLocation,
} from "react-router-dom";

import {
  Menu,
  X,
} from "lucide-react";

import SearchContext from "../../fContext/cSearchContext.jsx";

import CartContext from "../../fContext/aCartContext.jsx";

function Navbar() {

  const navigate = useNavigate();

  const location = useLocation();

  const [menuOpen, setMenuOpen] =
    useState(false);

  const searchContext =
    useContext(SearchContext);

  const searchTerm =
    searchContext?.searchTerm ?? "";

  const setSearchTerm =
    searchContext?.setSearchTerm;

  const cartContext =
    useContext(CartContext);

  const cartItems =
    cartContext?.cartItems ?? [];

  const totalItems =
    cartItems.reduce(
      (total, item) =>
        total + item.quantity,
      0
    );

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

  const handleNavigate = (path) => {

    navigate(path);

    setMenuOpen(false);

  };

  const linkClass = (path) =>
    location.pathname === path
      ? "text-white font-semibold"
      : "text-gray-300 hover:text-white transition";

  return (
    <nav className="bg-black text-white sticky top-0 z-50 border-b border-gray-800">

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">

        <div className="flex items-center justify-between gap-4">

          {/* LOGO */}
          <Link
            to="/"
            className="text-2xl sm:text-3xl font-bold"
          >
            GoGrab
          </Link>

          {/* DESKTOP SEARCH */}
          <div className="hidden md:flex flex-1 justify-center">

            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={handleSearch}
              className="w-full max-w-md px-4 py-2 rounded-xl bg-gray-900 border border-gray-700 outline-none focus:border-white"
            />

          </div>

          {/* DESKTOP NAV */}
          <div className="hidden md:flex items-center gap-6">

            <Link
              to="/"
              className={linkClass("/")}
            >
              Home
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

                <span className="absolute -top-3 -right-4 bg-red-500 text-xs px-2 py-1 rounded-full">
                  {totalItems}
                </span>

              )}

            </Link>

            <Link
              to="/profile"
              className={linkClass("/profile")}
            >
              Profile
            </Link>

          </div>

          {/* MOBILE MENU BUTTON */}
          <button
            onClick={() =>
              setMenuOpen(!menuOpen)
            }
            className="md:hidden"
          >

            {menuOpen
              ? <X size={28} />
              : <Menu size={28} />}

          </button>

        </div>

        {/* MOBILE SEARCH */}
        <div className="mt-4 md:hidden">

          <input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={handleSearch}
            className="w-full px-4 py-3 rounded-xl bg-gray-900 border border-gray-700 outline-none focus:border-white"
          />

        </div>

        {/* MOBILE MENU */}
        {menuOpen && (

          <div className="md:hidden mt-4 bg-gray-900 rounded-2xl p-4 flex flex-col gap-4">

            <button
              onClick={() =>
                handleNavigate("/")
              }
              className="text-left"
            >
              Home
            </button>

            <button
              onClick={() =>
                handleNavigate("/activities")
              }
              className="text-left"
            >
              Activities
            </button>

            <button
              onClick={() =>
                handleNavigate("/cart")
              }
              className="text-left flex items-center gap-2"
            >
              Cart

              {totalItems > 0 && (

                <span className="bg-red-500 text-xs px-2 py-1 rounded-full">
                  {totalItems}
                </span>

              )}

            </button>

            <button
              onClick={() =>
                handleNavigate("/profile")
              }
              className="text-left"
            >
              Profile
            </button>

          </div>

        )}

      </div>

    </nav>
  );
}

export default Navbar;