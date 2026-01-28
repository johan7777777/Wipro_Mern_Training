import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AdminLogin() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  // Demo credentials (change as you wish)
  const ADMIN_USER = "admin";
  const ADMIN_PASS = "1234";

  function handleSubmit(e) {
    e.preventDefault();
    setError("");

    if (username === ADMIN_USER && password === ADMIN_PASS) {
      localStorage.setItem("isAdminLoggedIn", "true");
      localStorage.setItem("adminUser", username);
      navigate("/admin");
    } else {
      setError("Invalid username or password");
    }
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="max-w-md mx-auto bg-white border rounded-2xl p-6">
        <h1 className="text-2xl font-bold">Admin Login</h1>
        <p className="text-sm text-gray-600 mt-1">
          Use username: <b>admin</b> and password: <b>1234</b>
        </p>

        {error && (
          <div className="mt-4 p-3 rounded-xl bg-red-50 text-red-700 text-sm border border-red-200">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="mt-5 space-y-4">
          <div>
            <label className="text-sm font-medium text-gray-700">Username</label>
            <input
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="mt-1 w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter admin username"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700">Password</label>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              className="mt-1 w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter password"
            />
          </div>

          <button
            type="submit"
            className="w-full px-4 py-3 rounded-xl bg-black text-white hover:opacity-90"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
