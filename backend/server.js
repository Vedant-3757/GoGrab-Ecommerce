const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const mongoose = require("mongoose");

dotenv.config();

const app = express();

// middleware
app.use(cors());
app.use(express.json());

//mongo connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected ✅"))
  .catch((err) => console.log("MongoDB Error ❌", err));

// routes

// auth route
const authRoutes = require("./routes/authRoutes");
app.use("/api/auth", authRoutes);

// product route
const productRoutes = require("./routes/productRoutes");
app.use("/api/products", productRoutes);

// cart route
const cartRoutes = require("./routes/cartRoutes");
app.use("/api/cart", cartRoutes);

// order route
const orderRoutes = require("./routes/orderRoutes");
app.use("/api/orders", orderRoutes);

// test route
app.get("/", (req, res) => {
  res.send("GoGrab Backend Running 🚀");
});

// server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});