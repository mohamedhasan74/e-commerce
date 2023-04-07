import React from "react";
import useGetAxios from "../Hooks/Axios/useGetAxios.js";
import Loading from "../Loading/Loading.jsx";

function Brands() {
  const { isLoading, data, error } = useGetAxios("api/v1/brands");
  const allBrands = data?.data?.map((brand) => (
    <div key={brand._id} className="col-md-3">
      <img className="w-100" src={brand.image} alt="brand" />
    </div>
  ));

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <div className="row gy-3 py-3">{allBrands}</div>
      )}
    </>
  );
}

export default Brands;
