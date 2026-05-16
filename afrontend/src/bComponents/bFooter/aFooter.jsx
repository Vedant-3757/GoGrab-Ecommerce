import { Link } from "react-router-dom";

function Footer() {

  return (
    <footer className="bg-black text-white mt-20">

      <div className="max-w-7xl mx-auto px-6 py-14 grid grid-cols-1 md:grid-cols-4 gap-10">

        {/* Brand */}
        <div>
          <h1 className="text-3xl font-bold mb-4">
            GoGrab
          </h1>

          <p className="text-gray-400 leading-7">
            Premium ecommerce platform for gadgets,
            accessories, and modern shopping experience.
          </p>
        </div>

        {/* Links */}
        <div>
          <h2 className="text-xl font-semibold mb-4">
            Quick Links
          </h2>

          <ul className="space-y-3 text-gray-400">

            <li>
              <Link
                to="/"
                className="hover:text-white transition"
              >
                Home
              </Link>
            </li>

            <li>
              <a
                href="/#products"
                className="hover:text-white transition"
              >
                Products
              </a>
            </li>

            <li>
              <Link
                to="/cart"
                className="hover:text-white transition"
              >
                Cart
              </Link>
            </li>

            <li>
              <Link
                to="/checkout"
                className="hover:text-white transition"
              >
                Checkout
              </Link>
            </li>

          </ul>
        </div>

        {/* Categories */}
        <div>
          <h2 className="text-xl font-semibold mb-4">
            Categories
          </h2>

          <ul className="space-y-3 text-gray-400">

            <li className="hover:text-white transition cursor-pointer">
              Electronics
            </li>

            <li className="hover:text-white transition cursor-pointer">
              Laptops
            </li>

            <li className="hover:text-white transition cursor-pointer">
              Accessories
            </li>

            <li className="hover:text-white transition cursor-pointer">
              Smart Gadgets
            </li>

          </ul>
        </div>

        {/* Contact */}
        <div>
          <h2 className="text-xl font-semibold mb-4">
            Contact
          </h2>

          <ul className="space-y-3 text-gray-400">

            <li>
              Email: support@gograb.com
            </li>

            <li>
              Phone: +91 8010706552
            </li>

            <li>
              Mumbai, Maharashtra
            </li>

          </ul>
        </div>

      </div>

      <div className="border-t border-gray-800 py-6 text-center text-gray-500">
        © 2026 GoGrab. All rights reserved.
      </div>

    </footer>
  );
}

export default Footer;