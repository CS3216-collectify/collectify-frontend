import { IonButton } from "@ionic/react";

import "./button.scss";

// Button to upload images
const UploadButton = ({ onChange: changeHandler, label = "Add Photos" }) => {
  const inputHandler = (e) => {
    changeHandler(e.target.files[0]);
    e.target.files = null;
  };

  return (
    <>
      <IonButton
        fill="outline"
        onClick={() => document.getElementById("my-image-input").click()}
        size="medium"
      >
        {label}
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
