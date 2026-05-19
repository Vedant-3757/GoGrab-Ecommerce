const express = require("express");
const router = express.Router();

const protect = require("../middleware/authMiddleware");

const {
  addToWishlist,
  getWishlist,
  removeFromWishlist,
} = require("../controllers/wishlistController");

// add to wishlist
router.post("/", protect, addToWishlist);

// get wishlist
router.get("/", protect, getWishlist);

// remove product from wishlist
router.delete("/:productId", protect, removeFromWishlist);

module.exports = router;