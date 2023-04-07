import React from "react";
import imgSlider1 from "./../../../assets/images/slider-image-1.jpeg";
import imgSlider2 from "./../../../assets/images/slider-image-2.jpeg";
import imgSlider3 from "./../../../assets/images/slider-image-3.jpeg";
import Slider from "react-slick";
function MainSlider() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
  };
  return (
    <>
      <div className="row g-0 d-md-flex d-none">
        <div className="col-md-9">
          <Slider {...settings}>
            <img className="w-100" height={400} src={imgSlider1} alt="slider" />
            <img className="w-100" height={400} src={imgSlider2} alt="slider" />
            <img className="w-100" height={400} src={imgSlider3} alt="slider" />
          </Slider>
        </div>
        <div className="col-md-3">
          <img className="w-100" height={200} src={imgSlider1} alt="slider" />
          <img className="w-100" height={200} src={imgSlider2} alt="slider" />
        </div>
      </div>
    </>
  );
}

export default MainSlider;
