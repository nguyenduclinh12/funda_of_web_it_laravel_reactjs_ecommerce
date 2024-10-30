import React from "react";
import Footer from "./Footer";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import $ from "jquery";

import "../../assets/admin/vendor/bootstrap/js/bootstrap.bundle.min.js";

import "../../assets/admin/vendor/jquery-easing/jquery.easing.min.js";
// import "../../assets/admin/js/sb-admin-2.min.js";
// import "../../assets/admin/js/demo/datatables-demo.js";
// import "../../assets/admin/vendor/datatables/dataTables.bootstrap4.min.css";
import "../../assets/admin/vendor/datatables/jquery.dataTables.min.js";
// import "../../assets/admin/vendor/datatables/dataTables.bootstrap4.min.js";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
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
