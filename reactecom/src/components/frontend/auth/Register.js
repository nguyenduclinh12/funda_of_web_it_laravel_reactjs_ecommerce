import React, { useState } from "react";
import Navbar from "../../../layouts/frontend/Navbar";
import axios from "../../../lib/axios";

const Register = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [registerInput, setRegisterInput] = useState({
    name: "",
    email: "",
    password: "",
    error_list: [],
  });
  const handleInput = (e) => {
    setRegisterInput({ ...registerInput, [e.target.name]: e.target.value });
  };
  const csrf = () => axios.get("sanctum/csrf-cookie");
  const registerSubmit = async (e) => {
    e.preventDefault();

    const data = {
      name: registerInput.name,
      email: registerInput.email,
      password: registerInput.password,
    };

    await csrf();
    await axios
      .post("api/auth/register", data)
      .then((res) => {
        console.log(res.data);
        if (res.data.status === 200) {
          localStorage.setItem("auth_token", res.data.token);
          localStorage.setItem("auth_name", res.data.username);
        } else {
          setRegisterInput({
            ...registerInput,
            error_list: res.data.errors,
          });
        }
      })
      .catch((err) => {
        setRegisterInput({
          ...registerInput,
          error_list: err.response.data.errors,
        });
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
                <h4>Register</h4>
              </div>
              <div className="card-body">
                <form action="" onSubmit={registerSubmit}>
                  <div className="form-group mb-3">
                    <label htmlFor="">Full Name</label>
                    <input
                      type="text"
                      name="name"
                      value={registerInput.name}
                      onChange={handleInput}
                      className="form-control"
                    />
                    {registerInput.error_list.name ? (
                      <span className="text-danger">
                        * {registerInput.error_list.name}
                      </span>
                    ) : (
                      ""
                    )}
                  </div>
                  <div className="form-group mb-3">
                    <label htmlFor="">Email ID</label>
                    <input
                      type="email"
                      name="email"
                      value={registerSubmit.email}
                      onChange={handleInput}
                      className="form-control"
                    />
                    {registerInput.error_list.email ? (
                      <span className="text-danger">
                        * {registerInput.error_list.email}
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
                      value={registerInput.password}
                      onChange={handleInput}
                      className="form-control"
                    />
                    {registerInput.error_list.password ? (
                      <span className="text-danger">
                        * {registerInput.error_list.password}
                      </span>
                    ) : (
                      ""
                    )}
                  </div>

                  <div className="form-group mb-3">
                    <button type="submit" className="btn btn-primary">
                      Register
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

export default Register;
