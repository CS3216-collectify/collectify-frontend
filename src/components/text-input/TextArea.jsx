import { IonCol, IonLabel, IonTextarea } from "@ionic/react";

const TextArea = (props) => {
  const { title, value, placeholder, onChange: textChangeHandler } = props;

  return (
    <>
      <IonLabel position="stacked">{title}</IonLabel>
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
