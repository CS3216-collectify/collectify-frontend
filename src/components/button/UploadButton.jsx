import { IonButton } from "@ionic/react";

import "./button.scss";

// Button to upload images
const UploadButton = ({ onChange: changeHandler }) => {
  const inputHandler = (e) => {
    changeHandler(e.target.files[0]);
    e.target.files = null;
  };

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
        accept="image/*"
        onChange={inputHandler}
        multiple={false}
        hidden={true}
      />
    </>
  );
};

export default UploadButton;
