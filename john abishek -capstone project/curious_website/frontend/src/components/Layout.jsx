import { Outlet, Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import logo from "../curious.png";

export default function Layout() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  async function handleLogout() {
    await logout();
    navigate("/");
  }

  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <header
        style={{
          padding: "1rem 2rem",
          background: "var(--brand-primary)",
          color: "#fff",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
        }}
      >
        <Link to="/" style={{ color: "inherit", fontWeight: 600, display: "flex", alignItems: "center", gap: "0.75rem", textDecoration: "none" }}>
          <img src={logo} alt="Curious" style={{ height: "32px", width: "auto", background: "#ffffff", padding: "4px", borderRadius: "4px" }} />
          <span>Curious</span>
        </Link>
        <nav style={{ display: "flex", gap: "1.5rem", alignItems: "center" }}>
          {user ? (
            <>
              <Link to="/dashboard" style={{ color: "inherit", textDecoration: "none", transition: "opacity 0.2s" }} onMouseEnter={(e) => e.target.style.opacity = "0.8"} onMouseLeave={(e) => e.target.style.opacity = "1"}>
                Dashboard
              </Link>
              <Link to="/search" style={{ color: "inherit", textDecoration: "none", transition: "opacity 0.2s" }} onMouseEnter={(e) => e.target.style.opacity = "0.8"} onMouseLeave={(e) => e.target.style.opacity = "1"}>
                Search
              </Link>
              <span style={{ opacity: 0.9 }}>{user.email}</span>
              <span
                style={{
                  padding: "0.25rem 0.75rem",
                  borderRadius: 12,
                  fontSize: "0.75rem",
                  fontWeight: 600,
                  textTransform: "uppercase",
                  background: user.role === "admin" ? "rgba(255, 193, 7, 0.2)" : "rgba(108, 117, 125, 0.2)",
                  color: user.role === "admin" ? "#ffc107" : "#6c757d",
                  border: `1px solid ${user.role === "admin" ? "rgba(255, 193, 7, 0.5)" : "rgba(108, 117, 125, 0.5)"}`,
                }}
              >
                {user.role === "admin" ? "Admin" : "User"}
              </span>
              <button
                type="button"
                onClick={handleLogout}
                style={{
                  padding: "0.4rem 0.8rem",
                  background: "transparent",
                  border: "1px solid rgba(255,255,255,0.5)",
                  color: "#fff",
                  borderRadius: 6,
                  cursor: "pointer",
                  transition: "all 0.2s",
                }}
                onMouseEnter={(e) => {
                  e.target.style.background = "rgba(255,255,255,0.1)";
                }}
                onMouseLeave={(e) => {
                  e.target.style.background = "transparent";
                }}
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" style={{ color: "inherit", textDecoration: "none", transition: "opacity 0.2s" }} onMouseEnter={(e) => e.target.style.opacity = "0.8"} onMouseLeave={(e) => e.target.style.opacity = "1"}>
                Login
              </Link>
              <Link to="/register" style={{ color: "inherit", textDecoration: "none", transition: "opacity 0.2s" }} onMouseEnter={(e) => e.target.style.opacity = "0.8"} onMouseLeave={(e) => e.target.style.opacity = "1"}>
                Register
              </Link>
            </>
          )}
        </nav>
      </header>
      <main style={{ flex: 1, padding: "2rem", background: "var(--bg-light)" }}>
        <Outlet />
      </main>
    </div>
  );
}
