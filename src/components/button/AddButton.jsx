import { IonButton, IonLabel } from "@ionic/react";
import "./button.scss";

const AddButton = ({ label, className, onClick: addHandler }) => {
  return (
    <IonButton size="medium" onClick={addHandler} className={className} fill="outline">
      <IonLabel>Add {label}</IonLabel>
    </IonButton>
  );
};

export default AddButton;
