import { IonButton, IonIcon } from "@ionic/react";
import { trashOutline } from "ionicons/icons";
import Text from "../text/Text";

import './button.scss';

const DeleteButton = ({ onClick }) => {
  return (
    <IonButton size="medium" fill="outline" color="danger" onClick={onClick} className="delete-button">
      <IonIcon size="small" slot="icon-only" icon={trashOutline} />
      <Text size="m">Delete</Text>
    </IonButton>
  );
};

export default DeleteButton;
