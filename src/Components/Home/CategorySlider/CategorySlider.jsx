import React from "react";
import useGetAxios from "../../Hooks/Axios/useGetAxios.js";
import { baseApi } from "../../../App.js";
import Slider from "react-slick";
import Loading from "../../Loading/Loading.jsx";

function CategorySlider() {
  const { isLoading, data, error } = useGetAxios(`api/v1/categories`);
  const sliderImgs = data?.data?.map((category) => (
    <div key={category._id} className="text-center">
      <img
        className="w-100"
        style={{ height: "200px" }}
        src={category.image}
        alt="category"
      />
      <p>{category.name}</p>
    </div>
  ));
  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 7,
    slidesToScroll: 1,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 5,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 769,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
    ],
  };

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <div className="py-5">
          <h3>Shop Popular Categories</h3>
          <Slider {...settings}>{sliderImgs}</Slider>
        </div>
      )}
    </>
  );
}

export default CategorySlider;
