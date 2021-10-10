import { IonLabel, IonInput } from "@ionic/react";
import "./text-input.scss";

const TextInput = ({ label, value, onChange, placeholder }) => {
  return (
    <>
      <IonLabel position="stacked">{label}</IonLabel>
      <IonInput
        className="text-input"
        value={value}
        placeholder={placeholder}
        onIonChange={(e) => onChange(e.detail.value)}
      />
    </>
  );
};

export default TextInput;
