import React, { useState } from "react";
import Slider from "react-slick";
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './ImageSlide.css';

const ImageSlide = () => {
  const [settings] = useState({
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />
  });

  return (
    <div className="image-slide-container">
      <Slider {...settings}>
           <img src="https://kr.object.ncloudstorage.com/goalddae-bucket/team-match/KakaoTalk_20230923_223625579.webp" alt="이미지" className="img" />
      </Slider>
    </div>
  );
};

const NextArrow = ({ onClick }) => {
  return (
    <button onClick={onClick} type='button' className="slick-next" />
  );
};

const PrevArrow = ({ onClick }) => {
  return (
    <button onClick={onClick} type='button' className="slick-prev" />
  );
};

export default ImageSlide;
