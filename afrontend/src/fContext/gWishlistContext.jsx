import { createContext, useState, useEffect } from "react";
import api from "../eServices/api";

const WishlistContext = createContext(null);

export function WishlistProvider({ children }) {

  const [wishlistItems, setWishlistItems] =
    useState([]);

  // fetch wishlist product from backend
  useEffect(() => {

    const fetchWishlist = async () => {

      try {

        const res =
          await api.get("/wishlist");

        setWishlistItems(
          res.data || []
        );

      } catch (err) {

        console.log(err);

        setWishlistItems([]);

      }

    };

    fetchWishlist();

  }, []);

  // add or remove wishlist
  const toggleWishlist = async (product) => {

    try {

      const exists =
        wishlistItems?.find(
          (item) =>
            item._id === product._id
        );

      if (exists) {

        await api.delete(
          `/wishlist/${product._id}`
        );

        setWishlistItems(
          wishlistItems.filter(
            (item) =>
              item._id !== product._id
          )
        );

      } else {

        const res =
          await api.post(
            "/wishlist",
            {
              productId:
                product._id,
            }
          );

        setWishlistItems(
          res.data || []
        );

      }

    } catch (err) {

      console.log(err);

    }

  };

  const removeFromWishlist =
    async (_id) => {

      try {

        await api.delete(
          `/wishlist/${_id}`
        );

        setWishlistItems(
          wishlistItems.filter(
            (item) =>
              item._id !== _id
          )
        );

      } catch (err) {

        console.log(err);

      }

    };

  const isInWishlist = (_id) => {

    return (
      wishlistItems?.some(
        (item) =>
          item._id === _id
      ) || false
    );

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