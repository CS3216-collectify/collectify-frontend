import { IonLabel, IonTextarea } from "@ionic/react";

const TextArea = ({ label, value, placeholder, onChange }) => {
  return (
    <>
      <IonLabel position="stacked">{label}</IonLabel>
      {/* <IonTextarea autoGrow value={value} placeholder={placeholder} onIonChange={(e) => onChange(e.detail.value)} /> */}
      <IonTextarea value={value} placeholder={placeholder} onIonChange={(e) => onChange(e.detail.value)} />
    </>
  );
};

export default TextArea;
