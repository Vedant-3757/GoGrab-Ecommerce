const Product = require("../models/Product");

// ================= CREATE PRODUCT =================
exports.addProduct = async (req, res) => {
  try {
    const product = await Product.create(req.body);

    res.status(201).json(product);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

// ================= GET ALL PRODUCTS =================
exports.getProducts = async (req, res) => {
  try {
    const {
      keyword,
      category,
      minPrice,
      maxPrice,
      sort,
    } = req.query;

    let query = {};

    // SEARCH BY NAME
    if (keyword) {
      query.name = {
        $regex: keyword,
        $options: "i",
      };
    }

    // FILTER BY CATEGORY
    if (category) {
      query.category = {
        $regex: category,
        $options: "i",
      };
    }

    // FILTER BY PRICE
    if (minPrice || maxPrice) {
      query.price = {};

      if (minPrice) {
        query.price.$gte = Number(minPrice);
      }

      if (maxPrice) {
        query.price.$lte = Number(maxPrice);
      }
    }

    let products = Product.find(query);

    // SORTING
    if (sort === "low") {
      products = products.sort({ price: 1 });
    }

    if (sort === "high") {
      products = products.sort({ price: -1 });
    }

    if (sort === "latest") {
      products = products.sort({ createdAt: -1 });
    }

    const finalProducts = await products;

    res.json(finalProducts);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

// ================= GET SINGLE PRODUCT =================
exports.getProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    res.json(product);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

// ================= DELETE PRODUCT =================
exports.deleteProduct = async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);

    res.json({
      message: "Product deleted",
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

// ================= ADD REVIEW =================
exports.addReview = async (req, res) => {
  try {
    const { rating, comment } = req.body;

    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    // CHECK IF USER ALREADY REVIEWED
    const alreadyReviewed = product.reviews.find(
      (review) => review.user.toString() === req.user._id.toString()
    );

    if (alreadyReviewed) {
      return res.status(400).json({
        message: "Product already reviewed",
      });
    }

    const review = {
      user: req.user._id,
      name: req.user.name,
      rating: Number(rating),
      comment,
    };

    product.reviews.push(review);

    product.numReviews = product.reviews.length;

    product.ratings =
      product.reviews.reduce((acc, item) => item.rating + acc, 0) /
      product.reviews.length;

    await product.save();

    res.status(201).json({
      message: "Review added",
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};