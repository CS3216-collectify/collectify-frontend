import { IonButton, IonLabel } from "@ionic/react";

import "./button.scss";

const UnfollowButton = ({ onClick }) => {
  return (
    <IonButton size="medium" fill="outline" color="danger" onClick={onClick} expand="block" className="unfollow-button">
      <IonLabel>Unfollow</IonLabel>
    </IonButton>
  );
};

export default UnfollowButton;
