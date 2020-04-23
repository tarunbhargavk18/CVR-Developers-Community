import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";

import { connect } from "react-redux";
import { login } from "../../actions/auth";
import propTypes from "prop-types";

const Login = ({ login, isAuthenticated }) => {
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
    login(rollNumber, password);
  };

  //Redirect if logged in
  if (isAuthenticated) {
    return <Redirect to="/settings" />;
  }

  return (
    <div className="container">
      <div className="row mt-5">
        <div className="col-md svg">
          <img
            src="img/undraw_Group_chat_unwm.svg"
            width="100%"
            height="100%"
            alt=""
            srcset=""
          />
        </div>
        <div className="col-md-4">
          <div className="card shadow mt-5 mx-3" style={{ top: "10%" }}>
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
              <form action="posts.html" onSubmit={(e) => onSubmit(e)}>
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

Login.propTypes = {
  login: propTypes.func.isRequired,
  isAuthenticated: propTypes.bool,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { login })(Login);
