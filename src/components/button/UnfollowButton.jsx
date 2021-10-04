import { IonButton, IonLabel } from "@ionic/react";

import "./button.scss";

const UnfollowButton = ({ onClick }) => {
  return (
    <IonButton size="small" fill="outline" color="danger" onClick={onClick} className="unfollow-button">
      <IonLabel>Unfollow</IonLabel>
    </IonButton>
  );
};

export default UnfollowButton;
