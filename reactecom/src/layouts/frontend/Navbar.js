import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "../../lib/axios";

const Navbar = () => {
  const [isLogin, setIsLogin] = useState(true);
  const navigate = useNavigate();
  useEffect(() => {
    if (localStorage.getItem("auth_token")) {
      setIsLogin(false);
    }
  }, []);

  const logoutSubmit = (e) => {
    e.preventDefault();
    axios.post("api/logout").then((res) => {
      if (res.data.status === 200) {
        localStorage.removeItem("auth_token", res.data.token);
        localStorage.removeItem("auth_name", res.data.username);
        navigate("/");
      }
    });
  };

  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary  shadow sticky-top">
      <div className="container-fluid">
        <Link className="navbar-brand" href="#">
          Navbar
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link active" aria-current="page" to="/">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" href="#">
                Collection
              </Link>
            </li>
            {isLogin ? (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/login">
                    Login
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/register">
                    Register
                  </Link>
                </li>
              </>
            ) : (
              <li className="nav-item">
                <Link className="nav-link" to="/logout">
                  <button
                    type="button"
                    className="btn btn-danger btn-sm"
                    onClick={logoutSubmit}
                  >
                    Logout
                  </button>
                </Link>
              </li>
            )}
          </ul>
          <form className="d-flex" role="search">
            <input
              className="form-control me-2"
              type="search"
              placeholder="Search"
              aria-label="Search"
            />
            <button className="btn btn-outline-success" type="submit">
              Search
            </button>
          </form>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
