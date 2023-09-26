import React, { useState } from "react";
import Slider from "react-slick";
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './ImageSlide.css';

// 임시 이미지 불러오기 추후 백엔드에서 저장 예정
// import TestImg1 from "https://kr.object.ncloudstorage.com/goalddae-bucket/image-slide/mainSlide01.Webp";
// import TestImg2 from "https://kr.object.ncloudstorage.com/goalddae-bucket/image-slide/mainSlide02.Webp";
// import TestImg3 from "https://kr.object.ncloudstorage.com/goalddae-bucket/image-slide/mainSlide03.Webp";
// import TestImg4 from "https://kr.object.ncloudstorage.com/goalddae-bucket/image-slide/mainSlide04.Webp";
// import TestImg5 from "https://kr.object.ncloudstorage.com/goalddae-bucket/image-slide/mainSlide05.Webp";
// import TestImg6 from "https://kr.object.ncloudstorage.com/goalddae-bucket/image-slide/mainSlide06.Webp";

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
           <img src="https://kr.object.ncloudstorage.com/goalddae-bucket/image-slide/mainSlide01.Webp" alt="이미지" className="img" />
           <img src="https://kr.object.ncloudstorage.com/goalddae-bucket/image-slide/mainSlide02.Webp" alt="이미지" className="img" />
           <img src="https://kr.object.ncloudstorage.com/goalddae-bucket/image-slide/mainSlide03.Webp" alt="이미지" className="img" />
           <img src="https://kr.object.ncloudstorage.com/goalddae-bucket/image-slide/mainSlide04.Webp" alt="이미지" className="img" />
           <img src="https://kr.object.ncloudstorage.com/goalddae-bucket/image-slide/mainSlide05.Webp" alt="이미지" className="img" />
           <img src="https://kr.object.ncloudstorage.com/goalddae-bucket/image-slide/mainSlide06.Webp" alt="이미지" className="img" />
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
