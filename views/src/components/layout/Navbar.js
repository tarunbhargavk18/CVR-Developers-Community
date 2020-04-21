import React, {Fragment} from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import propTypes from "prop-types";
import { logout } from "../../actions/auth";

export const Navbar = ({ auth: { isAuthenticated, loading }, logout }) => {
  const authLinks = (
    <ul className="navbar-nav ml-auto">
      <li className="nav-item">
        <Link to='/settings' className="nav-link">
          Settings
        </Link>
      </li>
      <li className="nav-item">
        <a onClick={logout} className="nav-link" href="#!">
          Logout
        </a>
      </li>
    </ul>
  );

  const publicLinks = (
    <ul className="navbar-nav ml-auto">
      <li className="nav-item">
        <a className="nav-link" href="#!">
          Profiles
        </a>
      </li>
      <li className="nav-item">
        <Link className="nav-link" to="/register">
          Register
        </Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link" to="/login">
          Login
        </Link>
      </li>
    </ul>
  );

  return (
    <div>
      <nav className="navbar navbar-expand-sm navbar-light bg-light">
        <div className="container">
          <Link className="navbar-brand" to="/">
            <img
              src="img/mp-logo.png"
              width="165"
              height="54"
              alt=""
              srcset=""
            />
          </Link>
          <button
            className="navbar-toggler"
            data-toggle="collapse"
            data-target="#navbarNav"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            {!loading && <Fragment>{isAuthenticated ? authLinks : publicLinks}</Fragment>}
          </div>
        </div>
      </nav>
    </div>
  );
};

Navbar.propTypes = {
  logout: propTypes.func.isRequired,
  auth: propTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});
export default connect(mapStateToProps, { logout })(Navbar);
