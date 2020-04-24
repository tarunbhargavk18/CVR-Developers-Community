import React, { useEffect } from "react";
import propTypes from "prop-types";
import { connect } from "react-redux";
import LoadingSpinner from "../layout/LoadingSpinner";
import { getGithubRepos } from "../../actions/profile";

const ProfileGithub = ({ username, getGithubRepos, repos }) => {
  useEffect(() => {
    getGithubRepos(username);
  }, [getGithubRepos]);
  return (
    <section id="github" className="bg-light shadow-sm p-3 my-3">
      <div class="container">
        <div class="row justify-content-center">
          <h2 class="text-danger">Github Repositories</h2>
        </div>
        <div class="line"></div>
        <div class="row p-3">
          {repos === null ? (
            <LoadingSpinner />
          ) : (
            repos.map((repo) => (
              <div
                key={repo._id}
                class="repo col-5 bg-white p-1 m-2"
              >
                <div>
                  <h4>
                    <a
                      href={repo.html_url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {repo.name}
                    </a>
                  </h4>
                  <p>{repo.description}</p>
                </div>
                <div>
                  <ul>
                    <li class="badge badge-primary m-1">
                      Stars: {repo.stargazers_count}
                    </li>
                    <li class="badge badge-dark m-1">
                      Watchers: {repo.watchers_count}
                    </li>
                    <li class="badge badge-light m-1">Forks: {repo.forks_count}</li>
                  </ul>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
};

ProfileGithub.propTypes = {
  getGithubRepos: propTypes.func.isRequired,
  username: propTypes.string.isRequired,
  repos: propTypes.array.isRequired,
};

const mapStateToProps = (state) => ({
  repos: state.profile.repos,
});
export default connect(mapStateToProps, { getGithubRepos })(ProfileGithub);
