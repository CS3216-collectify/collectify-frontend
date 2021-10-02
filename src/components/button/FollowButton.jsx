import { IonButton, IonLabel } from "@ionic/react";

import "./button.scss";

const FollowButton = ({ onClick }) => {
  return (
    <IonButton size="small" onClick={onClick}>
      <IonLabel>Follow</IonLabel>
    </IonButton>
  );
};

export default FollowButton;
