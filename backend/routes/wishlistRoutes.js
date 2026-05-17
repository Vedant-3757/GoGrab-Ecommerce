const express = require("express");
const router = express.Router();

const protect = require("../middleware/authMiddleware");

const {
  addToWishlist,
  getWishlist,
  removeFromWishlist,
} = require("../controllers/wishlistController");

// ADD PRODUCT
router.post("/", protect, addToWishlist);

// GET WISHLIST
router.get("/", protect, getWishlist);

// REMOVE PRODUCT
router.delete("/:productId", protect, removeFromWishlist);

module.exports = router;