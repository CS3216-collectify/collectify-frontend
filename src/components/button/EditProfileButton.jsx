import { IonButton, IonLabel } from "@ionic/react";

import "./button.scss";

const EditProfileButton = ({ onClick }) => {
  return (
    <IonButton fill="outline" size="medium" expand="block" onClick={onClick} className="follow-button">
      <IonLabel>Edit Profile</IonLabel>
    </IonButton>
  );
};

export default EditProfileButton;
