import React from "react";

function Input(props) {
  return (
    <>
      <label htmlFor={props.name}>{props.name} :</label>
      <input
        className="form-control mb-2"
        type={props.type}
        placeholder={`Enter Your ${props.name}`}
        id={props.name}
        {...props.formik.getFieldProps(props.name)}
      />
    </>
  );
}

export default Input;
