import { IonImg, IonSpinner } from "@ionic/react";
import { useState } from "react";

import "./image.scss";
import NoImageAdded from "../../assets/no-image-added.png";

const FlexImage = (props) => {
  const [loading, setLoading] = useState(true);

  return (
    <div className="flex-image">
      <div className={`ion-spinner-container ${loading ? "" : "ion-hide"}`}>
        <IonSpinner name="crescent" />
      </div>
      <IonImg {...props} src={props.src === null ? NoImageAdded : props.src} onIonImgDidLoad={() => setLoading(false)} />
    </div>
  );
};

export default FlexImage;
