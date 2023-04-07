import React from "react";
import CategorySlider from "./CategorySlider/CategorySlider.jsx";
import FeaturedProducts from "./FeaturedProducts/FeaturedProducts.jsx";

import MainSlider from "./MainSlider/MainSlider.jsx";

function Home() {
  return (
    <>
      <MainSlider />
      <CategorySlider />
      <FeaturedProducts slice={true} title={true} />
    </>
  );
}

export default Home;
