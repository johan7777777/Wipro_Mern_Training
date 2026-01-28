export default function Header() {
  return (
    <header className="bg-white border-b">
      <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">
          Cloth<span className="text-blue-600">Cart</span>
        </h1>

        <div className="hidden sm:flex items-center gap-2 text-sm text-gray-600">
          <span>Free delivery above ₹999</span>
          <span className="text-gray-300">|</span>
          <span>Easy returns</span>
        </div>

        <button className="px-3 py-2 rounded-lg bg-black text-white text-sm hover:opacity-90">
          Sign In
        </button>
      </div>
    </header>
  );
}
