import { IonTextarea } from "@ionic/react";

const TextArea = (props) => {
  const { value, placeholder, onChange: textChangeHandler } = props;

  return (
    <IonTextarea
      autoGrow
      value={value}
      placeholder={placeholder}
      onIonChange={textChangeHandler}
    />
  )
}

export default TextArea;
