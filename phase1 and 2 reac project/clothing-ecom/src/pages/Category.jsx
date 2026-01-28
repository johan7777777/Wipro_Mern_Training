// import { useParams } from "react-router-dom";
// import { products } from "../data/products";
// import ProductCard from "../components/ProductCard";
// import { useCart } from "../context/CartContext";

// export default function Category() {
//   const { name } = useParams(); // men/women/kids
//   const category =
//     name?.toLowerCase() === "men"
//       ? "Men"
//       : name?.toLowerCase() === "women"
//       ? "Women"
//       : "Kids";

//   const { addToCart } = useCart();

//   const filtered = products.filter((p) => p.category === category);

//   return (
//     <div className="max-w-6xl mx-auto px-4 py-6">
//       <h2 className="text-2xl font-bold">{category} Collection</h2>
//       <p className="text-sm text-gray-600 mt-1">
//         Choose your favorite styles.
//       </p>

//       <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
//         {filtered.map((p) => (
//           <ProductCard key={p.id} product={p} onAddToCart={addToCart} />
//         ))}
//       </div>
//     </div>
//   );
// }
import { useParams } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import { useCart } from "../context/CartContext";

export default function Category({ products }) {
  const { name } = useParams();

  const category =
    name?.toLowerCase() === "men"
      ? "Men"
      : name?.toLowerCase() === "women"
      ? "Women"
      : "Kids";

  const filtered = products.filter((p) => p.category === category);
  const { addToCart } = useCart();

  return (
    <div className="max-w-6xl mx-auto px-4 py-6">
      <h2 className="text-2xl font-bold">{category} Collection</h2>

      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {filtered.map((p) => (
          <ProductCard key={p.id} product={p} onAddToCart={addToCart} />
        ))}
      </div>
    </div>
  );
}
