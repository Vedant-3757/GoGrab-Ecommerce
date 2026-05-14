import { useEffect, useState } from "react";

import CartContext from "./aCartContext.jsx";

function CartProvider({ children }) {

  // LOAD FROM LOCAL STORAGE
  const [cartItems, setCartItems] = useState(() => {

    const savedCart =
      localStorage.getItem("gograb-cart");

    return savedCart
      ? JSON.parse(savedCart)
      : [];
  });

  // SAVE TO LOCAL STORAGE
  useEffect(() => {

    localStorage.setItem(
      "gograb-cart",
      JSON.stringify(cartItems)
    );

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

  // DECREASE QUANTITY
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