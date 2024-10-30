import React from "react";
import { Route, Routes } from "react-router-dom";

import MasterLayout from "../layouts/admin/MasterLayout";
import Profile from "../components/admin/Profile";
import Home from "../components/frontend/Home";
import Dashboard from "../components/admin/Dashboard";
import Login from "../components/frontend/auth/Login";
import Register from "../components/frontend/auth/Register";
import PrivateRoutes from "./PrivateRoutes";
import Page403 from "../components/errors/Page403";
import Page404 from "../components/errors/Page404";
import Category from "../components/admin/category/Category";
import CategoryView from "../components/admin/category/CategoryView";
import CategoryEdit from "../components/admin/category/CategoryEdit";

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
    path: "/403",
    element: <Page403 />,
  },
  {
    path: "/404",
    element: <Page404 />,
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
      { path: "category", element: <Category /> },
      { path: "category-view", element: <CategoryView /> },
      { path: "category-edit/:id", element: <CategoryEdit /> },
    ],
  },
];
export default routes;
