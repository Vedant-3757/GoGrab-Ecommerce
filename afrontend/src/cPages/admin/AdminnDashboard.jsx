import { Outlet } from "react-router-dom";
import AdminSidebar from "./AdminSidebar";

function AdminDashboard() {
  return (
    <div className="min-h-screen flex bg-gray-100">

      {/* Sidebar */}
      <AdminSidebar />

      {/* Main Content */}
      <div className="flex-1 p-6">
        <Outlet />
      </div>

    </div>
  );
}

export default AdminDashboard;