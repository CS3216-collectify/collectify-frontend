import { IonButton, IonIcon, IonLabel } from "@ionic/react";
import { personAddOutline } from "ionicons/icons";

import './button.scss';

const FollowButton = ({ onClick }) => {
  return (
    <IonButton size="small" onClick={onClick}>
      <IonLabel>Follow</IonLabel>
    </IonButton>
  );
};

export default FollowButton;
