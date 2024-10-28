import React, { useState } from "react";
import Navbar from "../../../layouts/frontend/Navbar";
import axios from "../../../lib/axios";
import imgLoading from "../../../assets/admin/img/loading.gif";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [loginInput, setLoginInput] = useState({
    email: "",
    password: "",
    errors: [],
  });
  const navigate = useNavigate();

  const handleInput = (e) => {
    setLoginInput({ ...loginInput, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    setIsLoading(true);
    e.preventDefault();
    const data = {
      email: loginInput.email,
      password: loginInput.password,
    };
    await axios
      .post("api/auth/login", data)
      .then((res) => {
        console.log(res);
        if (res.status === 200) {
          console.log(res.data)
          localStorage.setItem("auth_token", res.data.token);
          localStorage.setItem("auth_name", res.data.username);
          navigate("/");
        } else {
          setLoginInput({
            ...loginInput,
            errors: res.data.errors,
          });
        }
      })
      .catch((err) => {
        setLoginInput({
          ...loginInput,
          errors: err.response.data.errors,
        });
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <>
      <Navbar></Navbar>
      <div className="container py-5">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="card">
              <div className="card-header">
                <h4>Login</h4>
              </div>
              <div className="card-body">
                <form action="" onSubmit={handleSubmit}>
                  <div className="form-group mb-3">
                    <label htmlFor="">Email ID</label>
                    <input
                      type="email"
                      name="email"
                      onChange={handleInput}
                      value={loginInput.email}
                      className="form-control"
                    />
                    {loginInput.errors?.email ? (
                      <span className="text-danger">
                        * {loginInput.errors?.email}
                      </span>
                    ) : (
                      ""
                    )}
                  </div>
                  <div className="form-group mb-3">
                    <label htmlFor="">Password</label>
                    <input
                      type="password"
                      name="password"
                      onChange={handleInput}
                      value={loginInput.password}
                      className="form-control"
                    />
                    {loginInput.errors?.password ? (
                      <span className="text-danger">
                        * {loginInput.errors?.password}
                      </span>
                    ) : (
                      ""
                    )}
                  </div>

                  <div className="form-group mb-3">
                    <button type="submit" className="btn btn-primary">
                      {isLoading ? <img src={imgLoading} alt="" /> : "Login"}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
