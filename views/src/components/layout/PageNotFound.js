import React from "react";
import image from "../../img/undraw_page_not_found_su7k.svg";

const PageNotFound = () => {
  return (
    <div className="container align-items-center justify-content-center">
      <div className="row align-items-center justify-content-center">
        <img
          src={image}
          height="500"
          width="500"
          alt=""
        />
      </div>
    </div>
  );
};

export default PageNotFound;
