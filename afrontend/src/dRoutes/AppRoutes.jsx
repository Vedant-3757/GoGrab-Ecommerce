import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";

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

import PageTransition from "../animations/PageTransition.jsx";

function AppRoutes() {

  const location = useLocation();

  return (
    <AnimatePresence mode="wait">

      <Routes location={location} key={location.pathname}>

        {/* MAIN */}
        <Route
          path="/"
          element={
            <PageTransition>
              <Home />
            </PageTransition>
          }
        />

        {/* AUTH */}
        <Route
          path="/login"
          element={
            <PageTransition>
              <Login />
            </PageTransition>
          }
        />

        <Route
          path="/register"
          element={
            <PageTransition>
              <Register />
            </PageTransition>
          }
        />

        {/* PRODUCT FLOW */}
        <Route
          path="/product/:id"
          element={
            <PageTransition>
              <ProductDetails />
            </PageTransition>
          }
        />

        <Route
          path="/search"
          element={
            <PageTransition>
              <Search />
            </PageTransition>
          }
        />

        {/* CART FLOW */}
        <Route
          path="/cart"
          element={
            <PageTransition>
              <Cart />
            </PageTransition>
          }
        />

        <Route
          path="/checkout"
          element={
            <PageTransition>
              <Checkout />
            </PageTransition>
          }
        />

        {/* USER */}
        <Route
          path="/profile"
          element={
            <PageTransition>
              <Profile />
            </PageTransition>
          }
        />

        <Route
          path="/activities"
          element={
            <PageTransition>
              <Activities />
            </PageTransition>
          }
        />

        {/* ORDER FLOW */}
        <Route
          path="/order-success"
          element={
            <PageTransition>
              <OrderSuccess />
            </PageTransition>
          }
        />

        <Route
          path="/order/:id"
          element={
            <PageTransition>
              <OrderDetails />
            </PageTransition>
          }
        />

        {/* 404 */}
        <Route
          path="*"
          element={
            <PageTransition>
              <NotFound />
            </PageTransition>
          }
        />

      </Routes>

    </AnimatePresence>
  );
}

export default AppRoutes;