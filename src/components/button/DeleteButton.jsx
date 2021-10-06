import { IonButton, IonIcon } from "@ionic/react";
import { trashOutline } from "ionicons/icons";

import './button.scss';

const DeleteButton = ({ onClick }) => {
  return (
    <IonButton size="small" color="danger" onClick={onClick}>
      <IonIcon size="small" slot="icon-only" icon={trashOutline} />
    </IonButton>
  );
};

export default DeleteButton;
