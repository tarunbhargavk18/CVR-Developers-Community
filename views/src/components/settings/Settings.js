import React, { useEffect, Fragment } from "react";
import {Link} from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getCurrentProfile } from "../../actions/profile";
import LoadingSpinner from "../layout/LoadingSpinner";

const Settings = ({
  getCurrentProfile,
  auth: { user },
  profile: { profile, loading },
}) => {
  useEffect(() => {
    getCurrentProfile();
  }, []);

  return loading && profile === null ? (
    <LoadingSpinner />
  ) : (
    <Fragment>
      <header class="bg-dark p-2 mb-5">
        <p class="display-4 text-light text-center lead">Settings</p>
      </header>
      <section class="container">
        <p class="lead m-3">
          <i class="fas fa-user"></i> Welcome {user && user.name}
        </p>
        {profile !== null ? (
          <Fragment>has</Fragment>
        ) : (
          <Fragment>
            <p>You do not have a profile yet, please create one!</p>
            <Link to="/createProfile" className="btn btn-sm btn-dark">
              Create Profile
            </Link>
          </Fragment>
        )}
      </section>
    </Fragment>
  );
};

Settings.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  profile: state.profile,
});

export default connect(mapStateToProps, { getCurrentProfile })(Settings);
