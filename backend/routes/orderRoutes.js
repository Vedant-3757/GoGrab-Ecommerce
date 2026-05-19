const express = require("express");
const router = express.Router();

const {
  placeOrder,
  getUserOrders,
  getOrderById,
  updateOrderStatus,
} = require("../controllers/orderController");

// middlewares
const protect = require("../middleware/authMiddleware");
const adminOnly = require("../middleware/adminMiddleware");

// place order
router.post("/", protect, placeOrder);

// get my orders 
router.get("/my-orders", protect, getUserOrders);

// get single order 
router.get("/:id", protect, getOrderById);

// update order status admin only
router.put("/:id", protect, adminOnly, updateOrderStatus);

module.exports = router;