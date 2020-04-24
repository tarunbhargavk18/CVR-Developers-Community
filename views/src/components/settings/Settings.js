import React, { useEffect, Fragment } from "react";
import { Link } from "react-router-dom";
import propTypes from "prop-types";
import { connect } from "react-redux";
import { getCurrentProfile, deleteAccount } from "../../actions/profile";
import LoadingSpinner from "../layout/LoadingSpinner";
import SettingsActions from "./SettingsActions";
import Projects from "./Projects";

const Settings = ({
  getCurrentProfile,
  auth: { user },
  profile: { profile, loading },
  deleteAccount
}) => {
  useEffect(() => {
    getCurrentProfile();
  }, [getCurrentProfile]);

  return loading && profile === null ? (
    <LoadingSpinner />
  ) : (
    <Fragment>
      <header class="bg-dark p-1 my-4">
        <p class="display-4 text-light text-center lead">SETTINGS</p>
      </header>
      <section class="container">
        <p class="lead m-3">
          <i class="fas fa-user"></i> Welcome {user && user.name}
        </p>
        {profile !== null ? (
          <Fragment>
            <SettingsActions />
            <Projects projects={profile.projects} />
            <div class="my-2">
              <button className="btn btn-danger" onClick={()=> deleteAccount()}>
                <i className="fas fa-user-minus mr-1"></i>
                Delete My Account
              </button>
            </div> 
          </Fragment>
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
  getCurrentProfile: propTypes.func.isRequired,
  auth: propTypes.object.isRequired,
  profile: propTypes.object.isRequired,
  deleteAccount: propTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  profile: state.profile,
});

export default connect(mapStateToProps, { getCurrentProfile, deleteAccount })(Settings);
