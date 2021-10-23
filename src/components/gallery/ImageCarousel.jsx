import FlexImage from "../image/FlexImage";
import "./gallery.scss";

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

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
    // <IonSlides pager={true} options={slideOpts} className="image-carousel">
    //   {imageUrls.map((imgUrl, idx) => (
    //     <IonSlide key={idx}>
    //         <FlexImage src={imgUrl} />
    //     </IonSlide>
    //   ))}
    // </IonSlides>
    // <Swiper pagination={true} centeredSlides className="image-carousel">
    //   {imageUrls.map((imgUrl, idx) => (
    //     <SwiperSlide key={idx}>
    //       <FlexImage src={imgUrl} />
    //     </SwiperSlide>
    //   ))}
    // </Swiper>
    // !!imageUrls && (
    //   <Carousel showThumbs={false} showStatus={false} swipeable={true} emulateTouch={true} className="image-carousel">
    //     {imageUrls.map((imgUrl, idx) => (
    //       <div className="image-carousel-image--container" key={idx} style={{ backgroundImage: `url(${imgUrl})` }}>
    //         <FlexImage src={imgUrl} />
    //       </div>
    //     ))}
    //   </Carousel>
    // )

    <Slider {...settings} className="image-carousel">
      {imageUrls.map((imgUrl, idx) => (
        <>
          <div className="image-carousel-image--container" key={idx} style={{ backgroundImage: `url('${imgUrl}')` }}>
            <FlexImage src={imgUrl} />
          </div>
        </>
      ))}
    </Slider>
  );
};

export default ImageCarousel;
