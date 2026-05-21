import {
  createContext,
  useState,
  useEffect,
} from "react";
const WishlistContext = createContext(null);
export function WishlistProvider({ children }) {
  const [wishlistItems, setWishlistItems] = useState(() => {
    try {
      const saved = localStorage.getItem("gograb-wishlist");
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });
  useEffect(() => {
    try {
      localStorage.setItem(
        "gograb-wishlist",
        JSON.stringify(wishlistItems)
      );
    } catch {
      // ignore storage errors
    }
  }, [wishlistItems]);
  const toggleWishlist = (product) => {
    const exists = wishlistItems.find(
      (item) => item._id === product._id
    );
    if (exists) {
      setWishlistItems(
        wishlistItems.filter(
          (item) => item._id !== product._id
        )
      );
    } else {
      setWishlistItems([...wishlistItems, product]);
    }
  };
  const removeFromWishlist = (_id) => {
    setWishlistItems(
      wishlistItems.filter((item) => item._id !== _id)
    );
  };
  const isInWishlist = (_id) => {
    return wishlistItems.some((item) => item._id === _id);
  };
  return (
    <WishlistContext.Provider
      value={{
        wishlistItems,
        toggleWishlist,
        removeFromWishlist,
        isInWishlist,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
}
export default WishlistContext;