import React from "react";
import notFound from "./../../assets/images/error.svg";
function NotFound() {
  return (
    <div style={{height:"500px"}} className="d-flex align-items-center justify-content-center">
      <img className="img-fluid" src={notFound} alt="notFound" />
    </div>
  );
}

export default NotFound;
