import React from "react";
import InventoryCard from "../components/InventoryCard.jsx";
import { useProducts } from "../context/ProductContext.jsx";

function ProductList() {
  const { products, loading, error } = useProducts();

  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">Error: {error}</div>;

  return (
    <div>
      <h1>Product List</h1>
      <div className="inventory-list">
        {products.map((product) => (
          <InventoryCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}

export default ProductList;
