import { useAuth } from "../context/AuthContext";

export default function AdminDashboard() {
  const { user } = useAuth();

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="bg-white border rounded-2xl p-6">
        <h1 className="text-2xl font-bold">Admin Dashboard</h1>
        <p className="text-sm text-gray-600 mt-1">
          Welcome, <b>{user?.name || user?.username || "Admin"}</b> 👋
        </p>
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
