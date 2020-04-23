import React, { Fragment } from "react";
import propTypes from "prop-types";
import { connect } from "react-redux";

const Projects = ({ projects }) => {
  const project = projects.map((project) => (
    <tr key={project._id}>
      <td>{project.title}</td>
      <td>{project.techstack.join(",")}</td>
      <td>
        <button class="btn btn-danger">Delete</button>
      </td>
    </tr>
  ));

  return (
    <Fragment>
      <h2 className="my-3">Project Credentials</h2>
      <table className="table table-responsive">
        <thead className="thead-light" >
            <tr>
            <th scope="col">Title</th>
            <th scope="col">Tech Stack</th>
            <th scopr="col"></th>
            </tr>
        </thead>
        <tbody>{project}</tbody>
      </table>

      <div class="my-2">
        <button className="btn btn-danger">
          <i className="fas fa-user-minus mr-1"></i>
          Delete My Account
        </button>
      </div>
    </Fragment>
  );
};

Projects.propTypes = {
    projects: propTypes.array.isRequired,
};

export default Projects;
