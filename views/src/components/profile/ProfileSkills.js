import React from "react";
import propTypes from "prop-types";

const ProfileSkills = ({ profile: { skills } }) => {
  return (
    <section
      id="skills"
      className="bg-light p-3 shadow-sm"
      style={{ height: "100%" }}
    >
      <div class="container">
        <div class="row h2 justify-content-center text-dark">
        <i class="far fa-star mr-2"></i>
          Skills
        </div>
        <div class="row justify-content-center p-3">
          {skills.map((skill, index) => (
            <div key={index} className="p-1 lead">
              <i class="fa fa-check p-1"></i> {skill}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

ProfileSkills.propTypes = {
  profile: propTypes.object.isRequired,
};

export default ProfileSkills;
