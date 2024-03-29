import React, { useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import { createProfile } from "../../actions/profile";

const CreateProfile = ({createProfile, history}) => {
  const [formData, setFormData] = useState({
    branch: "",
    email: "",
    phone: "",
    skills: "",
    githubusername: "",
    bio: "",
    twitter: "",
    linkedin: "",
    hackerrank: "",
    codechef: "",
    codeforces: "",
    interviewBit: "",
  });

  const {
    branch,
    email,
    phone,
    skills,
    githubusername,
    bio,
    twitter,
    linkedin,
    hackerrank,
    codechef,
    codeforces,
    interviewBit,
  } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
      e.preventDefault();
      createProfile(formData, history );
  }

  return (
    <section className="container my-4 mt-5">
      <div className="card px-5 pt-2">
        <h1 className=" text-dark">Create Your Profile</h1>
        <div className="line"></div>
        <small>* - required field</small>
        <form className="form my-4" onSubmit={e => onSubmit(e)}>
          <div className="form-group">
            <select
              name="branch"
              className="form-control"
              value={branch}
              required
              onChange={(e) => onChange(e)}
            >
              <option value="0">* Select your Branch</option>
              <option value="IT">IT</option>
              <option value="CSE">CSE</option>
              <option value="ECE">ECE</option>
              <option value="MECH">MECH</option>
              <option value="EEE">EEE</option>
              <option value="CIVIL">CIVIL</option>
              <option value="CSIT">CSIT</option>
            </select>
          </div>
          <div className="form-group">
            <input
              type="text"
              placeholder="* Email"
              name="email"
              className="form-control"
              value={email}
              required
              onChange={(e) => onChange(e)}
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              placeholder="Phone Number"
              name="phone"
              className="form-control"
              value={phone}
              onChange={(e) => onChange(e)}
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              placeholder="* Skills"
              name="skills"
              className="form-control"
              value={skills}
              onChange={(e) => onChange(e)}
              required
            />
            <small className="form-text">
              Please use comma separated values (eg. HTML,CSS,JavaScript,C)
            </small>
          </div>
          <div className="form-group">
            <input
              type="text"
              placeholder="Github Username"
              name="githubusername"
              className="form-control"
              value={githubusername}
              onChange={(e) => onChange(e)}
            />
            <small className="form-text">
              If you want your public repos on your profile, include your
              username
            </small>
          </div>
          <div className="form-group">
            <textarea
              placeholder="A short bio"
              name="bio"
              className="form-control"
              value={bio}
              onChange={(e) => onChange(e)}
            ></textarea>
            <small className="form-text">Tell us a little about yourself</small>
          </div>

          <div className="my-4">
            <h4>Add Social Network Links</h4>
          </div>

          <div className="form-group social-input">
            <div className="row">
              <div className="col-1">
                <i className="fab fa-twitter fa-2x"></i>
              </div>
              <div className="col-11">
                <input
                  type="text"
                  placeholder="Twitter URL"
                  name="twitter"
                  className="form-control"
                  value={twitter}
                  onChange={(e) => onChange(e)}
                />
              </div>
            </div>
          </div>

          <div className="form-group social-input">
            <div className="row">
              <div className="col-1">
                <i className="fab fa-linkedin fa-2x"></i>
              </div>
              <div className="col-11">
                <input
                  type="text"
                  placeholder="Linkedin URL"
                  name="linkedin"
                  className="form-control"
                  value={linkedin}
                  onChange={(e) => onChange(e)}
                />
              </div>
            </div>
          </div>

          <div className="my-4">
            <h4>Add Coding Platform Profile Links</h4>
          </div>

          <div className="form-group coding-input">
            <input
              type="text"
              placeholder="Hackerrank URL"
              name="hackerrank"
              className="form-control"
              value={hackerrank}
              onChange={(e) => onChange(e)}
            />
          </div>

          <div className="form-group coding-input">
            <input
              type="text"
              placeholder="Codechef URL"
              name="codechef"
              className="form-control"
              value={codechef}
              onChange={(e) => onChange(e)}
            />
          </div>

          <div className="form-group coding-input">
            <input
              type="text"
              placeholder="Codeforces URL"
              name="codeforces"
              className="form-control"
              value={codeforces}
              onChange={(e) => onChange(e)}
            />
          </div>

          <div className="form-group coding-input">
            <input
              type="text"
              placeholder="Interview Bit URL"
              name="interviewBit"
              className="form-control"
              value={interviewBit}
              onChange={(e) => onChange(e)}
            />
          </div>
          <input type="submit" className="btn btn-primary   my-2 mr-3" />
          <Link className="btn btn-dark my-1" to="/settings">
            Go Back
          </Link>
        </form>
      </div>
    </section>
  );
};

CreateProfile.propTypes = {
    createProfile: PropTypes.func.isRequired,
};

export default connect(null, {createProfile})(withRouter(CreateProfile));
