import React from "react";
import { Link } from "react-router-dom";
import propTypes from "prop-types";

const ProfileProject = ({ project: { title, techstack, description } }) => {
  return (
    <div class="card project justify-content-center col-md-10 my-3 mx-2 ">
      <div class="card-body">
        <h5 className="card-title font-weight-bold">{title}</h5>
        {description && (
          <p className="card-text">
            <strong>Description: </strong>
            {description}
          </p>
        )}
        <p className="card-text">
          <strong>Tech Stack: </strong>
          {techstack.join(", ")}
        </p>
      </div>
    </div>
  );
};

ProfileProject.propTypes = {
  project: propTypes.object.isRequired,
};

export default ProfileProject;
