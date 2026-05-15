import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import "./index.css";
import App from "./App.jsx";

import { WishlistProvider } from "./fContext/gWishlistContext.jsx";
import CartProvider from "./fContext/bCartProvider.jsx";
import SearchProvider from "./fContext/dSearchProvider.jsx";
import AuthProvider from "./fContext/fAuthProvider.jsx";
import { HOrderProvider } from "./fContext/hOrderContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>

      <AuthProvider>
        <SearchProvider>
          <CartProvider>
            <WishlistProvider>
              <HOrderProvider>

                <App />

                <Toaster
                  position="top-right"
                  toastOptions={{
                    style: {
                      background: "#111",
                      color: "#fff",
                      borderRadius: "14px",
                      padding: "14px",
                    },
                  }}
                />

              </HOrderProvider>
            </WishlistProvider>
          </CartProvider>
        </SearchProvider>
      </AuthProvider>

    </BrowserRouter>
  </React.StrictMode>
);