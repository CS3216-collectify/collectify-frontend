import { IonButton, IonLabel } from "@ionic/react";

import "./button.scss";

const SaveButton = ({ onClick: saveHandler }) => {
  return (
    <IonButton
      onClick={saveHandler}
    >
      Save
    </IonButton>
  );
};

export default SaveButton;
