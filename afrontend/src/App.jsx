import Navbar from "./bComponents/aNavbar/aNavbar.jsx";
import Footer from "./bComponents/bFooter/aFooter.jsx";
import AppRoutes from "./dRoutes/AppRoutes.jsx";
import ScrollToTop from "./ScrollToTop.jsx";

import { Toaster } from "react-hot-toast";

function App() {

  return (
    <>
      <Toaster
        position="top-right"
        reverseOrder={false}
      />

      <ScrollToTop />

      <Navbar />

      <AppRoutes />

      <Footer />
    </>
  );
}

export default App;