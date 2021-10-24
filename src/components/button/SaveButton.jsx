import { IonButton, IonIcon, IonLabel } from "@ionic/react";
import { saveOutline } from "ionicons/icons";

import "./button.scss";

const SaveButton = ({ onClick: saveHandler }) => {
  return (
    <IonButton onClick={saveHandler}>
      <IonIcon size="small" slot="icon-only" icon={saveOutline} />
      Save
    </IonButton>
  );
};

export default SaveButton;
