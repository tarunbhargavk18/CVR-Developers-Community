import React, {useState} from "react";

const Footer = () => {
  
  return (
    <div>
      <div id="main-footer" className="text-center p-1">
        <div className="container">
          <div className="row">
            <div className="col">
              <h5>CVR Developers Community</h5>
              <p>
                Copyright &copy; <span id="year"></span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;