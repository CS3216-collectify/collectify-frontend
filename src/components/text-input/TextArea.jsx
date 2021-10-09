import { IonLabel, IonTextarea } from "@ionic/react";

const TextArea = (props) => {
  const { label, value, placeholder, onChange: textChangeHandler } = props;

  return (
    <>
      <IonLabel position="stacked">{label}</IonLabel>
      <IonTextarea
        autoGrow
        value={value}
        placeholder={placeholder}
        onIonChange={(e) => textChangeHandler(e.detail.value)}
      />
    </>
  )
}

export default TextArea;
