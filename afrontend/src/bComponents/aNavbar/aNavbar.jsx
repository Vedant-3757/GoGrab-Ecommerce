import { useContext, useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";

import SearchContext from "../../fContext/cSearchContext.jsx";
import CartContext from "../../fContext/aCartContext.jsx";

function Navbar() {

  const navigate = useNavigate();
  const location = useLocation();

  const searchContext = useContext(SearchContext);
  const cartContext = useContext(CartContext);

  const setSearchTerm = searchContext?.setSearchTerm;

  const cartItems = cartContext?.cartItems ?? [];

  const totalItems = Array.isArray(cartItems)
    ? cartItems.reduce(
        (total, item) => total + (item?.quantity || 0),
        0
      )
    : 0;

  const [localSearch, setLocalSearch] = useState("");

  // sync search globally (debounced safe)
  useEffect(() => {
    const timer = setTimeout(() => {
      setSearchTerm?.(localSearch);
    }, 300);

    return () => clearTimeout(timer);
  }, [localSearch, setSearchTerm]);

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setLocalSearch(value);

    setSearchTerm?.(value);

    if (value.trim() && location.pathname !== "/search") {
      navigate("/search");
    }
  };

  const linkClass = (path) =>
    location.pathname === path
      ? "text-white font-bold border-b-2 border-white pb-1"
      : "text-gray-300 hover:text-white transition";

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
          value={localSearch}
          onChange={handleSearchChange}
          className="w-full md:w-96 px-4 py-2 rounded-xl bg-black text-white outline-none border border-white/20 focus:border-white/50 transition"
        />

        {/* NAV LINKS */}
        <div className="flex items-center gap-6">

          <Link to="/" className={linkClass("/")}>
            Home
          </Link>

          <Link to="/activities" className={linkClass("/activities")}>
            Activities
          </Link>

          <Link to="/cart" className={`relative ${linkClass("/cart")}`}>
            Cart

            {totalItems > 0 && (
              <span className="absolute -top-3 -right-4 bg-red-500 text-xs px-2 py-1 rounded-full">
                {totalItems}
              </span>
            )}
          </Link>

          <Link to="/profile" className={linkClass("/profile")}>
            Profile
          </Link>

        </div>

      </div>
    </nav>
  );
}

export default Navbar;