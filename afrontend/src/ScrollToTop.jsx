import { useEffect } from "react";
import { useLocation } from "react-router-dom";

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    // instant reset (more reliable across browsers)
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;

    // extra safety for modern browsers
    window.scrollTo(0, 0);

  }, [pathname]);

  return null;
}

export default ScrollToTop;