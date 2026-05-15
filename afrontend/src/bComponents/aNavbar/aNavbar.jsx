import { useContext, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";

import SearchContext from "../../fContext/cSearchContext.jsx";
import CartContext from "../../fContext/aCartContext.jsx";

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();

  const [menuOpen, setMenuOpen] = useState(false);

  const searchContext = useContext(SearchContext);
  const cartContext = useContext(CartContext);

  const cartItems = cartContext?.cartItems ?? [];

  const totalItems = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  const setSearchTerm = searchContext?.setSearchTerm;

  const handleSearch = (e) => {
    const value = e.target.value;

    setSearchTerm?.(value);

    if (value.trim() !== "" && location.pathname !== "/search") {
      navigate("/search");
    }
  };

  const linkClass = (path) =>
    location.pathname === path
      ? "text-white font-semibold"
      : "text-gray-300 hover:text-white transition";

  const closeMenu = () => setMenuOpen(false);

  return (
    <nav className="bg-black text-white sticky top-0 z-50 border-b border-gray-800">

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">

        {/* TOP BAR */}
        <div className="flex items-center justify-between gap-4">

          {/* LOGO */}
          <Link to="/" className="text-2xl sm:text-3xl font-bold">
            GoGrab
          </Link>

          {/* SEARCH (DESKTOP) */}
          <div className="hidden md:block flex-1 max-w-md">
            <input
              type="text"
              placeholder="Search products..."
              onChange={handleSearch}
              className="w-full bg-gray-900 border border-gray-700 rounded-xl px-4 py-2 outline-none focus:border-white"
            />
          </div>

          {/* NAV LINKS (DESKTOP) */}
          <div className="hidden md:flex items-center gap-6">

            <Link to="/" className={linkClass("/")}>
              Home
            </Link>

            {/* AI ASSISTANT */}
            <Link to="/ai" className={linkClass("/ai")}>
              AI Assistant
            </Link>

            <Link to="/activities" className={linkClass("/activities")}>
              Activities
            </Link>

            <Link to="/cart" className={`relative ${linkClass("/cart")}`}>
              Cart

              {totalItems > 0 && (
                <span className="absolute -top-2 -right-4 bg-red-500 text-xs px-2 py-1 rounded-full">
                  {totalItems}
                </span>
              )}
            </Link>

            <Link to="/profile" className={linkClass("/profile")}>
              Profile
            </Link>

          </div>

          {/* MOBILE BUTTON */}
          <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden">
            {menuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>

        </div>

        {/* MOBILE SEARCH */}
        <div className="mt-4 md:hidden">
          <input
            type="text"
            placeholder="Search products..."
            onChange={handleSearch}
            className="w-full bg-gray-900 border border-gray-700 rounded-xl px-4 py-2 outline-none"
          />
        </div>

        {/* MOBILE MENU */}
        {menuOpen && (
          <div className="md:hidden flex flex-col gap-5 mt-6 pb-4">

            <Link to="/" onClick={closeMenu} className={linkClass("/")}>
              Home
            </Link>

            <Link to="/ai" onClick={closeMenu} className={linkClass("/ai")}>
              AI Assistant
            </Link>

            <Link to="/activities" onClick={closeMenu} className={linkClass("/activities")}>
              Activities
            </Link>

            <Link to="/cart" onClick={closeMenu} className={linkClass("/cart")}>
              Cart ({totalItems})
            </Link>

            <Link to="/profile" onClick={closeMenu} className={linkClass("/profile")}>
              Profile
            </Link>

          </div>
        )}

      </div>

    </nav>
  );
}

export default Navbar;