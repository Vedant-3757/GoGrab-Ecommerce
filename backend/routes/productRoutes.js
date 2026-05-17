const express = require("express");
const router = express.Router();

const {
  addProduct,
  getProducts,
  getProduct,
  deleteProduct,
} = require("../controllers/productController");

// middleware imports
const protect = require("../middleware/authMiddleware");
const adminOnly = require("../middleware/adminMiddleware");

// ROUTES

// Admin only
router.post("/", protect, adminOnly, addProduct);

// Public
router.get("/", getProducts);

// Public
router.get("/:id", getProduct);

// Admin only
router.delete("/:id", protect, adminOnly, deleteProduct);

module.exports = router;