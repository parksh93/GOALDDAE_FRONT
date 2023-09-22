import Slider from "react-slick";
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import styles from "./IndividualMatchDetail.module.css";

const IndividualMatchDetailSlide = ({matchInfo}) => {
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

    const images = [matchInfo.fieldImg1, matchInfo.fieldImg2, matchInfo.fieldImg3].filter(Boolean);

    return (
        <div>
            <div className={styles.imageSlideContainer}>
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
        </div>
    );
}

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

export default IndividualMatchDetailSlide;