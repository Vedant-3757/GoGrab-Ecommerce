const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const mongoose = require("mongoose");

dotenv.config();

const app = express();

// ================= MIDDLEWARE =================
app.use(cors());
app.use(express.json());

// ================= MONGODB CONNECTION =================
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected ✅"))
  .catch((err) => console.log("MongoDB Error ❌", err));

// ================= ROUTES =================

// Auth Routes
const authRoutes = require("./routes/authRoutes");
app.use("/api/auth", authRoutes);

// Product Routes
const productRoutes = require("./routes/productRoutes");
app.use("/api/products", productRoutes);

// Cart Routes (ADDED)
const cartRoutes = require("./routes/cartRoutes");
app.use("/api/cart", cartRoutes);

// ================= TEST ROUTE =================
app.get("/", (req, res) => {
  res.send("GoGrab Backend Running 🚀");
});

// ================= SERVER =================
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});