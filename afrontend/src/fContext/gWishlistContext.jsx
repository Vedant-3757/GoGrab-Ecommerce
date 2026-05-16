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

  // ADD / REMOVE
  const toggleWishlist = (product) => {

    const exists = wishlistItems.find(
      (item) => item.id === product.id
    );

    if (exists) {
      setWishlistItems(
        wishlistItems.filter(
          (item) => item.id !== product.id
        )
      );
    } else {
      setWishlistItems([...wishlistItems, product]);
    }

  };

  // REMOVE DIRECTLY
  const removeFromWishlist = (id) => {
    setWishlistItems(
      wishlistItems.filter((item) => item.id !== id)
    );
  };

  // CHECK
  const isInWishlist = (id) => {
    return wishlistItems.some((item) => item.id === id);
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