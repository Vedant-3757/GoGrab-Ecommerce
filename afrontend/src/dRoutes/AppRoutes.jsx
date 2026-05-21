import {
  Routes,
  Route,
  useLocation,
} from "react-router-dom";

import { AnimatePresence } from "framer-motion";

/* pages */
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

import EditProfile from "../cPages/hProfile/EditProfile.jsx";
import Payments from "../cPages/hProfile/Payments.jsx";
import RecentlyViewed from "../cPages/hProfile/RecentlyViewed.jsx";
import Stores from "../cPages/hProfile/Stores.jsx";
import Devices from "../cPages/hProfile/Devices.jsx";
import Feedback from "../cPages/hProfile/Feedback.jsx";

/* admin */
import AdminRoute from "../lGuards/AdminRoute.jsx";
import AdminDashboard from "../cPages/admin/AdminnDashboard.jsx";
import AdminProducts from "../cPages/admin/AdminProducts.jsx";
import CreateProduct from "../cPages/admin/CreateProduct.jsx";
import EditProduct from "../cPages/admin/EditProduct.jsx";

import PageTransition from "../kAnimation/PageTransition.jsx";

import ProtectedRoute from "../lGuards/ProtectedRoute.jsx";

function AppRoutes() {

  const location =
    useLocation();

  return (
    <div className="pt-[72px]">

      <AnimatePresence mode="wait">

        <Routes
          location={location}
          key={location.pathname}
        >

          {/* public routes */}
          <Route
            path="/"
            element={
              <PageTransition>
                <Home />
              </PageTransition>
            }
          />

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

          <Route
            path="/ai"
            element={
              <PageTransition>
                <AiAssistant />
              </PageTransition>
            }
          />

          {/* admin route */}
          <Route
            path="/admin"
            element={
              <AdminRoute>
                <AdminDashboard />
              </AdminRoute>
            }
          >
            <Route index element={<AdminProducts />} />
            <Route path="products" element={<AdminProducts />} />
            <Route path="add-product" element={<CreateProduct />} />
            <Route path="edit-product/:id" element={<EditProduct />} />
          </Route>

          {/* protected routes */}
          <Route
            path="/cart"
            element={
              <ProtectedRoute>
                <PageTransition>
                  <Cart />
                </PageTransition>
              </ProtectedRoute>
            }
          />

          <Route
            path="/checkout"
            element={
              <ProtectedRoute>
                <PageTransition>
                  <Checkout />
                </PageTransition>
              </ProtectedRoute>
            }
          />

          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <PageTransition>
                  <Profile />
                </PageTransition>
              </ProtectedRoute>
            }
          />

          <Route
            path="/activities"
            element={
              <ProtectedRoute>
                <PageTransition>
                  <Activities />
                </PageTransition>
              </ProtectedRoute>
            }
          />

          <Route
            path="/wishlist"
            element={
              <ProtectedRoute>
                <PageTransition>
                  <Wishlist />
                </PageTransition>
              </ProtectedRoute>
            }
          />

          {/* profile routes */}
          <Route
            path="/profile/edit"
            element={
              <ProtectedRoute>
                <PageTransition>
                  <EditProfile />
                </PageTransition>
              </ProtectedRoute>
            }
          />

          <Route
            path="/profile/payments"
            element={
              <ProtectedRoute>
                <PageTransition>
                  <Payments />
                </PageTransition>
              </ProtectedRoute>
            }
          />

          <Route
            path="/profile/recent"
            element={
              <ProtectedRoute>
                <PageTransition>
                  <RecentlyViewed />
                </PageTransition>
              </ProtectedRoute>
            }
          />

          <Route
            path="/profile/stores"
            element={
              <ProtectedRoute>
                <PageTransition>
                  <Stores />
                </PageTransition>
              </ProtectedRoute>
            }
          />

          <Route
            path="/profile/devices"
            element={
              <ProtectedRoute>
                <PageTransition>
                  <Devices />
                </PageTransition>
              </ProtectedRoute>
            }
          />

          <Route
            path="/profile/feedback"
            element={
              <ProtectedRoute>
                <PageTransition>
                  <Feedback />
                </PageTransition>
              </ProtectedRoute>
            }
          />

          {/* orders */}
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

    </div>
  );
}

export default AppRoutes;