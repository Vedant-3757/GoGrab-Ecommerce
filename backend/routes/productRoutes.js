const express = require("express");
const router = express.Router();

const {
  addProduct,
  getProducts,
  getProduct,
  deleteProduct,
  addReview,
} = require("../controllers/productController");

// middleware imports
const protect = require("../middleware/authMiddleware");
const adminOnly = require("../middleware/adminMiddleware");
const upload = require("../middleware/uploadMiddleware");

// create product with image upload
router.post(
  "/",
  protect,
  adminOnly,
  upload.array("images", 5), 
  addProduct
);

// public routes
router.get("/", getProducts);
router.get("/:id", getProduct);

// review
router.post("/:id/reviews", protect, addReview);

// delete
router.delete(
  "/:id",
  protect,
  adminOnly,
  deleteProduct
);

module.exports = router;