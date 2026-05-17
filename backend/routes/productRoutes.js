const express = require("express");
const router = express.Router();

const {
  addProduct,
  getProducts,
  getProduct,
  deleteProduct,
} = require("../controllers/productController");

router.post("/", addProduct);
router.get("/", getProducts);
router.get("/:id", getProduct);
router.delete("/:id", deleteProduct);

module.exports = router;