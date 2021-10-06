import { IonCol, IonContent, IonGrid, IonIcon, IonRow, IonSlide, IonSlides } from "@ionic/react";
import { useState } from "react";
import FlexImage from "../image/FlexImage";
// import { ellipse } from "ionicons/icons";
import "./styles.css";
const sampleImage = "https://i1.wp.com/jejuhydrofarms.com/wp-content/uploads/2020/05/blank-profile-picture-973460_1280.png?ssl=1";
const images = [sampleImage, sampleImage, sampleImage, sampleImage];

// const SlidesPager = (props) => {
//   const { activeIndex, length } = props;

//   const isSelected = (idx) => idx === activeIndex;
//   const idxColor = (idx) => isSelected(idx) ? "#ffffff" : "#000000";

//   return (
//     <IonGrid>
//       <IonRow className="ion-align-items-center">
//         {
//           [...Array(length)].map((v, idx) => (
//             <IonIcon 
//               key={idx} 
//               icon={ellipse} 
//               color={idxColor(idx)}
//             />
//           ))
//         }
//       </IonRow>
//     </IonGrid>
//   )
// }

const ImageCarousel = (props) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const getActiveIndex = async (e) => {
    await e.target.getActiveIndex().then(v => setActiveIndex(v));
  }

  return (
    <IonSlides 
      pager={true} 
      onIonSlideDidChange={getActiveIndex}
    >
      {images.map((imgUrl, idx) => (
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