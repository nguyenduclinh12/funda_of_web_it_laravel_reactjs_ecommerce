import { Navigate } from "react-router-dom";

function PrivateRoutes({ children }) {
  const authToken = localStorage.getItem("auth_token");
  console.log(authToken)
  return authToken ? children : <Navigate to="/login" />;
}

export default PrivateRoutes;
