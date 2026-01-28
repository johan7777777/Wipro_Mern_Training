// import { useMemo, useState } from "react";
// import { products } from "../data/products";
// import ProductCard from "../components/ProductCard";
// import { useCart } from "../context/CartContext";

// export default function Home() {
//   const [search, setSearch] = useState("");
//   const { addToCart } = useCart();

//   const filtered = useMemo(() => {
//     return products.filter((p) =>
//       p.title.toLowerCase().includes(search.toLowerCase())
//     );
//   }, [search]);

//   return (
//     <div className="max-w-6xl mx-auto px-4 py-6">
//       <div className="bg-white border rounded-2xl p-5">
//         <h2 className="text-2xl font-bold">Shop Latest Outfits</h2>
//         <p className="text-sm text-gray-600 mt-1">
//           Browse Men, Women and Kids collections.
//         </p>

//         <input
//           value={search}
//           onChange={(e) => setSearch(e.target.value)}
//           placeholder="Search products..."
//           className="mt-4 w-full sm:w-96 px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
//         />
//       </div>

//       <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
//         {filtered.map((p) => (
//           <ProductCard key={p.id} product={p} onAddToCart={addToCart} />
//         ))}
//       </div>
//     </div>
//   );
// }
import { useMemo, useState } from "react";
import ProductCard from "../components/ProductCard";
import { useCart } from "../context/CartContext";

export default function Home({ products }) {
  const [search, setSearch] = useState("");
  const { addToCart } = useCart();

  const filtered = useMemo(() => {
    return products.filter((p) =>
      p.title.toLowerCase().includes(search.toLowerCase())
    );
  }, [products, search]);

  return (
    <div className="max-w-6xl mx-auto px-4 py-6">
      <div className="bg-white border rounded-2xl p-5">
        <h2 className="text-2xl font-bold">Shop Latest Outfits</h2>

        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search products..."
          className="mt-4 w-full sm:w-96 px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {filtered.map((p) => (
          <ProductCard key={p.id} product={p} onAddToCart={addToCart} />
        ))}
      </div>
    </div>
  );
}
