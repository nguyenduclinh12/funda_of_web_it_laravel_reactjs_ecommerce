import React from "react";
import { Route, Routes } from "react-router-dom";

import MasterLayout from "../layouts/admin/MasterLayout";
import Profile from "../components/admin/Profile";
import Home from "../components/frontend/Home";
import Dashboard from "../components/admin/Dashboard";
import Login from "../components/frontend/auth/Login";
import Register from "../components/frontend/auth/Register";
import PrivateRoutes from "./PrivateRoutes";

const routes = [
  {
    path: "/",
    element: (
      <PrivateRoutes>
        <Home />
      </PrivateRoutes>
    ),
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/admin",
    element: (
      <PrivateRoutes>
        <MasterLayout />
      </PrivateRoutes>
    ),
    children: [
      { index: true, element: <Dashboard /> },
      { path: "profile", element: <Profile /> },
    ],
  },
];
export default routes;
