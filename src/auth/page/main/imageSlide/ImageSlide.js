import React, { useState } from "react";
import Slider from "react-slick";
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './ImageSlide.css';

// 임시 이미지 불러오기 추후 백엔드에서 저장 예정
import TestImg1 from "./image/mainPost.png";
import TestImg2 from "./image/testImg2.jpg";
import TestImg3 from "./image/testImg3.jpg";
import TestImg4 from "./image/testImg4.jpg";
import TestImg5 from "./image/testImg5.jpg";
import TestImg6 from "./image/testImg6.jpg";

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
