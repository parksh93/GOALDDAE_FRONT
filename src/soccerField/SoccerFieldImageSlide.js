import React, { useState } from "react";
import Slider from "react-slick";
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import styles from './SoccerFieldImageSlide.module.css';

// 임시 이미지 불러오기, 사진 저장 기능 완성시 db의 img1~3을 불러올 예정
import TestImg1 from "../auth/imageSlide/image/testImg1.jpg"
import TestImg2 from "../auth/imageSlide/image/testImg2.jpg"
import TestImg3 from "../auth/imageSlide/image/testImg3.jpg"

const SoccerFieldImageSlide = () => {
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
    <div className={styles.imageSlideContainer}>
      <Slider {...settings}>
           <img src={TestImg1} alt="이미지" className={styles.img} />
           <img src={TestImg2} alt="이미지" className={styles.img} />
           <img src={TestImg3} alt="이미지" className={styles.img} />
      </Slider>
    </div>
  );
};

const NextArrow = ({ onClick }) => {
  return (
    <button onClick={onClick} type='button' className={styles.slickNext} />
  );
};

const PrevArrow = ({ onClick }) => {
  return (
    <button onClick={onClick} type='button' className={styles.slickPrev} />
  );
};

export default SoccerFieldImageSlide;
