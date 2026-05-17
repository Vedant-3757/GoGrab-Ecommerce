const Wishlist = require("../models/Wishlist");

// ADD TO WISHLIST
exports.addToWishlist = async (req, res) => {
  try {
    const { productId } = req.body;

    let wishlist = await Wishlist.findOne({
      userId: req.user._id,
    });

    if (!wishlist) {
      wishlist = await Wishlist.create({
        userId: req.user._id,
        products: [{ productId }],
      });
    } else {
      wishlist.products.push({ productId });
      await wishlist.save();
    }

    res.status(201).json(wishlist);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

// GET WISHLIST
exports.getWishlist = async (req, res) => {
  try {
    const wishlist = await Wishlist.findOne({
      userId: req.user._id,
    }).populate("products.productId");

    res.json(wishlist);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

// REMOVE FROM WISHLIST
exports.removeFromWishlist = async (req, res) => {
  try {
    const wishlist = await Wishlist.findOne({
      userId: req.user._id,
    });

    wishlist.products = wishlist.products.filter(
      (item) => item.productId.toString() !== req.params.productId
    );

    await wishlist.save();

    res.json({
      message: "Product removed from wishlist",
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};