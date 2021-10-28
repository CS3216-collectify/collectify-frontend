import { IonButton, IonIcon, IonLabel } from "@ionic/react";
import { saveOutline } from "ionicons/icons";

import "./button.scss";
import Text from "../text/Text";

const SaveButton = ({ onClick: saveHandler }) => {
  return (
    <IonButton size="small" className="save-button" onClick={saveHandler}>
      <IonIcon size="small" slot="icon-only" icon={saveOutline} />
      <Text size="s">Save</Text>
    </IonButton>
  );
};

export default SaveButton;
