// import { useParams, Link } from "react-router-dom";
// import { products } from "../data/products";
// import { useCart } from "../context/CartContext";

// export default function ProductDetails() {
//   const { id } = useParams();
//   const product = products.find((p) => String(p.id) === String(id));
//   const { addToCart } = useCart();

//   if (!product) {
//     return (
//       <div className="max-w-6xl mx-auto px-4 py-10">
//         <p className="font-semibold">Product not found.</p>
//         <Link className="text-blue-600 underline" to="/">
//           Go Home
//         </Link>
//       </div>
//     );
//   }

//   return (
//     <div className="max-w-6xl mx-auto px-4 py-6">
//       <Link to="/" className="text-sm text-blue-600 underline">
//         ← Back
//       </Link>

//       <div className="mt-4 bg-white border rounded-2xl p-5 grid md:grid-cols-2 gap-6">
//         <div className="bg-gray-100 rounded-2xl overflow-hidden">
//           <img
//             src={product.image}
//             alt={product.title}
//             className="w-full h-105 object-cover"
//           />
//         </div>

//         <div>
//           <p className="text-sm text-gray-500">{product.category}</p>
//           <h1 className="text-3xl font-bold mt-1">{product.title}</h1>
//           <p className="text-xl font-bold mt-3">₹{product.price}</p>

//           <p className="text-sm text-gray-600 mt-4">
//             Premium quality clothing with comfortable fabric and trendy design.
//             Perfect for daily wear and special occasions.
//           </p>

//           <button
//             onClick={() => addToCart(product)}
//             className="mt-6 px-5 py-3 rounded-xl bg-black text-white hover:opacity-90"
//           >
//             Add to cart
//           </button>

//           <Link
//             to="/cart"
//             className="mt-3 block text-sm text-blue-600 underline"
//           >
//             Go to cart
//           </Link>
//         </div>
//       </div>
//     </div>
//   );
// }
import { useParams, Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

export default function ProductDetails({ products }) {
  const { id } = useParams();
  const { addToCart } = useCart();

  const product = products.find((p) => String(p.id) === String(id));

  if (!product) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-10">
        <p className="font-semibold">Product not found.</p>
        <Link className="text-blue-600 underline" to="/">
          Go Home
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-6">
      <Link to="/" className="text-sm text-blue-600 underline">
        ← Back
      </Link>

      <div className="mt-4 bg-white border rounded-2xl p-5 grid md:grid-cols-2 gap-6">
        <div className="bg-gray-100 rounded-2xl overflow-hidden">
          <img
            src={product.image}
            alt={product.title}
            className="w-full h-105 object-cover"
            onError={(e) => {
              e.currentTarget.src = "https://source.unsplash.com/900x900/?clothing";
            }}
          />
        </div>

        <div>
          <p className="text-sm text-gray-500">{product.category}</p>
          <h1 className="text-3xl font-bold mt-1">{product.title}</h1>
          <p className="text-xl font-bold mt-3">₹{product.price}</p>

          <p className="text-sm text-gray-600 mt-4">
            {product.description || "Premium quality clothing with trendy design."}
          </p>

          <button
            onClick={() => addToCart(product)}
            className="mt-6 px-5 py-3 rounded-xl bg-black text-white hover:opacity-90"
          >
            Add to cart
          </button>

          <Link to="/cart" className="mt-3 block text-sm text-blue-600 underline">
            Go to cart
          </Link>
        </div>
      </div>
    </div>
  );
}

