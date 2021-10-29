import { IonButton, IonLabel } from "@ionic/react";
import "./button.scss";

const EditButton = ({ label, className, onClick: editHandler, fill = "solid" }) => {
  return (
    <IonButton size="medium" onClick={editHandler} className={className} fill={fill}>
      <IonLabel>Edit {label}</IonLabel>
    </IonButton>
  );
};

export default EditButton;
