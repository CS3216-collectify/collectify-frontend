import { IonButton, IonLabel, IonSelect, IonSelectOption } from "@ionic/react";

import "./button.scss";

// options param must contain an array of { value, text }
const SelectButton = ({ buttonLabel, selectLabel, onChange: selectHandler, options }) => {

  // display by alphabetical, case-insensitive text order
  const sortedByTextOptions = options.sort((a, b) => a.text.toLowerCase() <= b.text.toLowerCase() ? -1 : 1);

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
        onIonChange={(e) => selectHandler(e.detail.value)}
        hidden={true}
      >
        {sortedByTextOptions.map((opt, idx) => (
          <IonSelectOption key={idx} value={opt.value}>{opt.text}</IonSelectOption>
        ))}
      </IonSelect>
    </>
  );
};

export default SelectButton;
