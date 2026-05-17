const express = require("express");
const router = express.Router();

const {
  placeOrder,
  getUserOrders,
} = require("../controllers/orderController");

const protect = require("../middleware/authMiddleware");

// PLACE ORDER
router.post("/", protect, placeOrder);

// GET USER ORDERS
router.get("/", protect, getUserOrders);

module.exports = router;