import React from 'react'
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
const HomeSlide = () => {
  const settings = {
    dots: true,
    arrows: true,
    lazyLoad: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    initialSlide: 2
  };
  return (
    <>
      <Slider {...settings}>
        <div>
          <img src="https://iwater.vn/Image/Picture/banner/giao-nuoc-tan-nha.jpg" />
        </div>
        <div>
          <img src="https://iwater.vn/Image/Picture/banner/khuyen-mai-nuoc-Miocen.jpg" />
        </div>
      </Slider>
    </>
  )
}
export default HomeSlide;
