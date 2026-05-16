import { createContext } from "react";


const CartContext = createContext({
  cartItems: [],
  addToCart: () => {},
  removeItem: () => {},
  increaseQuantity: () => {},
  decreaseQuantity: () => {},
});

export default CartContext;