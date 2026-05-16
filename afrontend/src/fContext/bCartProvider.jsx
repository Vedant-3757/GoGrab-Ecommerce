import { useEffect, useState } from "react";

import CartContext from "./aCartContext.jsx";

function CartProvider({ children }) {

  // LOAD FROM LOCAL STORAGE (SAFE PARSE)
  const [cartItems, setCartItems] = useState(() => {

    try {
      const savedCart =
        localStorage.getItem("gograb-cart");

      const parsed = savedCart ? JSON.parse(savedCart) : [];

      // safety check (must be array)
      return Array.isArray(parsed) ? parsed : [];

    } catch {
      return [];
    }
  });

  // SAVE TO LOCAL STORAGE
  useEffect(() => {

    try {
      localStorage.setItem(
        "gograb-cart",
        JSON.stringify(cartItems)
      );
    } catch {
      // ignore storage errors
    }

  }, [cartItems]);

  // ADD TO CART
  const addToCart = (product) => {

    if (!product) return;

    setCartItems((prev) => {

      const existingItem = prev.find(
        (item) => item.id === product.id
      );

      if (existingItem) {

        return prev.map((item) =>
          item.id === product.id
            ? {
                ...item,
                quantity: item.quantity + 1,
              }
            : item
        );
      }

      return [
        ...prev,
        {
          ...product,
          quantity: 1,
        },
      ];
    });
  };

  // INCREASE QUANTITY
  const increaseQuantity = (id) => {

    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
              ...item,
              quantity: item.quantity + 1,
            }
          : item
      )
    );
  };

  // DECREASE QUANTITY (SAFE GUARD ADDED)
  const decreaseQuantity = (id) => {

    setCartItems((prev) =>
      prev
        .map((item) =>
          item.id === id
            ? {
                ...item,
                quantity: item.quantity - 1,
              }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  // REMOVE ITEM
  const removeItem = (id) => {

    setCartItems((prev) =>
      prev.filter((item) => item.id !== id)
    );
  };

  // CLEAR CART
  const clearCart = () => {
    setCartItems([]);
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        increaseQuantity,
        decreaseQuantity,
        removeItem,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export default CartProvider;