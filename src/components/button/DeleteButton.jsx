import { IonButton, IonIcon } from "@ionic/react";
import { trashOutline } from "ionicons/icons";
import Text from "../text/Text";

import './button.scss';

const DeleteButton = ({ onClick }) => {
  return (
    <IonButton size="small" fill="outline" color="danger" onClick={onClick} className="delete-button">
      <IonIcon size="small" slot="icon-only" icon={trashOutline} />
      <Text size="s">Delete</Text>
    </IonButton>
  );
};

export default DeleteButton;
