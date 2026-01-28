import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";

import { AuthProvider } from "./context/AuthContext";
import Header from "./components/Header";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ProtectedRoute from "./components/ProtectedRoute";

import Home from "./pages/Home";
import Category from "./pages/Category";
import ProductDetails from "./pages/ProductDetails";
import Cart from "./pages/Cart";
import NotFound from "./pages/NotFound";

import Login from "./pages/Login";
import Register from "./pages/Register";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
export default function App() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const API_URL = "http://localhost:3001/products";

  useEffect(() => {
    async function fetchProducts() {
      try {
        setLoading(true);
        setError("");
        const res = await fetch(API_URL);
        if (!res.ok) throw new Error("Failed to fetch products");
        const data = await res.json();
        setProducts(data);
      } catch (err) {
        setError(err.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    }
    fetchProducts();
  }, []);

  return (
    <AuthProvider>
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <Header />
        <Navbar />

        <div className="flex-1">
          {loading && (
            <div className="max-w-6xl mx-auto px-4 py-10">
              <div className="bg-white border rounded-2xl p-6">
                <p className="font-semibold">Loading products...</p>
              </div>
            </div>
          )}

          {!loading && error && (
            <div className="max-w-6xl mx-auto px-4 py-10">
              <div className="bg-white border rounded-2xl p-6">
                <p className="font-semibold text-red-600">Error: {error}</p>
                <p className="text-sm text-gray-600 mt-1">
                  Check json-server is running on port 3001.
                </p>
              </div>
            </div>
          )}

          {!loading && !error && (
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<Home products={products} />} />
              <Route path="/category/:name" element={<Category products={products} />} />
              <Route path="/product/:id" element={<ProductDetails products={products} />} />
              <Route path="/cart" element={<Cart />} />
              
              {/* Auth Routes */}
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              
              {/* Admin Routes */}
              <Route path="/admin-login" element={<AdminLogin />} />
              <Route
                path="/admin"
                element={
                  <ProtectedRoute requiredRole="admin">
                    <AdminDashboard />
                  </ProtectedRoute>
                }
              />

              <Route path="*" element={<NotFound />} />
            </Routes>
          )}
        </div>

        <Footer />
      </div>
    </AuthProvider>
  );
}
