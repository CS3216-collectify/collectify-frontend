import { IonRow, IonSlide, IonSlides } from "@ionic/react";
import FlexImage from "../image/FlexImage";
import "./gallery.scss";

// const sampleImage = "https://i1.wp.com/jejuhydrofarms.com/wp-content/uploads/2020/05/blank-profile-picture-973460_1280.png?ssl=1";
// const imageUrls = [sampleImage, sampleImage, sampleImage, sampleImage];

const SCREEN_WIDTH = Math.max(
  document.documentElement.clientWidth || 0,
  window.innerWidth || 0
);

const slideOpts = {
  initialSlide: 0,
  // width: SCREEN_WIDTH,
  // height: SCREEN_WIDTH,
}

const ImageCarousel = (props) => {
  const { imageUrls = [] } = props;

  // console.log(imageUrls);

  return (
    <IonSlides 
      pager={true} 
      options={slideOpts} 
      className="image-carousel"
    >
      {imageUrls.map((imgUrl, idx) => (
        <IonSlide key={idx}>
          <IonRow className="padding-bottom">
            <FlexImage src={imgUrl} />
          </IonRow>
        </IonSlide>
      ))}
    </IonSlides>
  )
}

export default ImageCarousel;