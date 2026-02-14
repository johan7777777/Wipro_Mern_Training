import React, { createContext, useContext, useState, useEffect } from "react";

const ProductContext = createContext();

const API_URL = "";

export function ProductProvider({ children }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchProducts = () => {
    setLoading(true);
    fetch(`${API_URL}/products`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch products");
        return res.json();
      })
      .then((data) => {
        setProducts(data);
        setError(null);
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const addProduct = (product) => {
    const body = {
      name: product.name,
      price: Number(product.price),
      category: product.category
    };
    return fetch(`${API_URL}/products`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body)
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to add product. Is the backend running?");
        return res.json();
      })
      .then((newProduct) => {
        setProducts((prev) => [...prev, newProduct]);
        return newProduct;
      });
  };

  return (
    <ProductContext.Provider value={{ products, loading, error, fetchProducts, addProduct }}>
      {children}
    </ProductContext.Provider>
  );
}

export function useProducts() {
  const context = useContext(ProductContext);
  if (!context) throw new Error("useProducts must be used within ProductProvider");
  return context;
}
