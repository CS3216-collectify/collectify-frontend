import { IonButton, IonLabel } from "@ionic/react";
import "./button.scss";

const AddButton = ({ label, className, onClick: addHandler }) => {
  return (
    <IonButton size="small" onClick={addHandler} className={className} fill="outline">
      <IonLabel>+ {label}</IonLabel>
    </IonButton>
  );
};

export default AddButton;
