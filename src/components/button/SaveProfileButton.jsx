import { IonButton, IonLabel } from "@ionic/react";

import "./button.scss";

const SaveProfileButton = ({ onClick }) => {
  return (
    <IonButton size="small" expand="block" onClick={onClick} className="follow-button">
      <IonLabel>Save Profile</IonLabel>
    </IonButton>
  );
};

export default SaveProfileButton;
