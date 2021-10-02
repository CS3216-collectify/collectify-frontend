import { IonButton, IonIcon, IonLabel } from "@ionic/react";
import { personAddOutline } from "ionicons/icons";

import './button.scss';

const UnfollowButton = ({ onClick }) => {
  return (
    <IonButton size="small" fill="outline" color="danger" onClick={onClick}>
      <IonLabel>Unfollow</IonLabel>
    </IonButton>
  );
};

export default UnfollowButton;
