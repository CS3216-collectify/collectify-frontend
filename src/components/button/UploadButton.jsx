import { IonButton, IonLabel } from "@ionic/react";

import "./button.scss";

// Button to upload images
const UploadButton = ({ onChange }) => {
  return (
    <>
      <IonButton
        onClick={() => document.getElementById("my-image-input").click()}
      >
        Add Photos
      </IonButton>
      {/* The HTML input component below is hidden */}
      <input
        id="my-image-input"
        type="file"
        accept="image/png, image/jpg"
        onChange={onChange}
        multiple={false}
        hidden={true}
      />
    </>
  );
};

export default UploadButton;
