const Product =
  require("../models/Product");
exports.addProduct = async (
  req,
  res
) => {
  try {
    const {
      name,
      description,
      price,
      category,
    } = req.body;
    if (
      !req.files ||
      req.files.length === 0
    ) {
      return res.status(400).json({
        message:
          "At least one image is required",
      });
    }
    const imageUrls =
      req.files.map(
        (file) => file.path
      );
    const product =
      await Product.create({
        name,
        description,
        price,
        category,
        images: imageUrls,
      });
    res.status(201).json(product);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};
exports.getProducts = async (
  req,
  res
) => {
  try {
    const {
      keyword,
      category,
      minPrice,
      maxPrice,
      sort,
    } = req.query;
    let query = {};
    if (keyword) {
      query.name = {
        $regex: keyword,
        $options: "i",
      };
    }
    if (category) {
      query.category = {
        $regex: category,
        $options: "i",
      };
    }
    if (
      minPrice ||
      maxPrice
    ) {
      query.price = {};
      if (minPrice)
        query.price.$gte =
          Number(minPrice);
      if (maxPrice)
        query.price.$lte =
          Number(maxPrice);
    }
    let products =
      Product.find(query);
    if (sort === "low") {
      products =
        products.sort({
          price: 1,
        });
    }
    if (sort === "high") {
      products =
        products.sort({
          price: -1,
        });
    }
    if (sort === "latest") {
      products =
        products.sort({
          createdAt: -1,
        });
    }
    const finalProducts =
      await products;
    res.json(finalProducts);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};
exports.getProduct = async (
  req,
  res
) => {

  try {

    const product =
      await Product.findById(
        req.params.id
      );

    if (!product) {

      return res.status(404).json({
        message: "Product not found",
      });

    }

    res.json(product);

  } catch (err) {

    console.log(err);

    res.status(500).json({
      message: err.message,
    });

  }

};
exports.updateProduct = async (
  req,
  res
) => {
  try {
    const {
      name,
      description,
      price,
      category,
    } = req.body;
    const product =
      await Product.findById(
        req.params.id
      );
    if (!product) {
      return res.status(404).json({
        message:
          "Product not found",
      });
    }
    product.name =
      name || product.name;
    product.description =
      description ||
      product.description;
    product.price =
      price || product.price;
    product.category =
      category ||
      product.category;
    await product.save();
    res.json({
      success: true,
      message:
        "Product updated successfully",
      product,
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};
exports.deleteProduct = async (
  req,
  res
) => {
  try {
    await Product.findByIdAndDelete(
      req.params.id
    );
    res.json({
      message:
        "Product deleted",
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};
exports.addReview = async (
  req,
  res
) => {
  try {
    const {
      rating,
      comment,
    } = req.body;
    const product =
      await Product.findById(
        req.params.id
      );
    if (!product) {
      return res.status(404).json({
        message:
          "Product not found",
      });
    }
    const alreadyReviewed =
      product.reviews.find(
        (r) =>
          r.user.toString() ===
          req.user._id.toString()
      );
    if (alreadyReviewed) {
      return res.status(400).json({
        message:
          "Already reviewed",
      });
    }
    const review = {
      user:
        req.user._id,
      name:
        req.user.name,
      rating:
        Number(rating),
      comment,
    };
    product.reviews.push(
      review
    );
    product.numReviews =
      product.reviews.length;
    product.ratings =
      product.reviews.reduce(
        (acc, item) =>
          acc + item.rating,
        0
      ) /
      product.reviews.length;
    await product.save();
    res.status(201).json({
      message:
        "Review added successfully",
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};