const Order = require("../models/Order");

// place order
exports.placeOrder = async (req, res) => {
  try {
    const {
      products,
      totalAmount,
      shippingAddress,
      phoneNumber,
      paymentMethod,
    } = req.body;

    // validation
    if (!products || products.length === 0) {
      return res.status(400).json({
        message: "No products in order",
      });
    }

    if (!totalAmount || !shippingAddress || !phoneNumber) {
      return res.status(400).json({
        message: "Missing required fields",
      });
    }

    const order = await Order.create({
      userId: req.user._id,
      products,
      totalAmount,
      shippingAddress,
      phoneNumber,
      paymentMethod: paymentMethod || "COD",
      orderStatus: "Pending",
    });

    res.status(201).json({
      message: "Order placed successfully",
      order,
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

// get user orders
exports.getUserOrders = async (req, res) => {
  try {
    const orders = await Order.find({
      userId: req.user._id,
    }).populate("products.productId");

    res.json({
      count: orders.length,
      orders,
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

// get single order by id
exports.getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate(
      "products.productId"
    );

    if (!order) {
      return res.status(404).json({
        message: "Order not found",
      });
    }

    res.json(order);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

// admin order updation
exports.updateOrderStatus = async (req, res) => {
  try {
    const { orderStatus } = req.body;

    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({
        message: "Order not found",
      });
    }

    order.orderStatus = orderStatus;

    await order.save();

    res.json({
      message: "Order status updated",
      order,
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};
 // Admin: get all customer orders
exports.getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("userId", "name email")
      .populate("products.productId")
      .sort({ createdAt: -1 });

    res.json({
      count: orders.length,
      orders,
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

 // Admin: delete an order
exports.deleteOrder = async (req, res) => {
  try {
    const order = await Order.findByIdAndDelete(req.params.id);

    if (!order) {
      return res.status(404).json({
        message: "Order not found",
      });
    }

    res.json({
      message: "Order deleted successfully",
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};
