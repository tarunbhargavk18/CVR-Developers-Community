import React from "react";
import propTypes from "prop-types";

const CodingProfiles = ({ profile: { codingprofiles } }) => {
  return (
    <section
      id="codingprofiles"
      className="container bg-light p-3 my-4 shadow-sm"
    >
      <div class="row justify-content-center text-dark h2">
        <i class="fas fa-code mr-2"></i>
        Competitive Coding Profiles
      </div>
      <div className="row justify-content-center">
        {codingprofiles.hackerrank && (
            <a
              href={codingprofiles.hackerrank}
              target="_blank"
              rel="noopener noreferrer"
              className="lead m-4"
            >
              HackerRank
            </a>
        )}
        {codingprofiles.codeforces && (
            <a
              href={codingprofiles.codeforces}
              target="_blank"
              rel="noopener noreferrer"
              className="lead m-4"
            >
              Codeforces
            </a>
        )}
        {codingprofiles.codechef && (
            <a
              href={codingprofiles.hackerrank}
              target="_blank"
              rel="noopener noreferrer"
              className="lead m-4"
            >
              CodeChef
            </a>
        )}
        {codingprofiles.interviewBit && (
            <a
              href={codingprofiles.interviewBit}
              target="_blank"
              rel="noopener noreferrer"
              className="lead m-4"
            >
              InterviewBit
            </a>
        )}
      </div>
    </section>
  );
};

CodingProfiles.propTypes = {
  profile: propTypes.object.isRequired,
};

export default CodingProfiles;
