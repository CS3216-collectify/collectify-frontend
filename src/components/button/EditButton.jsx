import { IonButton, IonLabel } from "@ionic/react";
import "./button.scss";

const EditButton = ({ label, onClick: editHandler }) => {
  return (
    <IonButton onClick={editHandler}>
      <IonLabel>Edit {label}</IonLabel>
    </IonButton>
  );
};

export default EditButton;
