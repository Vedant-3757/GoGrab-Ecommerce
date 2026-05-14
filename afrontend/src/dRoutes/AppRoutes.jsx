import { Routes, Route } from "react-router-dom";

import Home from "../cPages/aHome/Home.jsx";
import Login from "../cPages/bLogin/Login.jsx";
import Register from "../cPages/cRegister/Register.jsx";
import Cart from "../cPages/dCart/Cart.jsx";
import Checkout from "../cPages/eCheckout/Checkout.jsx";
import Search from "../cPages/fSearch/Search.jsx";
import ProductDetails from "../cPages/gProductDetails/ProductDetails.jsx";
import Profile from "../cPages/hProfile/Profile.jsx";
import Activities from "../cPages/iActivities/Activities.jsx";
import NotFound from "../cPages/jNotFound/NotFound.jsx";
import OrderSuccess from "../cPages/kOrderSuccess/OrderSuccess.jsx";
import OrderDetails from "../cPages/kOrderSuccess/OrderDetails.jsx";

function AppRoutes() {
  return (
    <Routes>

      {/* MAIN */}
      <Route path="/" element={<Home />} />

      {/* AUTH */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* PRODUCT FLOW */}
      <Route path="/product/:id" element={<ProductDetails />} />
      <Route path="/search" element={<Search />} />

      {/* CART FLOW */}
      <Route path="/cart" element={<Cart />} />
      <Route path="/checkout" element={<Checkout />} />

      {/* USER */}
      <Route path="/profile" element={<Profile />} />
      <Route path="/activities" element={<Activities />} />

      {/* ORDER FLOW */}
      <Route path="/order-success" element={<OrderSuccess />} />
      <Route path="/order/:id" element={<OrderDetails />} />

      {/* 404 */}
      <Route path="*" element={<NotFound />} />

    </Routes>
  );
}

export default AppRoutes;