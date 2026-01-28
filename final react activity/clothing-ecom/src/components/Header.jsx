import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Header() {
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate("/");
  }

  return (
    <header className="bg-white border-b transition-all duration-300 hover:shadow-md">
      <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
        <Link to="/">
          <h1 className="text-2xl font-bold tracking-tight cursor-pointer transition-all duration-300 hover:scale-105">
            Cloth<span className="text-blue-600 transition-colors duration-300 hover:text-blue-800">Cart</span>
          </h1>
        </Link>

        <div className="hidden sm:flex items-center gap-2 text-sm text-gray-600">
          <span className="transition-colors duration-300 hover:text-gray-900">Free delivery above ₹999</span>
          <span className="text-gray-300">|</span>
          <span className="transition-colors duration-300 hover:text-gray-900">Easy returns</span>
        </div>

        <div className="flex items-center gap-3">
          {isAuthenticated() ? (
            <>
              <div className="hidden sm:flex items-center gap-2 text-sm">
                <span className="text-gray-600">Welcome,</span>
                <span className="font-medium text-gray-900">{user?.name || user?.username}</span>
                {user?.role === "admin" && (
                  <Link
                    to="/admin"
                    className="px-2 py-1 rounded bg-blue-100 text-blue-700 text-xs font-medium hover:bg-blue-200 transition-colors"
                  >
                    Admin
                  </Link>
                )}
              </div>
              <button
                onClick={handleLogout}
                className="px-3 py-2 rounded-lg bg-gray-100 text-gray-700 text-sm transition-all duration-300 ease-in-out hover:bg-gray-200 hover:scale-105 active:scale-95"
              >
                Logout
              </button>
            </>
          ) : (
            <Link
              to="/login"
              className="px-3 py-2 rounded-lg bg-black text-white text-sm transition-all duration-300 ease-in-out hover:opacity-90 hover:scale-105 hover:shadow-lg active:scale-95"
            >
              Sign In
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
