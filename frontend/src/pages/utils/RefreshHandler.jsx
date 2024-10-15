import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

function RefreshHandler({ setIsAuthenticated }) {
  const locatoin = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("token")) {
      setIsAuthenticated(true);
      if (
        locatoin.pathname === "/" ||
        locatoin.pathname === "/login" ||
        locatoin.pathname === "/signup"
      ) {
        navigate("/home", { replace: false });
      }
    }
  }, [locatoin, navigate, setIsAuthenticated]);
  return null;
}

export default RefreshHandler;
