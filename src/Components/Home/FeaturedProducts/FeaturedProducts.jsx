import React, { useEffect } from "react";
import useGetAxios from "../../Hooks/Axios/useGetAxios.js";
import { Link } from "react-router-dom";
import Loading from "../../Loading/Loading.jsx";
import { useDispatch, useSelector } from "react-redux";
import { addProductToCart } from "../../../ReduxToolKit/cartReducer.js";
import { toast } from "react-toastify";

function FeaturedProducts(props) {
  const token = useSelector((state) => state.token.userToken);
  const status = useSelector((state) => state.cart.status);
  const dispatch = useDispatch();
  const { isLoading, data, error } = useGetAxios(`api/v1/products`);
  let products = data?.data?.map((product) => (
    <div key={product._id} className="col-lg-2 col-md-4 product py-2">
      <Link className="cursor-pointer" to={`/products/${product._id}`}>
        <div>
          <img className="w-100" src={product.imageCover} alt="product" />
          <p className=" mt-2 mb-0 text-main fw-semibold">
            {product.category.name}
          </p>
          <p className="mt-0 font-sm">
            {product.title.split(" ").slice(0, 2).join(" ")}
          </p>
          <div className="d-flex justify-content-between align-items-center">
            <p>{product.price} EGP</p>
            <p>
              {product.ratingsAverage}{" "}
              <i className="fas fa-star rating-color"></i>
            </p>
          </div>
        </div>
      </Link>
      <button
        onClick={() => {
          dispatch(addProductToCart({ token, productId: product._id }));
        }}
        className="btn bg-main text-white w-100"
      >
        + add to cart
      </button>
    </div>
  ));
  if (props.slice === true) {
    products = products?.slice(0, 20);
  }
  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <div className="py-5">
          {props.title && <h3 className="mb-3">Featured Products</h3>}
          <div className="row gy-3">{products}</div>
        </div>
      )}
    </>
  );
}

export default FeaturedProducts;
