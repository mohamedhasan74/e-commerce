import React from "react";

function ErrorAlter(props) {
  return (
    <>
      {props.formik.touched[`${props.name}`] &&
        props.formik.errors[`${props.name}`] && (
          <div className="alert alert-danger">
            {props.formik.errors[`${props.name}`]}
          </div>
        )}
    </>
  );
}

export default ErrorAlter;
