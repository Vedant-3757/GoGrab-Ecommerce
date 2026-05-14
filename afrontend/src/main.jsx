import React from "react";
import ReactDOM from "react-dom/client";

import { BrowserRouter } from "react-router-dom";

import "./index.css";

import App from "./App.jsx";
import {
  WishlistProvider,
} from "./fContext/gWishlistContext.jsx";

import CartProvider from "./fContext/bCartProvider.jsx";
import SearchProvider from "./fContext/dSearchProvider.jsx";
import AuthProvider from "./fContext/fAuthProvider.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <SearchProvider>
          <CartProvider>
            <WishlistProvider>
              <App />
            </WishlistProvider>
          </CartProvider>
        </SearchProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);