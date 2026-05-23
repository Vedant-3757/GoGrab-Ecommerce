require("dotenv").config();
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const aiRoutes = require("./routes/aiRoutes");
const paymentRoutes = require("./routes/paymentRoutes");
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/ai", aiRoutes);
app.use("/api/payment", paymentRoutes);
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB Connected ✅");
  })
  .catch((err) => {
    console.log("MongoDB Error ❌", err);
    process.exit(1);
  });
// auth routes
app.use(
  "/api/auth",
  require("./routes/authRoutes")
);

// product routes
app.use(
  "/api/products",
  require("./routes/productRoutes")
);

// cart routes
app.use(
  "/api/cart",
  require("./routes/cartRoutes")
);

// order routes
app.use(
  "/api/orders",
  require("./routes/orderRoutes")
);

// wishlist routes
app.use(
  "/api/wishlist",
  require("./routes/wishlistRoutes")
);
// HEALTH CHECK
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message:
      "GoGrab Backend Running 🚀",
  });
});
// 404 HANDLER
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message:
      "API Route Not Found",
  });
});
// SERVER
const PORT =
  process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(
    `Server Running On Port ${PORT} 🚀`
  );
});