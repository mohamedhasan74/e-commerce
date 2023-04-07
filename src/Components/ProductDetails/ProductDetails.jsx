import React from "react";
import { useParams } from "react-router-dom";
import useGetAxios from "../Hooks/Axios/useGetAxios.js";
import Slider from "react-slick";
import Loading from "../Loading/Loading.jsx";
import { useDispatch, useSelector } from "react-redux";
import { addProductToCart } from "../../ReduxToolKit/cartReducer.js";
function ProductDetails() {
  const { id } = useParams();
  const token = useSelector((state) => state.token.userToken);
  const distpatch = useDispatch();
  const { isLoading, data, error } = useGetAxios(`api/v1/products/${id}`);
  const product = data?.data;
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <div className="row py-5 align-items-center">
          <div className="col-md-3 py-5">
            <Slider {...settings}>
              {product?.images.map((img, i) => (
                <img key={i} className="w-100" src={img} alt="product" />
              ))}
            </Slider>
          </div>
          <div className="col-md-9">
            <p>{product?.title}</p>
            <p className="text-muted">{product?.description}</p>
            <p className="mb-0">{product?.category.name}</p>
            <div className="d-flex justify-content-between align-items-center">
              <p className="text-main">{product?.price} EGP</p>
              <p>
                {product?.ratingsAverage}{" "}
                <i className="fas fa-star rating-color"></i>
              </p>
            </div>
            <button
              onClick={() => {
                distpatch(addProductToCart({ token, productId: id }));
              }}
              className="btn bg-main text-white w-100"
            >
              + add to cart
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default ProductDetails;
