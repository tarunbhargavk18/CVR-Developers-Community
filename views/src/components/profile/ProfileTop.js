import React from "react";
import { Link } from "react-router-dom";
import propTypes from "prop-types";

const ProfileTop = ({
  profile: {
    branch,
    bio,
    social,
    githubusername,
    user: { name, rollNumber },
  },
}) => {
  return (
    <section id="profile-header" className="shadow-sm">
      <div className="container">
        <div className="row text-white name-area p-4">
          <div className="col-md-8">
            <h1 className="display-4">{name}</h1>
            <p className="lead">
              {rollNumber} <br />
              {branch !== "0" && `Department Of ${branch}`}
            </p>
          </div>
          {social && social.twitter && (
            <div className="col">
              <a
                href={social.twitter}
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="fab fa-2x fa-twitter social"> </i>
              </a>
            </div>
          )}
          {social && social.linkedin && (
            <div className="col">
              <a
                href={social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="fab fa-2x fa-linkedin social"> </i>
              </a>
            </div>
          )}
          {githubusername !== "" && (
            <div className="col">
              <a
                href={`https://github.com/${githubusername}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="fab fa-2x fa-github social"> </i>
              </a>
            </div>
          )}
        </div>
        {bio && bio !== "" && (
          <div className="row p-3 bg-black text-center justify-content-center">
            <p className=" font-italic text-center">{bio}</p>
          </div>
        )}
      </div>
    </section>
  );
};

ProfileTop.propTypes = {
  profile: propTypes.object.isRequired,
};

export default ProfileTop;
