import { IonButton, IonLabel } from "@ionic/react";
import "./button.scss";

const EditButton = ({ label, onClick: editHandler }) => {
  return (
    <IonButton size="small" onClick={editHandler}>
      <IonLabel>Edit {label}</IonLabel>
    </IonButton>
  );
};

export default EditButton;
