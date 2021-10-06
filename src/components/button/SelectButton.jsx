import { IonButton, IonLabel, IonSelect, IonSelectOption } from "@ionic/react";

import "./button.scss";

// options param must contain an array of { value, text }
const SelectButton = ({ buttonLabel, selectLabel, onChange: selectHandler, options }) => {
  return (
    <>
      <IonButton
        onClick={() => document.getElementById("cat-select").click()}
      >
        {buttonLabel}
      </IonButton>
      <IonLabel hidden={true}>{selectLabel}</IonLabel>
      <IonSelect
        id="cat-select"
        multiple
        onIonChange={(e) => selectHandler(e.detail.value)}
        hidden={true}
      >
        {options.map((opt, idx) => (
          <IonSelectOption key={idx} value={opt.value}>{opt.text}</IonSelectOption>
        ))}
      </IonSelect>
    </>
  );
};

export default SelectButton;
