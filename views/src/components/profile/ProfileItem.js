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
    <div className="row profile m-3">
      <div className="card" style={{width: "100%"}}>
        <div className="card-header">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col">
              <i className="far fa-5x fa-id-badge profile-avatar"></i>
              </div>
              <div className="col">
                <div className="row justify-content-center">
                  <h4>{name}</h4>
                </div>
                <div className="row justify-content-center">
                  <p>{rollNumber}</p>
                </div>
                <div className="row small justify-content-center">
                  <p>Department Of {branch}</p>
                </div>
              </div>
              <div className="col">
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
        <div className="card-body">
          <div className="row justify-content-center">
            <Link to={`/profile/${_id}`} className="btn btn-outline-primary">
              View
            </Link>
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
