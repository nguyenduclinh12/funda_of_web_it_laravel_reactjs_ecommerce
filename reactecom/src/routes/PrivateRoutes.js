import { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import axios from "../lib/axios";

function PrivateRoutes({ children }) {
  const [authenticated, setAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  useEffect(() => {
    axios
      .get("api/checkingAuthenticated")
      .then((res) => {
        // console.log(res);
        if (res.status === 200) {
          setAuthenticated(true);
        } 
        
        setLoading(false);
      })
      .catch((err) => {
        if(err.status===403){
          navigate('/403');
        }else if(err.status ===404){
          navigate('/404');
        }
        setLoading(false);
      });
  }, []);
  if (loading) {
    return null;
  }
  // const authToken = localStorage.getItem("auth_token");
  // return authToken ? children : <Navigate to="/login" />;
  return authenticated ? children : <Navigate to="/login" />;
}

export default PrivateRoutes;
