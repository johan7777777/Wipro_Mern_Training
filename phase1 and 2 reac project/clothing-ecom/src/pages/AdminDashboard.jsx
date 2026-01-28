import { useNavigate } from "react-router-dom";

export default function AdminDashboard() {
  const navigate = useNavigate();
  const adminUser = localStorage.getItem("adminUser") || "Admin";

  function handleLogout() {
    localStorage.removeItem("isAdminLoggedIn");
    localStorage.removeItem("adminUser");
    navigate("/admin-login");
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="bg-white border rounded-2xl p-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Admin Dashboard</h1>
          <p className="text-sm text-gray-600 mt-1">
            Welcome, <b>{adminUser}</b> 👋
          </p>
        </div>

        <button
          onClick={handleLogout}
          className="px-4 py-2 rounded-xl border hover:bg-gray-50"
        >
          Logout
        </button>
      </div>

      {/* You can add admin features here */}
      <div className="mt-6 bg-white border rounded-2xl p-6">
        <h2 className="text-lg font-bold">Admin Controls</h2>
        <p className="text-sm text-gray-600 mt-1">
          Next we can add: Add Product, Edit Product, Delete Product (CRUD with json-server).
        </p>
      </div>
    </div>
  );
}
