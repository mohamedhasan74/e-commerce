import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";
import Footer from "../Footer/Footer.jsx";
import Navbar from "../Navbar/Navbar.jsx";
import { useDispatch } from "react-redux";
import { saveToken } from "../../ReduxToolKit/tokenReducer.js";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Offline } from "react-detect-offline";
function Layout() {
  const dispatch = useDispatch();
  useEffect(() => {
    if (localStorage.getItem("userToken")) {
      const token = localStorage.getItem("userToken");
      dispatch(saveToken(token));
    }
  }, []);
  return (
    <>
      <ToastContainer />
      <Offline>
        <div className="offline fw-bolder">
          You're offline right now. Check your connection.
          <i class="fa-solid fa-wifi text-danger ms-2"></i>
        </div>
      </Offline>
      <Navbar />
      <div className="container">
        <Outlet />
      </div>
      {/* <Footer /> */}
    </>
  );
}

export default Layout;
