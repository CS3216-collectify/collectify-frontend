// TODO: Button leading to AddItem / AddCollection

import { IonButton, IonLabel } from "@ionic/react";

import "./button.scss";

const AddButton = ({ label, onClick: addHandler }) => {
  return (
    <IonButton onClick={addHandler}>
      <IonLabel>+ {label}</IonLabel>
    </IonButton>
  );
};

export default AddButton;
