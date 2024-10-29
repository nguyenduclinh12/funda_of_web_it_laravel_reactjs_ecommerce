import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import axios from "../lib/axios";

function PrivateRoutes({ children }) {
  const [authenticated, setAuthenticated] = useState(false);
  // useEffect(() => {
  //   axios.get("api/checkingAuthenticated").then((res) => {
  //     if (res.status === 200) {
  //       setAuthenticated(true);
  //     }
  //   });
  // }, []);

  const authToken = localStorage.getItem("auth_token");
  return authToken ? children : <Navigate to="/login" />;
}

export default PrivateRoutes;
