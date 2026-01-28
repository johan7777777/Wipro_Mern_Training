export default function Footer() {
  return (
    <footer className="border-t bg-white mt-10">
      <div className="max-w-6xl mx-auto px-4 py-8 grid sm:grid-cols-3 gap-6">
        <div>
          <h4 className="font-bold text-lg">ClothCart</h4>
          <p className="text-sm text-gray-600 mt-2">
            Trendy clothing for Men, Women and Kids.
          </p>
        </div>

        <div>
          <h4 className="font-semibold">Quick Links</h4>
          <ul className="text-sm text-gray-600 mt-2 space-y-1">
            <li>Home</li>
            <li>Categories</li>
            <li>Support</li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold">Contact</h4>
          <p className="text-sm text-gray-600 mt-2">
            Email: support@clothcart.com <br />
            Phone: +91 90000 00000
          </p>
        </div>
      </div>

      <div className="text-center text-xs text-gray-500 py-4 border-t">
        © {new Date().getFullYear()} ClothCart. All rights reserved.
      </div>
    </footer>
  );
}
