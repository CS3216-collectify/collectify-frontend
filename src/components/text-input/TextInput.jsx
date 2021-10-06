import { IonItem, IonLabel, IonInput, IonGrid, IonRow } from "@ionic/react";
import "./styles.scss";

const TextInput = ({ label, value, onChange: textChangeHandler, placeholder }) => {
  return (
    <>
      <IonLabel position="stacked">{label}</IonLabel>
      <IonInput
        className="text-input"
        value={value}
        placeholder={placeholder}
        onIonChange={(e) => textChangeHandler(e.detail.value)}
      />
    </>
  );
};

export default TextInput;
