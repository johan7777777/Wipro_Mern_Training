import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { ProductProvider } from "./context/ProductContext.jsx";
import ProductList from "./pages/ProductList";
import ProductDetail from "./pages/ProductDetail";
import AddProduct from "./pages/AddProduct";
import "./App.css";

function App() {
  return (
    <ProductProvider>
      <Router>
        <div className="App">
          <nav className="nav-bar">
            <Link to="/">Product List</Link>
            <Link to="/add-product">Add Product</Link>
          </nav>
          <Routes>
            <Route path="/" element={<ProductList />} />
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="/add-product" element={<AddProduct />} />
          </Routes>
        </div>
      </Router>
    </ProductProvider>
  );
}

export default App;
