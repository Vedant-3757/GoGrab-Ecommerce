const User = require("../models/User");

const adminOnly = async (req, res, next) => {
  try {
    // req.user comes from authMiddleware
    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    if (user.role !== "admin") {
      return res.status(403).json({
        message: "Admin access only",
      });
    }

    next();
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

module.exports = adminOnly;