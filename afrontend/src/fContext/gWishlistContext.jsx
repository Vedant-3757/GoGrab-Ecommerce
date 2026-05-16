import {
  createContext,
  useState,
  useEffect,
} from "react";

const WishlistContext =
  createContext();

export function WishlistProvider({
  children,
}) {

  const [wishlistItems,
    setWishlistItems] =
      useState(() => {

        try {
          const saved =
            localStorage.getItem("gograb-wishlist");

          return saved
            ? JSON.parse(saved)
            : [];
        } catch  {
          return [];
        }

      });

  // SAVE TO LOCALSTORAGE
  useEffect(() => {
    localStorage.setItem(
      "gograb-wishlist",
      JSON.stringify(wishlistItems)
    );
  }, [wishlistItems]);

  // ADD / REMOVE
  const toggleWishlist = (
    product
  ) => {

    const exists =
      wishlistItems.find(
        (item) =>
          item.id === product.id
      );

    if (exists) {

      setWishlistItems(
        wishlistItems.filter(
          (item) =>
            item.id !== product.id
        )
      );

    } else {

      setWishlistItems([
        ...wishlistItems,
        product,
      ]);
    }
  };

  // CHECK
  const isInWishlist = (
    id
  ) => {

    return wishlistItems.some(
      (item) =>
        item.id === id
    );
  };

  return (
    <WishlistContext.Provider
      value={{
        wishlistItems,
        toggleWishlist,
        isInWishlist,
      }}
    >

      {children}

    </WishlistContext.Provider>
  );
}

export default WishlistContext;