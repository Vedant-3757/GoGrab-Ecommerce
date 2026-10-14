const express = require("express");
const router = express.Router();

const {
  placeOrder,
  getUserOrders,
  getOrderById,
  updateOrderStatus,
  getAllOrders,
  deleteOrder,
} = require("../controllers/orderController");

// middlewares
const protect = require("../middleware/authMiddleware");
const adminOnly = require("../middleware/adminMiddleware");

// place order
router.post("/", protect, placeOrder);

// get my orders 
router.get("/my-orders", protect, getUserOrders);

// Admin: get all orders
router.get("/admin/all", protect, adminOnly, getAllOrders);

// update order status admin only
router.put("/:id", protect, adminOnly, updateOrderStatus);
//delete orderes ordered by users and after placing 
router.delete("/:id", protect, adminOnly, deleteOrder);

module.exports = router;