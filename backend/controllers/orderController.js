const Order = require("../models/Order");

exports.placeOrder = async (req, res) => {
  try {
    const {
      userId,
      products,
      totalAmount,
      shippingAddress,
      paymentMethod,
    } = req.body;

    const order = await Order.create({
      userId,
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

exports.getUserOrders = async (req, res) => {
  try {
    const orders = await Order.find({
      userId: req.params.userId,
    }).populate("products.productId");

    res.json(orders);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};