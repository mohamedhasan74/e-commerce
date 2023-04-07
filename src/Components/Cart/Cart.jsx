import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  clearPrpducts,
  getProducts,
  removePrpduct,
  updateProductQuantity,
} from "../../ReduxToolKit/cartReducer.js";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

function Cart() {
  const token = useSelector((state) => state.token.userToken);
  const { numOfCartItems, totalCartPrice, products } = useSelector(
    (state) => state.cart
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProducts(token));
  }, []);
  const allProducts = products?.map((product, i) => (
    <div
      key={i}
      className="row fw-bolder mx-0 align-items-center py-3 border-top"
    >
      <div className="col-md-2">
        <img className="w-100" src={product.product.imageCover} alt="product" />
      </div>
      <div className="col-md-10 text-center text-md-start">
        <div className="d-flex justify-content-between align-items-center">
          <p className="my-3">{product.product.title}</p>
          <p>
            Count : <span className="text-main">{product.count}</span>
          </p>
        </div>
        <div className="d-flex justify-content-between align-items-center">
          <p className="text-main mb-1">{product.price} EGY</p>
          <p>
            {product.product.ratingsAverage}{" "}
            <i className="fas fa-star rating-color"></i>
          </p>
        </div>
        <button
          onClick={() => {
            dispatch(removePrpduct({ token, productId: product.product._id }));
          }}
          className="btn btn-sm"
        >
          <i className="fas fa-trash text-danger me-2"></i>Remove Item
        </button>
        <div className="d-flex align-items-center justify-content-center">
          <button
            onClick={() =>
              dispatch(
                updateProductQuantity({
                  token,
                  count: product.count + 1,
                  productId: product.product._id,
                })
              )
            }
            className="btn btn-sm text-white bg-main"
          >
            +
          </button>
          <p className="mx-3 mb-0 text-main">{product.count}</p>
          <button
            onClick={() => {
              if (product.count === 1) {
                toast.error(
                  "Can't reduce that The Min Count Is 1 So Remove It",
                  {
                    position: "bottom-right",
                    autoClose: 1000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: false,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                  }
                );
              } else {
                dispatch(
                  updateProductQuantity({
                    token,
                    count: product.count - 1,
                    productId: product.product._id,
                  })
                );
              }
            }}
            className="btn btn-sm text-white bg-main"
          >
            -
          </button>
        </div>
      </div>
    </div>
  ));
  return (
    <>
      <div className="bg-main-light p-3">
        <div className="d-flex align-items-center justify-content-between">
          <h3>Shop Cart : </h3>
          <button
            onClick={() => {
              dispatch(clearPrpducts(token));
            }}
            className="btn btn-sm fw-bolder"
          >
            <i className="fas fa-trash text-danger me-2"></i>Clear Cart
          </button>
        </div>
        <div className=" pt-3 d-flex align-items-center justify-content-between">
          <p className="fw-bolder">
            Total Price :
            <span className="text-main"> {totalCartPrice} EGP</span>
          </p>
          <p className="fw-bolder">
            number Of Cart Items :
            <span className="text-main"> {numOfCartItems}</span>
          </p>
        </div>
        {allProducts?.length > 0 && (
          <>
            {allProducts}
            <Link to="/checkout">
              <button className="btn btn-sm bg-main my-2 text-white">
                CheckOut <i className=" ms-2 fas fa-money-check-dollar"></i>
              </button>
            </Link>
          </>
        )}
      </div>
    </>
  );
}

export default Cart;
