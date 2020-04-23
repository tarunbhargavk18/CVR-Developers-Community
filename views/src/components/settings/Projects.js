import React, { Fragment } from "react";
import propTypes from "prop-types";
import { connect } from "react-redux";
import { deleteProject } from "../../actions/profile";

const Projects = ({ projects, deleteProject }) => {
  const project = projects.map((project) => (
    <tr key={project._id}>
      <td>{project.title}</td>
      <td>{project.techstack.join(",")}</td>
      <td>
        <button
          class="btn btn-danger"
          onClick={() => deleteProject(project._id)}
        >
          Delete
        </button>
      </td>
    </tr>
  ));

  return (
    <Fragment>
      <h2 className="my-3">Project Credentials</h2>
      <table className="table table-responsive">
        <thead className="thead-light">
          <tr>
            <th scope="col">Title</th>
            <th scope="col">Tech Stack</th>
            <th scopr="col"></th>
          </tr>
        </thead>
        <tbody>{project}</tbody>
      </table>
    </Fragment>
  );
};

Projects.propTypes = {
  projects: propTypes.array.isRequired,
  deleteProject: propTypes.func.isRequired,
};

export default connect(null, { deleteProject })(Projects);
