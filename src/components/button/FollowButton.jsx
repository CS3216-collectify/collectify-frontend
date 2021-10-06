import { IonButton, IonLabel } from "@ionic/react";

import "./button.scss";

const FollowButton = ({ onClick }) => {
  return (
    <IonButton size="small" expand="block" onClick={onClick} className="follow-button">
      <IonLabel>Follow</IonLabel>
    </IonButton>
  );
};

export default FollowButton;
