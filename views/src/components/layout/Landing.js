import React from "react";
import { Link } from "react-router-dom";
import Particles from "react-particles-js";

const styles = {
  root: {
    fontFamily: "sans-serif",
    textAlign: "center",
    height: "80%",
    width: "100%",
    backgroundImage: "linear-gradient(to right, #314755,#26a0da)"
  },
};

export const Landing = () => {
  return (
    <div style={styles.root}>
        <div className="container">
          <div id="content">
            <div className="row">
              <img
                src="img/mp-logo-white.png"
                height="114px"
                width="372px"
                alt=""
                srcset=""
              />
            </div>
            <div className="row p-2 mx-5 ml-5">
              <div className="col">
                <a
                  role="button"
                  className="btn btn-sm btn-outline-light"
                  href="#"
                >
                  Profiles
                </a>
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
        </div>
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
  );
};

export default Landing;
