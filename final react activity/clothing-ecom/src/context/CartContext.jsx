import { createContext, useContext, useMemo, useState } from "react";

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]); 
  // cartItems: [{ id, title, price, image, category, qty }]

  function addToCart(product) {
    setCartItems((prev) => {
      const exists = prev.find((x) => x.id === product.id);
      if (exists) {
        return prev.map((x) =>
          x.id === product.id ? { ...x, qty: x.qty + 1 } : x
        );
      }
      return [...prev, { ...product, qty: 1 }];
    });
  }

  function decreaseQty(id) {
    setCartItems((prev) =>
      prev
        .map((x) => (x.id === id ? { ...x, qty: x.qty - 1 } : x))
        .filter((x) => x.qty > 0)
    );
  }

  function increaseQty(id) {
    setCartItems((prev) =>
      prev.map((x) => (x.id === id ? { ...x, qty: x.qty + 1 } : x))
    );
  }

  function removeFromCart(id) {
    setCartItems((prev) => prev.filter((x) => x.id !== id));
  }

  function clearCart() {
    setCartItems([]);
  }

  const cartCount = useMemo(
    () => cartItems.reduce((sum, x) => sum + x.qty, 0),
    [cartItems]
  );

  const total = useMemo(
    () => cartItems.reduce((sum, x) => sum + x.price * x.qty, 0),
    [cartItems]
  );

  const value = {
    cartItems,
    cartCount,
    total,
    addToCart,
    decreaseQty,
    increaseQty,
    removeFromCart,
    clearCart,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside CartProvider");
  return ctx;
}
