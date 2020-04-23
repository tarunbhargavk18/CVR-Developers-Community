import React, { Fragment, useEffect } from "react";
import propTypes from "prop-types";
import LoadingSpinner from "../layout/LoadingSpinner";
import { connect } from "react-redux";
import { getProfiles } from "../../actions/profile";
import ProfileItem from "./ProfileItem";

const Profiles = ({ getProfiles, profile: { profiles, loading } }) => {
  useEffect(() => {
    getProfiles();
  }, []);
  return (
    <Fragment>
      {loading ? (
        <LoadingSpinner/>
      ) : (
        <Fragment>
          <header className="bg-dark p-2 mb-5">
            <p className="display-4 text-light text-center font-weight-bold">
              Profiles
            </p>
          </header>
          <section className="profiles">
            <div className="container">
              {profiles.length > 0 ? (
                profiles.map((profile) => (
                  <ProfileItem key={profile._id} profile={profile} />
                ))
              ) : (
                <h4>No Profiles Found</h4>
              )}
            </div>
          </section>
        </Fragment>
      )}
    </Fragment>
  );
};

Profiles.propTypes = {
  getProfiles: propTypes.func.isRequired,
  profile: propTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  profile: state.profile,
});

export default connect(mapStateToProps, { getProfiles })(Profiles);
