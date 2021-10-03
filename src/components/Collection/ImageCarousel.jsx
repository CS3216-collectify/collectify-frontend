// refer to https://ionicframework.com/docs/api/slides

import { IonContent, IonImg, IonSlide, IonSlides } from "@ionic/react";

const sampleImage = "https://i1.wp.com/jejuhydrofarms.com/wp-content/uploads/2020/05/blank-profile-picture-973460_1280.png?ssl=1";
const images = [sampleImage, sampleImage, sampleImage, sampleImage];

const ImageCarousel = (props) => {
  return (
    <IonContent>
      <IonSlides pager={true}>
        {images.map((imgUrl, idx) => (
          <IonSlide key={idx}>
            <IonImg src={imgUrl}/>
          </IonSlide>
        ))}
      </IonSlides>
    </IonContent>
  )
}

export default ImageCarousel;