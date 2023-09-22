import React, { useState } from "react";
import Slider from "react-slick";
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './ImageSlide.css';

// 임시 이미지 불러오기 추후 백엔드에서 저장 예정
import TestImg1 from "./image/mainSlide01.Webp";
import TestImg2 from "./image/mainSlide02.Webp";
import TestImg3 from "./image/mainSlide03.Webp";
import TestImg4 from "./image/mainSlide04.Webp";
import TestImg5 from "./image/mainSlide05.Webp";
import TestImg6 from "./image/mainSlide06.Webp";

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
           <img src={TestImg1} alt="이미지" className="img" />
           <img src={TestImg2} alt="이미지" className="img" />
           <img src={TestImg3} alt="이미지" className="img" />
           <img src={TestImg4} alt="이미지" className="img" />
           <img src={TestImg5} alt="이미지" className="img" />
           <img src={TestImg6} alt="이미지" className="img" />
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
