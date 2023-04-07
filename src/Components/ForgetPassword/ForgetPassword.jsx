import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { baseApi } from "../../App.js";
import { useFormik } from "formik";
import Input from "../Register/Input.jsx";
import ErrorAlter from "../Register/ErrorAlter.jsx";
import * as Yup from "yup";
function ForgetPassword() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [msgError, setMsgError] = useState("");
  const handleTask = (values) => {
    setMsgError("");
    setIsLoading(true);
    axios
      .post(`${baseApi}api/v1/auth/forgotPasswords`, values)
      .then((response) => {
        setIsLoading(false);
        navigate("/verifyresetcode");
      })
      .catch((error) => {
        setMsgError(error.response.data.message);
        setIsLoading(false);
      });
  };
  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .required("Email Is Required")
        .email("Enail Is Invalid"),
    }),
    onSubmit: handleTask,
  });
  return (
    <>
      <div className="w-75 mx-auto py-5">
        <h3>Email :</h3>
        <form onSubmit={formik.handleSubmit}>
          <Input formik={formik} name="email" type="email" />
          <ErrorAlter formik={formik} name="email" />
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
              Verify Reset Code
            </button>
          )}
        </form>
      </div>
    </>
  );
}

export default ForgetPassword;
