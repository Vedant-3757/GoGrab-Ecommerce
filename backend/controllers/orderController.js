const Order = require("../models/Order");

// PLACE ORDER
exports.placeOrder = async (req, res) => {
  try {
    const {
      products,
      totalAmount,
      shippingAddress,
      paymentMethod,
    } = req.body;

    const order = await Order.create({
      userId: req.user._id,
      products,
      totalAmount,
      shippingAddress,
      paymentMethod,
    });

    res.status(201).json(order);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

// GET LOGGED IN USER ORDERS
exports.getUserOrders = async (req, res) => {
  try {
    const orders = await Order.find({
      userId: req.user._id,
    }).populate("products.productId");

    res.json(orders);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};