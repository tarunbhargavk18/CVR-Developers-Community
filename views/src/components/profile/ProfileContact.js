import React, {Fragment} from "react";
import { Link } from "react-router-dom";
import propTypes from "prop-types";

const ProfileContact = ({ profile: { email, phone } }) => {
  return (
    <section id="contact" className="bg-light p-3 shadow-sm" style={{height:"100%"}}>
      <div class="container">
        <div class="row">
          <h2 class="text-success">Contact</h2>
        </div>
        <div class="line"></div>
        <div class="row justify-content-center p-3">
          <p className="d-block">
            <i class="fas fa-envelope fa-2x"></i>
            <span className="lead"> : {email}</span>
            <br/>
            <br/>
            {phone && (<Fragment><i class="fas fa-phone fa-2x"></i>
            <span className="lead"> : {phone}</span></Fragment>)}
          </p>
        </div>
      </div>
    </section>
  );
};

ProfileContact.propTypes = {
  profile: propTypes.object.isRequired,
};

export default ProfileContact;
