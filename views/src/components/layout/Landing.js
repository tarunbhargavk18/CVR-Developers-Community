import React from "react";
import { Link, Redirect } from "react-router-dom";
import Particles from "react-particles-js";
import { connect } from "react-redux";
import propTypes from "prop-types";
import whiteLogo from "../../img/mp-logo-white.png";

const styles = {
  root: {
    fontFamily: "sans-serif",
    textAlign: "center",
    height: "80%",
    width: "100%",
    backgroundImage: "linear-gradient(to right, #314755,#26a0da)",
  },
};

export const Landing = ({ isAuthenticated }) => {
  if (isAuthenticated) {
    return <Redirect to="/settings" />;
  }
  return (
    <div style={styles.root}>
      <div id="content">
        <div className="row">
          <img
            src={whiteLogo}
            height="114px"
            width="372px"
            alt=""
            className="img img-fluid"
          />
        </div>
        <div className="row p-2 mx-5 ml-5">
          <div className="col">
            <Link
              role="button"
              className="btn btn-sm btn-outline-light"
              to="/profiles"
            >
              Profiles
            </Link>
          </div>
          <div className="col">
            <Link
              role="button"
              className="btn btn-sm btn-outline-light"
              to="/login"
            >
              Login
            </Link>
          </div>
          <div className="col">
            <Link
              role="button"
              className="btn btn-sm btn-outline-light"
              to="/register"
            >
              Register
            </Link>
          </div>
        </div>
      </div>
      <div className="particles">
        <Particles
          params={{
            particles: {
              number: {
                value: 80,
              },
              size: {
                value: 2,
              },
            },
            interactivity: {
              events: {
                onhover: {
                  enable: true,
                  mode: "repulse",
                },
              },
            },
          }}
        />
      </div>
    </div>
  );
};

Landing.propTypes = {
  isAuthenticated: propTypes.bool,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps)(Landing);
