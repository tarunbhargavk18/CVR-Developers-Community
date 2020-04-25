import React from "react";
import { Link } from "react-router-dom";
import propTypes from "prop-types";

const ProfileItem = ({
  profile: {
    user: { _id, name, rollNumber },
    branch,
    skills,
  },
}) => {
  return (
    <div className="row shadow-sm profile m-3">
      <div className="card" style={{ width: "100%", height: "100%" }}>
        <div className="card-body container">
          <div className="row justify-content-center">
            <div className="col-8">
              <div className="row justify-content-center">
                <Link to={`/profile/${_id}`} className=" ">
                  <h4>{name}</h4>
                </Link>
              </div>
              <div className="row justify-content-center">
                <p className="text-center">
                  {rollNumber}
                  <br />
                  {branch !== "0" && `Department Of ${branch}`}
                </p>
              </div>
            </div>
            <div className="col-4">
              <ul>
                {skills.slice(0, 4).map((skill, index) => (
                  <li className="text-primary" key={index}>
                    <i className={`fas fa-check-circle`}></i> {skill}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

ProfileItem.propTypes = {
  profile: propTypes.object.isRequired,
};

export default ProfileItem;
