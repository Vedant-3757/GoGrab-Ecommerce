import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { useContext } from "react";

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
import Wishlist from "../cPages/lWishlist/Wishlist.jsx";
import AiAssistant from "../cPages/mAiAssistant/AiAssistant.jsx";

import PageTransition from "../kAnimation/PageTransition.jsx";
import AuthContext from "../fContext/eAuthContext.jsx";

// 🔒 PROTECTED WRAPPER (no logic change, only routing guard)
function ProtectedRoute({ children }) {
  const auth = useContext(AuthContext);
  const user = auth?.user;

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

function AppRoutes() {
  const location = useLocation();

  return (
    <div className="pt-[72px]">
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>

          <Route path="/" element={<PageTransition><Home /></PageTransition>} />
          <Route path="/login" element={<PageTransition><Login /></PageTransition>} />
          <Route path="/register" element={<PageTransition><Register /></PageTransition>} />

          <Route path="/product/:id" element={<PageTransition><ProductDetails /></PageTransition>} />
          <Route path="/search" element={<PageTransition><Search /></PageTransition>} />

          <Route path="/ai" element={<PageTransition><AiAssistant /></PageTransition>} />

          {/* 🔒 PROTECTED ROUTES */}
          <Route
            path="/cart"
            element={
              <ProtectedRoute>
                <PageTransition><Cart /></PageTransition>
              </ProtectedRoute>
            }
          />

          <Route
            path="/checkout"
            element={
              <ProtectedRoute>
                <PageTransition><Checkout /></PageTransition>
              </ProtectedRoute>
            }
          />

          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <PageTransition><Profile /></PageTransition>
              </ProtectedRoute>
            }
          />

          <Route
            path="/activities"
            element={
              <ProtectedRoute>
                <PageTransition><Activities /></PageTransition>
              </ProtectedRoute>
            }
          />

          <Route
            path="/wishlist"
            element={
              <ProtectedRoute>
                <PageTransition><Wishlist /></PageTransition>
              </ProtectedRoute>
            }
          />

          <Route path="/order-success" element={<PageTransition><OrderSuccess /></PageTransition>} />
          <Route path="/order/:id" element={<PageTransition><OrderDetails /></PageTransition>} />

          <Route path="*" element={<PageTransition><NotFound /></PageTransition>} />

        </Routes>
      </AnimatePresence>
    </div>
  );
}

export default AppRoutes;