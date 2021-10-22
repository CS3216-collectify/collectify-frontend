import { IonRow, IonSlide, IonSlides } from "@ionic/react";
import FlexImage from "../image/FlexImage";
import "./gallery.scss";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.min.css";
import "swiper/swiper.min.css";

const slideOpts = {
  initialSlide: 0,
};

const ImageCarousel = (props) => {
  const { imageUrls = [] } = props;

  return (
    // <IonSlides pager={true} options={slideOpts} className="image-carousel">
    //   {imageUrls.map((imgUrl, idx) => (
    //     <IonSlide key={idx}>
    //         <FlexImage src={imgUrl} />
    //     </IonSlide>
    //   ))}
    // </IonSlides>
    <Swiper pagination={true} centeredSlides className="image-carousel">
      {imageUrls.map((imgUrl, idx) => (
        <SwiperSlide key={idx}>
          <FlexImage src={imgUrl} />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default ImageCarousel;
