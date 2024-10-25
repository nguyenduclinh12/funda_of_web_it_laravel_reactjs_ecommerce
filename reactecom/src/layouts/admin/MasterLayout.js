import React from "react";
import Footer from "./Footer";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import "../../assets/admin/vendor/jquery/jquery.min.js";

import "../../assets/admin/vendor/bootstrap/js/bootstrap.bundle.min.js";

import "../../assets/admin/vendor/jquery-easing/jquery.easing.min.js";
import { Outlet } from "react-router-dom";


const MasterLayout = () => {
  return (
    <div id="wrapper">
      {/* Sidebar */}
      <Sidebar />
      {/* Content */}
      <div id="content-wrapper" className="d-flex flex-column">
        <div id="content">
          <Navbar />

          <div className="container-fluid">
            <Outlet />
            {/* <Home /> */}
          </div>
          {/* <!-- /.container-fluid --> */}
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default MasterLayout;
