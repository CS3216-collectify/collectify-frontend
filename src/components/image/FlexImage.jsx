import { IonImg, IonSpinner } from "@ionic/react";
import { useState } from "react";

import "./image.scss";
import NoImageAdded from "../../assets/no-image-added.png";

const FlexImage = (props) => {
  const [loading, setLoading] = useState(true);
  console.log(props.src);
  return (
    <>
      {/* <IonSpinner paused={true} /> */}
      <IonImg className="flex-image" src={props.src === null ? NoImageAdded : props.src} onIonImgDidLoad={() => setLoading(false)} onIonError />
    </>
  );
};

export default FlexImage;
