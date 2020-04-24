import React, { Fragment, useEffect } from "react";
import propTypes from "prop-types";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import LoadingSpinner from "../layout/LoadingSpinner";
import { getProfileById } from "../../actions/profile";
import ProfileTop from "./ProfileTop";
import ProfileSkills from "./ProfileSkills";
import ProfileProject from "./ProfileProject";

const Profile = ({
  getProfileById,
  profile: { profile, loading },
  auth,
  match,
}) => {
  useEffect(() => {
    getProfileById(match.params.id);
  }, [getProfileById]);
  return (
    <Fragment>
      {profile === null || loading ? (
        <LoadingSpinner />
      ) : (
        <Fragment>
          <div class="container">
            <Link to="/profiles" className="btn btn-sm btn-dark my-3">
              Back To Profiles
            </Link>
            {auth.isAuthenticated &&
              auth.loading === false &&
              auth.user._id === profile.user._id && (
                <Link to="/editProfile" className="btn btn-sm ml-2 btn-success">
                  Edit Profile
                </Link>
              )}

            <ProfileTop profile={profile} />
            <ProfileSkills profile={profile} />
            <section id="projects" className="shadow bg-white p-3 my-3">
              <div class="container">
                <div class="row justify-content-center">
                  <h2 class="text-primary">Projects</h2>
                </div>
                <div class="line"></div>
                {profile.projects.length > 0 ? (
                  <Fragment>
                      <div className="row">
                    {profile.projects.map((project) => (
                      <ProfileProject key={project._id} project={project} />
                    ))}
                    </div>
                  </Fragment>
                ) : (
                  <h4>No Projects</h4>
                )}
              </div>
            </section>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

Profile.propTypes = {
  getProfileById: propTypes.func.isRequired,
  profile: propTypes.object.isRequired,
  auth: propTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  profile: state.profile,
  auth: state.auth, //To check if the user is logged in
});

export default connect(mapStateToProps, { getProfileById })(Profile);
