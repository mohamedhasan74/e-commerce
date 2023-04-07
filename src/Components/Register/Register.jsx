import axios from "axios";
import { useFormik } from "formik";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { baseApi } from "./../../App.js";
import { initialValues, validationSchema } from "./RegisterLogic.js";
import ErrorAlter from "./ErrorAlter.jsx";
import Input from "./Input.jsx";

function Register() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [msgError, setMsgError] = useState("");
  const handleTask = (values) => {
    setMsgError("");
    setIsLoading(true);
    axios
      .post(`${baseApi}api/v1/auth/signup`, values)
      .then((response) => {
        setIsLoading(false);
        navigate("/login");
      })
      .catch((error) => {
        setMsgError(error.response.data.errors.msg, error);
        setIsLoading(false);
      });
  };
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: handleTask,
  });
  return (
    <>
      <div className="w-75 mx-auto py-5">
        <h3>Register Now :</h3>
        <form onSubmit={formik.handleSubmit}>
          <Input formik={formik} name="name" type="text" />
          <ErrorAlter formik={formik} name="name" />
          <Input formik={formik} name="email" type="email" />
          <ErrorAlter formik={formik} name="email" />
          {msgError && <div className="alert alert-danger">{msgError}</div>}
          <Input formik={formik} name="password" type="password" />
          <ErrorAlter formik={formik} name="password" />
          <Input formik={formik} name="rePassword" type="password" />
          <ErrorAlter formik={formik} name="rePassword" />
          <Input formik={formik} name="phone" type="tel" />
          <ErrorAlter formik={formik} name="phone" />
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
              Register
            </button>
          )}
        </form>
      </div>
    </>
  );
}

export default Register;
