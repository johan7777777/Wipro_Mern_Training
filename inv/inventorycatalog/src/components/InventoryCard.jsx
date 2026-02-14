import React, { useState } from "react";
import { Link } from "react-router-dom";

function InventoryCard({ product }) {
  const [isFavorite, setIsFavorite] = useState(false);

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
  };

  return (
    <div className="inventory-card">
      <h3>{product.name}</h3>
      <p>Price: ₹{product.price}</p>
      <p>Category: {product.category}</p>
      <div className="card-buttons">
        <Link to={`/product/${product.id}`}>
          <button className="view-btn">View</button>
        </Link>
        <button onClick={toggleFavorite}>
          {isFavorite ? "♥ Unfavorite" : "♡ Favorite"}
        </button>
      </div>
    </div>
  );
}

export default InventoryCard;
