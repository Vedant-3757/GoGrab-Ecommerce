const Product = require("../models/Product");

// create product
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

// get all products with search, filter and sort
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

    // search by name
    if (keyword) {
      query.name = {
        $regex: keyword,
        $options: "i",
      };
    }

    // filter by category
    if (category) {
      query.category = {
        $regex: category,
        $options: "i",
     };
    }
    // filter by price 
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

    // sorting
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

// get single product
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

// delete product
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