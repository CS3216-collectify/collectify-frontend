import { IonButton, IonLabel } from "@ionic/react";

import "./button.scss";

const UpdateUsernameButton = ({ onClick }) => {
  return (
    <IonButton size="medium" expand="block" onClick={onClick} className="follow-button">
      <IonLabel>Update Username</IonLabel>
    </IonButton>
  );
};

export default UpdateUsernameButton;
