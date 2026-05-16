import Navbar from "./bComponents/aNavbar/aNavbar.jsx";
import Footer from "./bComponents/bFooter/aFooter.jsx";
import AppRoutes from "./dRoutes/AppRoutes.jsx";
import ScrollToTop from "./ScrollToTop.jsx";

import { Toaster } from "react-hot-toast";

function App() {
  return (
    <>
      <ScrollToTop />

      {/* ✅ GLOBAL TOASTER */}
      <Toaster
        position="top-center"
        toastOptions={{
          duration: 2500,
          style: {
            borderRadius: "14px",
            background: "#111",
            color: "#fff",
          },
        }}
      />

      <Navbar />

      <AppRoutes />

      <Footer />
    </>
  );
}

export default App;