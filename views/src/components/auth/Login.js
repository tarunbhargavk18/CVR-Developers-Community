import React, { useState } from "react";
import { Link } from "react-router-dom";

const Login = () => {
  const [formData, setFormData] = useState({
    rollNumber: "",
    password: "",
  });

  const { rollNumber, password } = formData;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    console.log("SUCCESS");
  };

  return (
    <div className="container">
      <div className="row my-5">
        <div className="col-md svg">
          <img
            src="img/undraw_Group_chat_unwm.svg"
            height="500"
            width="700"
            alt=""
            srcset=""
          />
        </div>
        <div className="col">
          <div className="card shadow mt-5 mx-3" style={{ top: "5%" }}>
            <div className="card-header justify-content-center">
              <div className="row justify-content-center">
                <i
                  className="far fa-2x fa-user-circle text-primary"
                  style={{ color: "#400082" }}
                ></i>
              </div>
              <div className="row justify-content-center">
                <p className="font-weight-bold m-2 h4">Login</p>
              </div>
            </div>
            <div className="card-body">
              <div className="alert alert-danger bg-danger text-light text-center">
                Invalid credentials
              </div>
              <form action="posts.html">
                <div className="form-group">
                  <input
                    type="text"
                    placeholder="Roll Number"
                    name="rollNumber"
                    required
                    className="form-control"
                    value={rollNumber}
                    onChange={(e) => onChange(e)}
                  />
                </div>
                <div className="form-group">
                  <input
                    type="password"
                    placeholder="Password"
                    name="password"
                    className="form-control"
                    value={password}
                    onChange={(e) => onChange(e)}
                  />
                </div>
                <input
                  type="submit"
                  className="btn btn-primary float-right"
                  value="Login"
                />
              </form>
              <small>
                Don't have an account? <Link to="/register">Sign Up</Link>
              </small>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
