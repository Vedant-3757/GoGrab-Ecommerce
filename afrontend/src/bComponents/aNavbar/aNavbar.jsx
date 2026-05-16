import { useContext, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";

import SearchContext from "../../fContext/cSearchContext.jsx";
import CartContext from "../../fContext/aCartContext.jsx";
import WishlistContext from "../../fContext/gWishlistContext.jsx";

function Navbar() {

  const navigate = useNavigate();
  const location = useLocation();

  const [menuOpen, setMenuOpen] = useState(false);

  const searchContext = useContext(SearchContext);
  const cartContext = useContext(CartContext);
  const wishlistContext = useContext(WishlistContext);

  const cartItems = cartContext?.cartItems ?? [];
  const wishlistItems = wishlistContext?.wishlistItems ?? [];

  const totalItems = cartItems.reduce(
    (total, item) => total + (item?.quantity || 0),
    0
  );

  const setSearchTerm = searchContext?.setSearchTerm;

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

  // ✅ SAFE NAVIGATION (NO EFFECTS)
  const handleNav = (path) => {
    navigate(path);
    setMenuOpen(false);
  };

  // ACTIVE ROUTE
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

        {/* TOP BAR */}
        <div className="flex items-center justify-between gap-4">

          {/* LOGO */}
          <div
            onClick={() => handleNav("/")}
            className="text-2xl sm:text-3xl font-bold cursor-pointer"
          >
            GoGrab
          </div>

          {/* SEARCH */}
          <div className="hidden md:block flex-1 max-w-md">

            <input
              type="text"
              placeholder="Search products..."
              onChange={handleSearch}
              className="w-full bg-gray-900 border border-gray-700 rounded-xl px-4 py-2 outline-none focus:border-white"
            />

          </div>

          {/* DESKTOP NAV */}
          <div className="hidden md:flex items-center gap-6">

            <Link to="/" className={linkClass("/")}>
              Home
            </Link>

            <Link to="/ai" className={linkClass("/ai")}>
              AI Assistant
            </Link>

            <Link to="/activities" className={linkClass("/activities")}>
              Activities
            </Link>

            {/* WISHLIST */}
            <Link
              to="/wishlist"
              className={`relative ${linkClass("/wishlist")}`}
            >
              Wishlist

              {wishlistItems?.length > 0 && (
                <span className="absolute -top-2 -right-4 bg-pink-500 text-xs px-2 py-1 rounded-full">
                  {wishlistItems.length}
                </span>
              )}
            </Link>

            {/* CART */}
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

            <Link to="/profile" className={linkClass("/profile")}>
              Profile
            </Link>

          </div>

          {/* MOBILE BUTTON */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden"
          >
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

            <Link to="/" onClick={() => setMenuOpen(false)} className={linkClass("/")}>
              Home
            </Link>

            <Link to="/ai" onClick={() => setMenuOpen(false)} className={linkClass("/ai")}>
              AI Assistant
            </Link>

            <Link
              to="/activities"
              onClick={() => setMenuOpen(false)}
              className={linkClass("/activities")}
            >
              Activities
            </Link>

            <Link
              to="/wishlist"
              onClick={() => setMenuOpen(false)}
              className={linkClass("/wishlist")}
            >
              Wishlist ({wishlistItems.length})
            </Link>

            <Link
              to="/cart"
              onClick={() => setMenuOpen(false)}
              className={linkClass("/cart")}
            >
              Cart ({totalItems})
            </Link>

            <Link
              to="/profile"
              onClick={() => setMenuOpen(false)}
              className={linkClass("/profile")}
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