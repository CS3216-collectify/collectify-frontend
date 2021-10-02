import { IonItem, IonLabel, IonInput } from "@ionic/react";

/**
 * React Wrapper for IonToast
 */
const TextInput = ({ value, onChange, type }) => {
  return (
    <IonItem>
      <IonLabel position="fixed">Name</IonLabel>
      <IonInput value={value} onIonChange={(e) => onChange(e.detail.value)} clearInput={true} type={type}></IonInput>
    </IonItem>
  );
};

export default TextInput;
