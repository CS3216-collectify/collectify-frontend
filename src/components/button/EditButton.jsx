import { IonButton, IonLabel } from "@ionic/react";
import "./button.scss";

const EditButton = ({ label, className, onClick: editHandler }) => {
  return (
    <IonButton size="small" onClick={editHandler} className={className} fill="outline">
      <IonLabel>Edit {label}</IonLabel>
    </IonButton>
  );
};

export default EditButton;
