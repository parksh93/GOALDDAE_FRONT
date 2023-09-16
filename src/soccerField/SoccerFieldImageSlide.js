import React from "react";
import Slider from "react-slick";
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import styles from './SoccerFieldImageSlide.module.css';

const SoccerFieldImageSlide = ({ fieldInfo }) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />
  };

  // fieldInfo에서 이미지 URL을 가져옵니다.
  const images = [fieldInfo.fieldImg1, fieldInfo.fieldImg2, fieldInfo.fieldImg3].filter(Boolean);

  return (
    <div className={styles.imageSlideContainer}>
      {/* 이미지가 하나 이상일 때만 슬라이드를 렌더링합니다. */}
      {images.length > 0 && (
        <Slider {...settings}>
          {images.map((imageUrl, index) => (
            <div key={index}>
              <img src={imageUrl} alt={`이미지 ${index + 1}`} className={styles.img} />
            </div>
          ))}
        </Slider>
      )}
    </div>
  );
};

const NextArrow = ({ onClick }) => {
  return (
    <button onClick={onClick} type='button' className='slick-next' />
  );
};

const PrevArrow = ({ onClick }) => {
  return (
    <button onClick={onClick} type='button' className='slick-prev' />
  );
};

export default SoccerFieldImageSlide;
