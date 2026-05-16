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
        const saved =
          localStorage.getItem("gograb-wishlist");

        return saved
          ? JSON.parse(saved)
          : [];
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