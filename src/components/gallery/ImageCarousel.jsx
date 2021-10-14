import { IonCol, IonContent, IonGrid, IonIcon, IonRow, IonSlide, IonSlides } from "@ionic/react";
import { useState } from "react";
import FlexImage from "../image/FlexImage";
import "./gallery.scss";

// const sampleImage = "https://i1.wp.com/jejuhydrofarms.com/wp-content/uploads/2020/05/blank-profile-picture-973460_1280.png?ssl=1";
// const imageUrls = [sampleImage, sampleImage, sampleImage, sampleImage];

const ImageCarousel = (props) => {
  const { imageUrls = [] } = props;

  // console.log(imageUrls);

  return (
    <IonSlides 
      pager={true} 
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