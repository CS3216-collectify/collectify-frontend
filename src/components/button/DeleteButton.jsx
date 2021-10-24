import { IonButton, IonIcon } from "@ionic/react";
import { trashOutline } from "ionicons/icons";
import Text from "../text/Text";

import './button.scss';

const DeleteButton = ({ onClick }) => {
  return (
    <IonButton size="small" color="danger" onClick={onClick}>
      <IonIcon size="small" slot="icon-only" icon={trashOutline} />
      Delete
    </IonButton>
  );
};

export default DeleteButton;
