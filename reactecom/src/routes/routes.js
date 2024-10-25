import React from "react";
import { Route, Routes } from "react-router-dom";

import MasterLayout from "../layouts/admin/MasterLayout";
import Profile from "../components/admin/Profile";
import Home from "../components/frontend/Home";
import Dashboard from "../components/admin/Dashboard";

const routes = [
  {
    path: "/admin",
    element: <MasterLayout />,
    children: [
      { index: true, element: <Dashboard /> },
      { index: false, path: "profile", element: <Profile /> },
    ],
  },
  {
    path: "/",
    element: <Home />,
  },
];
export default routes;
