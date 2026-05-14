import Navbar from "./bComponents/aNavbar/aNavbar.jsx";
import Footer from "./bComponents/bFooter/aFooter.jsx";
import AppRoutes from "./dRoutes/AppRoutes.jsx";
import ScrollToTop from "./ScrollToTop.jsx";


function App() {
  return (
    <>
      <ScrollToTop />

      <Navbar />

      <AppRoutes />

      <Footer />
    </>
  );
}

export default App;