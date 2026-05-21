import { Link } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "../../fContext/eAuthContext.jsx";

function AdminSidebar() {

  const user = useContext(AuthContext)?.user;

  if (user?.role !== "admin") return null;

  return (
    <div className="w-64 bg-black text-white min-h-screen p-6 space-y-6">

      <h1 className="text-2xl font-bold">
        Admin Panel
      </h1>

      <Link to="/admin" className="block hover:text-gray-300">
        Dashboard
      </Link>

      <Link to="/admin/products" className="block hover:text-gray-300">
        Products
      </Link>

      <Link to="/admin/add-product" className="block hover:text-gray-300">
        Add Product
      </Link>

    </div>
  );
}

export default AdminSidebar;