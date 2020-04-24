import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { setAlert } from "../../actions/alert";
import { register } from "../../actions/auth";
import registersvg from "../../img/undraw_code_typing_7jnv.svg";
import propTypes from "prop-types";

const Register = ({ setAlert, register, isAuthenticated }) => {
  const [formData, setFormData] = useState({
    name: "",
    rollNumber: "",
    password: "",
    password2: "",
  });

  const { name, rollNumber, password, password2 } = formData;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (password !== password2) {
      setAlert("Passwords do not match", "danger"); //From props.setAlert
    } else {
      register({ name, rollNumber, password });
    }
  };

  //Redirect if logged in
  if (isAuthenticated) {
    return <Redirect to="/settings" />;
  }

  return (
    <div className="container">
      <div className="row mt-5">
        <div className="col-md-4">
          <div className="card shadow-sm mt-5 mx-2">
            <div className="card-header justify-content-center">
              <div className="row justify-content-center">
                <i
                  className="far fa-2x fa-user-circle text-primary"
                  style={{ color: "#400082" }}
                ></i>
              </div>
              <div className="row justify-content-center">
                <p className="font-weight-bold m-2 h4">Register</p>
              </div>
            </div>
            <div className="card-body">
              <form action="create_profile.html" onSubmit={(e) => onSubmit(e)}>
                <div className="form-group">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Full Name"
                    name="name"
                    value={name}
                    onChange={(e) => onChange(e)}
                    // required
                  />
                </div>
                <div className="form-group">
                  <input
                    type="text"
                    placeholder="Roll Number"
                    name="rollNumber"
                    // required
                    value={rollNumber}
                    onChange={(e) => onChange(e)}
                    className="form-control"
                  />
                </div>
                <div className="form-group">
                  <input
                    type="password"
                    placeholder="Password"
                    name="password"
                    className="form-control"
                    // minLength="6"
                    value={password}
                    onChange={(e) => onChange(e)}
                  />
                </div>
                <div className="form-group">
                  <input
                    type="password"
                    placeholder="Confirm Password"
                    name="password2"
                    className="form-control"
                    // minLength="6"
                    value={password2}
                    onChange={(e) => onChange(e)}
                  />
                </div>
                <input
                  type="submit"
                  className="btn btn-primary float-right"
                  value="Register"
                />
              </form>
              <small>
                Already have an account? <Link to="/login">Sign In</Link>
              </small>
            </div>
          </div>
        </div>
        <div className="col-md svg">
          <img src={registersvg} width="100%" height="90%" alt="" />
        </div>
      </div>
    </div>
  );
};

Register.propTypes = {
  setAlert: propTypes.func.isRequired,
  register: propTypes.func.isRequired,
  isAuthenticated: propTypes.bool,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { setAlert, register })(Register);
