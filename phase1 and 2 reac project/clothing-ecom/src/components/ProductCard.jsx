import { Link } from "react-router-dom";

export default function ProductCard({ product, onAddToCart }) {
  return (
    <div className="bg-white rounded-2xl border overflow-hidden hover:shadow-md transition">
      <Link to={`/product/${product.id}`}>
        <div className="h-64 w-full bg-gray-100 overflow-hidden">
          <img
            src={product.image}
            alt={product.title}
            className="h-full w-full object-cover"
            loading="lazy"
          />
        </div>
      </Link>

      <div className="p-4">
        <p className="text-xs text-gray-500">{product.category}</p>

        <Link to={`/product/${product.id}`}>
          <h3 className="mt-1 font-semibold text-gray-900 line-clamp-1 hover:underline">
            {product.title}
          </h3>
        </Link>

        <div className="mt-3 flex items-center justify-between">
          <p className="font-bold">₹{product.price}</p>
          <button
            onClick={() => onAddToCart(product)}
            className="px-3 py-2 rounded-lg bg-black text-white text-sm hover:opacity-90"
          >
            Add to cart
          </button>
        </div>
      </div>
    </div>
  );
}
