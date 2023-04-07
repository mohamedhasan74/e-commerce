import React from "react";
import "./Loading.css";
function Loading() {
  return (
    // <div className="vh-100 d-flex align-items-center justify-content-center">
    //   <div className="loader"></div>
    // </div>
    <div className=" bg-black bg-opacity-50 co position-fixed top-0 bottom-0 end-0 start-0 d-flex align-items-center justify-content-center">
      <div className="loader"></div>
    </div>
  );
}

export default Loading;
