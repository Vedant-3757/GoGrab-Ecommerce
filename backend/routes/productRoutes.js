const express = require("express");
const router = express.Router();

const {
  addProduct,
  getProducts,
  getProduct,
  deleteProduct,
  addReview,
} = require("../controllers/productController");

// MIDDLEWARE IMPORTS
const protect = require("../middleware/authMiddleware");
const adminOnly = require("../middleware/adminMiddleware");

// ================= ROUTES =================

// ADMIN ONLY
router.post("/", protect, adminOnly, addProduct);

// PUBLIC
router.get("/", getProducts);

// PUBLIC
router.get("/:id", getProduct);

// ADD REVIEW
router.post("/:id/reviews", protect, addReview);

// ADMIN ONLY
router.delete("/:id", protect, adminOnly, deleteProduct);

module.exports = router;