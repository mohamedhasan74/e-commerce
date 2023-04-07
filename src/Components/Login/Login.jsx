import axios from "axios";
import { useFormik } from "formik";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { baseApi } from "./../../App.js";
import { initialValues, validationSchema } from "./LoginLogic.js";
import Input from "../Register/Input.jsx";
import ErrorAlter from "../Register/ErrorAlter.jsx";
import { useDispatch } from "react-redux";
import { saveToken } from "../../ReduxToolKit/tokenReducer.js";
function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [msgError, setMsgError] = useState("");
  const handleTask = (values) => {
    setMsgError("");
    setIsLoading(true);
    axios
      .post(`${baseApi}api/v1/auth/signin`, values)
      .then((response) => {
        dispatch(saveToken(response.data.token));
        setIsLoading(false);
        navigate("/");
      })
      .catch((error) => {
        setMsgError(error.response.data.message);
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
        <h3>Login Now :</h3>
        {msgError && <div className="alert alert-danger">{msgError}</div>}
        <form onSubmit={formik.handleSubmit}>
          <Input formik={formik} name="email" type="email" />
          <ErrorAlter formik={formik} name="email" />
          <Input formik={formik} name="password" type="password" />
          <ErrorAlter formik={formik} name="password" />
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
              Login
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

export default Login;
