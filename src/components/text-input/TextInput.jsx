import { IonItem, IonLabel, IonInput, IonGrid, IonRow } from "@ionic/react";
import "./styles.css";

const TextInput = ({ title, value, onChange: textChangeHandler, placeholder }) => {
  return (
    <>
      <IonLabel position="stacked">{title}</IonLabel>
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
