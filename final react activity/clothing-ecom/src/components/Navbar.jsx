import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { useCart } from "../context/CartContext";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { cartCount } = useCart();

  const linkClass = ({ isActive }) =>
    `px-3 py-2 rounded-lg text-sm ${
      isActive ? "bg-blue-600 text-white" : "text-gray-700 hover:bg-gray-100"
    }`;

  return (
    <nav className="bg-white border-b sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/" className="font-semibold text-gray-900">
          Home
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-2">
          <NavLink to="/category/men" className={linkClass}>
            Men
          </NavLink>
          <NavLink to="/category/women" className={linkClass}>
            Women
          </NavLink>
          <NavLink to="/category/kids" className={linkClass}>
            Kids
          </NavLink>

          <NavLink to="/cart" className={linkClass}>
            Cart <span className="ml-1 font-bold">({cartCount})</span>
          </NavLink>
        </div>

        {/* Mobile Button */}
        <button
          onClick={() => setOpen((v) => !v)}
          className="md:hidden px-3 py-2 rounded-lg border text-sm"
        >
          {open ? "Close" : "Menu"}
        </button>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden border-t bg-white">
          <div className="max-w-6xl mx-auto px-4 py-3 flex flex-col gap-2">
            <NavLink onClick={() => setOpen(false)} to="/category/men" className={linkClass}>
              Men
            </NavLink>
            <NavLink onClick={() => setOpen(false)} to="/category/women" className={linkClass}>
              Women
            </NavLink>
            <NavLink onClick={() => setOpen(false)} to="/category/kids" className={linkClass}>
              Kids
            </NavLink>
            <NavLink onClick={() => setOpen(false)} to="/cart" className={linkClass}>
              Cart <span className="ml-1 font-bold">({cartCount})</span>
            </NavLink>
          </div>
        </div>
      )}
    </nav>
  );
}
