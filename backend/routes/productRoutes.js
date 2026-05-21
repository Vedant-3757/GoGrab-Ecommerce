const express = require("express");
const router = express.Router();
const {
  addProduct,
  getProducts,
  getProduct,
  deleteProduct,
  updateProduct,
  addReview,
} = require("../controllers/productController");
const protect =
  require("../middleware/authMiddleware");
const adminOnly =
  require("../middleware/adminMiddleware");
const upload =
  require("../middleware/uploadMiddleware");
router.post(
  "/",
  protect,
  adminOnly,
  upload.array("images", 5),
  addProduct
);
router.get("/", getProducts);
router.get("/:id", getProduct);
router.post(
  "/:id/reviews",
  protect,
  addReview
);
router.put(
  "/:id",
  protect,
  adminOnly,
  updateProduct
);
router.delete(
  "/:id",
  protect,
  adminOnly,
  deleteProduct
);

module.exports = router;