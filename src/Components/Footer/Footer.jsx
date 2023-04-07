import React from "react";
function Footer() {
  return (
    <div className=" bg-main-light py-3 mt-2">
      <div className="container">
        <h3>Get The FreshCart App</h3>
        <p className="text-muted">
          We Will Send You a Link, open it on your phone to download the app
        </p>
        <div className="row align-items-center">
          <div className="col-md-10">
            <input className="form-control" type="text" placeholder="Email" />
          </div>
          <div className="col-md-2">
            <button className="btn btn-sm bg-main text-white">
              Share App Link
            </button>
          </div>
          <div className="d-flex align-items-center justify-content-between py-3  flex-md-nowrap flex-wrap gap-2">
            <div className="d-flex align-items-center gap-2">
              <p className="mb-0">Payment Partners</p>
              <i className="fab fa-cc-amazon-pay fa-2x"></i>
              <i className="fab fa-cc-paypal fa-2x text-primary"></i>
              <i className="fab fa-cc-stripe fa-2x strip-icon"></i>
            </div>
            <div className="d-flex align-items-center gap-2">
              <p className="mb-0">Get Deliveries With FreshCart</p>
              <i className="fab fa-google-play fa-2x"></i>
              <i className="fab fa-apple fa-2x"></i>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
