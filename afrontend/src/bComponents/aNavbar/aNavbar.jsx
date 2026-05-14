import { useContext } from "react";

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

  // SAFE SEARCH
  const searchContext = useContext(SearchContext);
  const searchTerm = searchContext?.searchTerm ?? "";
  const setSearchTerm = searchContext?.setSearchTerm ?? (() => {});

  // SAFE CART
  const cartContext = useContext(CartContext);
  const cartItems = cartContext?.cartItems ?? [];

  const totalItems = Array.isArray(cartItems)
    ? cartItems.reduce(
        (total, item) => total + (item?.quantity || 0),
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
    <nav className="bg-black text-white px-6 py-4 shadow-lg sticky top-0 z-50 border-b border-gray-800">

      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">

        {/* LOGO */}
        <Link to="/" className="text-3xl font-bold">
          GoGrab
        </Link>

        {/* SEARCH */}
        <input
          type="text"
          placeholder="Search products..."
          value={searchTerm}
          onChange={handleSearch}
          className="w-full md:w-96 px-4 py-2 rounded-xl bg-black text-white outline-none border border-white/20 focus:border-white/50 transition"
        />

        {/* NAV LINKS */}
        <div className="flex items-center gap-6">

          <Link to="/" className="hover:text-gray-300">
            Home
          </Link>

          {/* ⭐ ACTIVITIES ADDED */}
          <Link
            to="/activities"
            className="hover:text-gray-300 transition"
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

      </div>
    </nav>
  );
}

export default Navbar;