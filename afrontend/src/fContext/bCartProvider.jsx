import { useEffect, useState } from "react";

import CartContext from "./aCartContext.jsx";

function CartProvider({ children }) {

  // load from local storage
  const [cartItems, setCartItems] = useState(() => {

    try {
      const savedCart =
        localStorage.getItem("gograb-cart");

      const parsed = savedCart ? JSON.parse(savedCart) : [];

      // safety check 
      return Array.isArray(parsed) ? parsed : [];

    } catch {
      return [];
    }
  });

  // save to local storage 
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

  // add to cart
  const addToCart = (product) => {

    if (!product) return;

    setCartItems((prev) => {

      const existingItem = prev.find(
        (item) => item._id === product._id
      );

      if (existingItem) {

        return prev.map((item) =>
          item._id === product._id
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

  // increarse quantity
  const increaseQuantity = (_id) => {

    setCartItems((prev) =>
      prev.map((item) =>
        item._id === _id
          ? {
              ...item,
              quantity: item.quantity + 1,
            }
          : item
      )
    );
  };

  // decrease quantity
  const decreaseQuantity = (_id) => {

    setCartItems((prev) =>
      prev
        .map((item) =>
          item._id === _id
            ? {
                ...item,
                quantity: item.quantity - 1,
              }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  // remove item
  const removeItem = (_id) => {

    setCartItems((prev) =>
      prev.filter((item) => item._id !== _id)
    );
  };

  // clear cart
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