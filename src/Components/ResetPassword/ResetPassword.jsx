import axios from "axios";
import { useFormik } from "formik";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { baseApi } from "./../../App.js";
import Input from "../Register/Input.jsx";
import ErrorAlter from "../Register/ErrorAlter.jsx";
import * as Yup from "yup";

function ResetPassword() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [msgError, setMsgError] = useState("");
  const handleTask = (values) => {
    setMsgError("");
    setIsLoading(true);
    axios
      .put(`${baseApi}api/v1/auth/resetPassword`, values)
      .then((response) => {
        setIsLoading(false);
        navigate("/login");
      })
      .catch((error) => {
        setMsgError(error.response.data.message);
        setIsLoading(false);
      });
  };
  const formik = useFormik({
    initialValues: {
      email: "",
      newPassword: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .required("Email Is Required")
        .email("Invalid Email Address"),
      newPassword: Yup.string()
        .required("Password Is Required")
        .matches(
          /^[A-Z][a-z0-9]{5,9}$/,
          "Must Start With Capital Char And More Than 6 Chars"
        ),
    }),
    onSubmit: handleTask,
  });
  return (
    <>
      <div className="w-75 mx-auto py-5">
        <h3>NewPassword Now :</h3>
        <form onSubmit={formik.handleSubmit}>
          <Input formik={formik} name="email" type="email" />
          <ErrorAlter formik={formik} name="email" />
          <Input formik={formik} name="newPassword" type="password" />
          <ErrorAlter formik={formik} name="newPassword" />
          {msgError && <div className="alert alert-danger">{msgError}</div>}
          {isLoading ? (
            <button className="btn bg-main text-white me-2">
              <i className="fa-solid fa-spinner fa-spin"></i>
            </button>
          ) : (
            <button
              disabled={!(formik.isValid && formik.dirty)}
              type="submit"
              className="btn bg-main text-white"
            >
              Submit
            </button>
          )}
          <Link className="nav-link text-main my-2" to={"/forgetpassword"}>
            Forget Password ?
          </Link>
        </form>
      </div>
    </>
  );
}

export default ResetPassword;
