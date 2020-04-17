import React, { useState } from "react";
import {Link} from "react-router-dom";

const Register = () => {
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
    if (password != password2) {
      console.log("passwords do not match");
    } else {
      console.log("SUCCESS");
    }
  };

  return (
    <div className="container">
      <div className="row py-5">
        <div className="col">
          <div className="card shadow mt-5">
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
                    required
                  />
                </div>
                <div className="form-group">
                  <input
                    type="text"
                    placeholder="Roll Number"
                    name="rollNumber"
                    required
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
                    minLength="6"
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
                    minLength="6"
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
          <img
            src="img/undraw_code_typing_7jnv.svg"
            height="500"
            width="700"
            alt=""
            srcset=""
          />
        </div>
      </div>
    </div>
  );
};

export default Register;
