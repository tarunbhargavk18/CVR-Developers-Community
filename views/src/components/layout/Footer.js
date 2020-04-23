import React from "react";

const Footer = () => {
  
  return (
    <footer id="main-footer" className="text-center p-2  bg-light">
        <div className="container">
          <div className="row">
            <div className="col">
              <h5>CVR Developers Community</h5>
              <p>
                Copyright &copy;<span id="year"></span>
              </p>
            </div>
          </div>
        </div>
    </footer>
  );
};

export default Footer;