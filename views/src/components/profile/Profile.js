import React, { Fragment, useEffect } from "react";
import propTypes from "prop-types";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import LoadingSpinner from "../layout/LoadingSpinner";
import { getProfileById } from "../../actions/profile";
import ProfileTop from "./ProfileTop";
import ProfileSkills from "./ProfileSkills";
import ProfileProject from "./ProfileProject";
import ProfileGithub from "./ProfileGithub";
import ProfileContact from "./ProfileContact";
import CodingProfiles from "./CodingProfiles"

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
            <Link to="/profiles" className="btn btn-sm btn-dark my-4">
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

            <div className="row my-4">
              <div className="col-md mb-1">
                <ProfileSkills profile={profile} />
              </div>
              <div className="col-md mb-1">
                <ProfileContact profile={profile} />
              </div>
            </div>

            <section id="projects" className="shadow-sm bg-white p-3 my-4">
              <div className="container">
                <div className="row justify-content-center h2 text-dark">
                <i class="fas fa-tasks mr-2"></i>
                  Projects
                </div>
                <div className="row justify-centent-center">
                  {profile.projects.length > 0 ? (
                    <Fragment>
                      {profile.projects.map((project) => (
                        <ProfileProject key={project._id} project={project} />
                      ))}
                    </Fragment>
                  ) : (
                    <h4>No Projects</h4>
                  )}
                </div>
              </div>
            </section>

            {profile.codingprofiles && (
              <CodingProfiles profile={profile} />
            )}

            {profile.githubusername && (
              <ProfileGithub username={profile.githubusername} />
            )}

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
