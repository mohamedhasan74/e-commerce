import axios from "axios";
import { useFormik } from "formik";
import React, { useState } from "react";
import { baseApi } from "../../App.js";
import Input from "../Register/Input.jsx";
import ErrorAlter from "../Register/ErrorAlter.jsx";
import { useSelector } from "react-redux";
import * as Yup from "yup";
function CheckOut() {
  const [isLoading, setIsLoading] = useState(false);
  const [msgError, setMsgError] = useState("");
  const cartId = useSelector((state) => state.cart.cartId);
  const token = useSelector((state) => state.token.userToken);
  const handleTask = (values) => {
    console.log(token, "        ", cartId);
    setMsgError("");
    setIsLoading(true);
    axios
      .post(
        `${baseApi}api/v1/orders/checkout-session/${cartId}?url=http://localhost:3000`,
        {
          shippingAddress: values,
        },
        { headers: { token } }
      )
      .then((response) => {
        if (response.data.status === "success") {
          window.location.href = response.data.session.url;
        }
      })
      .catch((error) => {
        setMsgError(error.response.data.message);
        setIsLoading(false);
      });
  };
  const formik = useFormik({
    initialValues: {
      details: "",
      phone: "",
      city: "",
    },
    validationSchema: Yup.object({
      details: Yup.string().required("Email Is Required"),
      phone: Yup.string()
        .required("Phone Is Required")
        .matches(/^01[0125][0-9]{8}$/, "Invalid Eg Number"),
      city: Yup.string().required("City Is Required"),
    }),
    onSubmit: handleTask,
  });
  return (
    <>
      <div className="w-75 mx-auto py-5">
        <h3>CheckOut Now :</h3>
        {msgError && <div className="alert alert-danger">{msgError}</div>}
        <form onSubmit={formik.handleSubmit}>
          <Input formik={formik} name="details" type="text" />
          <ErrorAlter formik={formik} name="details" />
          <Input formik={formik} name="phone" type="tel" />
          <ErrorAlter formik={formik} name="phone" />
          <Input formik={formik} name="city" type="text" />
          <ErrorAlter formik={formik} name="city" />
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
              Pay
            </button>
          )}
        </form>
      </div>
    </>
  );
}

export default CheckOut;
