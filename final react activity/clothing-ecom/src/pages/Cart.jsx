import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

export default function Cart() {
  const {
    cartItems,
    total,
    decreaseQty,
    increaseQty,
    removeFromCart,
    clearCart,
  } = useCart();

  if (cartItems.length === 0) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-10">
        <div className="bg-white border rounded-2xl p-8 text-center">
          <p className="text-xl font-bold">Your cart is empty</p>
          <p className="text-sm text-gray-600 mt-1">Add some products!</p>
          <Link
            to="/"
            className="inline-block mt-4 px-4 py-2 rounded-xl bg-blue-600 text-white"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Your Cart</h2>
        <button
          onClick={clearCart}
          className="text-sm px-3 py-2 rounded-lg border hover:bg-gray-50"
        >
          Clear Cart
        </button>
      </div>

      <div className="mt-6 grid lg:grid-cols-3 gap-6">
        {/* Items */}
        <div className="lg:col-span-2 space-y-4">
          {cartItems.map((item) => (
            <div
              key={item.id}
              className="bg-white border rounded-2xl p-4 flex gap-4"
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-28 h-28 object-cover rounded-xl bg-gray-100"
              />

              <div className="flex-1">
                <p className="text-xs text-gray-500">{item.category}</p>
                <p className="font-semibold">{item.title}</p>
                <p className="font-bold mt-1">₹{item.price}</p>

                <div className="mt-3 flex items-center gap-2">
                  <button
                    onClick={() => decreaseQty(item.id)}
                    className="w-9 h-9 rounded-lg border hover:bg-gray-50"
                  >
                    -
                  </button>
                  <span className="min-w-8 text-center font-semibold">
                    {item.qty}
                  </span>
                  <button
                    onClick={() => increaseQty(item.id)}
                    className="w-9 h-9 rounded-lg border hover:bg-gray-50"
                  >
                    +
                  </button>

                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="ml-auto text-sm px-3 py-2 rounded-lg border hover:bg-gray-50"
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Summary */}
        <div className="bg-white border rounded-2xl p-5 h-fit">
          <h3 className="text-lg font-bold">Order Summary</h3>
          <div className="mt-4 flex justify-between text-sm text-gray-700">
            <span>Total</span>
            <span className="font-bold">₹{total}</span>
          </div>

          <button className="mt-5 w-full px-4 py-3 rounded-xl bg-black text-white hover:opacity-90">
            Checkout
          </button>

          <Link
            to="/"
            className="mt-3 block text-center text-sm text-blue-600 underline"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
}
