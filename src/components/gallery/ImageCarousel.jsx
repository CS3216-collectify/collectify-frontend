import FlexImage from "../image/FlexImage";
import "./gallery.scss";

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Blur from "../../assets/blur.png";

const ImageCarousel = (props) => {
  const { imageUrls = [] } = props;

  var settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  return (
    <Slider {...settings} className="image-carousel">
      {imageUrls.map((imgUrl, idx) => (
        <div key={idx}>
          <div className="image-carousel-image--container" key={idx}>
            <FlexImage src={imgUrl} />
          </div>
        </div>
      ))}
    </Slider>
  );
};

export default ImageCarousel;
