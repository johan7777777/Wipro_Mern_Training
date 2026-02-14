import React from "react";
import InventoryCard from "./InventoryCard";

function InventoryList({ products }) {
  return (
    <div className="inventory-list">
      {products.map((product) => (
        <InventoryCard key={product.id} product={product} />
      ))}
    </div>
  );
}

export default InventoryList;
