import React from "react";
import { useDispatch } from "react-redux";
import { Navigate } from "react-router-dom";
import { saveToken } from "../../ReduxToolKit/tokenReducer.js";

function ProdectedRoute(props) {
  const dispatch = useDispatch();
  if (localStorage.getItem("userToken")) {
    dispatch(saveToken(localStorage.getItem("userToken")));
    return props.children;
  } else {
    return <Navigate to={"/login"} />;
  }
}

export default ProdectedRoute;
