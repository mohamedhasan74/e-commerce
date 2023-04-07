import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../../ReduxToolKit/cartReducer.js";
import useGetAxios from "../Hooks/Axios/useGetAxios.js";
import Loading from "../Loading/Loading.jsx";

function Orders() {
  const userId = useSelector((state) => state.token.userId);
  const { isLoading, data, error } = useGetAxios(
    `api/v1/orders/user/${userId}`
  );
  const orders = data?.map((order) => (
    <div key={order.id} className="accordion" id="accordionExample">
      <div className="accordion-item">
        <h2 className="accordion-header">
          <button
            className="accordion-button collapsed fw-bolder"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target={`#collapse${order.id}`}
            aria-expanded="false"
            aria-controls={`collapse${order.id}`}
          >
            Order Info
          </button>
        </h2>
        <div
          id={`collapse${order.id}`}
          className="accordion-collapse collapse "
          data-bs-parent="#accordionExample"
        >
          <div className="accordion-body">
            <div className="bg-main-light p-3">
              <div className="d-flex align-items-center justify-content-between">
                <p>
                  <span className="text-main fw-bolder">Delivered : </span>
                  {!order.isDelivered && "waiting"}
                </p>
                <p>
                  <span className="text-main fw-bolder">Paid : </span>
                  {order.isPaid && "Yes"}
                </p>
                <p>
                  <span className="text-main fw-bolder">PaymentType : </span>
                  {order.paymentMethodType}
                </p>
              </div>
              <div className="d-flex align-items-center justify-content-between">
                <p>
                  <span className="text-main fw-bolder">OrderItems : </span>
                  {order.cartItems.length}
                </p>
                <p>
                  <span className="text-main fw-bolder">
                    TotalOrderPrice :{" "}
                  </span>
                  {order.totalOrderPrice}
                </p>
              </div>
              <h3>Order Items : </h3>
              {order.cartItems.map((product, i) => (
                <div
                  key={i}
                  className="row py-2 border-bottom align-items-center"
                >
                  <div className="col-md-2">
                    <img
                      className="w-100"
                      src={product.product.imageCover}
                      alt="product"
                    />
                  </div>
                  <div className="col-md-10 fw-bolder">
                    <p className="mt-2">{product.product.title}</p>
                    <div className="d-flex align-items center justify-content-between">
                      <p className="text-main">{product.price} EGP</p>
                      <p>
                        {product.product.ratingsAverage}{" "}
                        <i className="fas fa-star mx-2 rating-color"></i>
                      </p>
                    </div>
                    <p className="text-main">Count : {product.count}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  ));
  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <h1>Your Orders :</h1>
          {orders}
        </>
      )}
    </>
  );
}

export default Orders;
