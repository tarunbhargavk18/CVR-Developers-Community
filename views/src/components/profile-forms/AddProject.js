import React, { useState } from "react";
import { Link, withRouter } from "react-router-dom";
import propTypes from "prop-types";
import { connect } from "react-redux";
import { addProject } from "../../actions/profile";

const AddProject = ({ addProject, history }) => {
  const [formData, setFormData] = useState({
    title: "",
    techstack: "",
    description: "",
  });

  const { title, techstack, description } = formData;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    addProject(formData, history);
  };

  return (
    <section className="container my-4">
      <div className="card px-5 pt-2">
        <h1 className="large text-dark">Add a Project</h1>
        <div className="line"></div>
        <small>* - required field</small>
        <form className="form my-3" onSubmit={(e) => onSubmit(e)}>
          <div className="form-group">
            <input
              type="text"
              placeholder="* Project Title"
              name="title"
              className="form-control"
              required
              value={title}
              onChange={(e) => onChange(e)}
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              placeholder="Tech Stack"
              name="techstack"
              className="form-control"
              required
              value={techstack}
              onChange={(e) => onChange(e)}
            />
            <small className="form-text">
              Please use comma separated values (eg. HTML,CSS,JavaScript,Python)
            </small>
          </div>
          <div className="form-group">
            <textarea
              name="description"
              cols="30"
              rows="10"
              placeholder="Project Description"
              className="form-control"
              value={description}
              onChange={(e) => onChange(e)}
            ></textarea>
          </div>
          <input type="submit" className="btn btn-primary my-1" />
          <Link className="btn btn-light ml-2 my-1" to="/settings">
            Go Back
          </Link>
        </form>
      </div>
    </section>
  );
};

AddProject.propTypes = {
  addProject: propTypes.func.isRequired,
};

export default connect(null, { addProject })(withRouter(AddProject));
