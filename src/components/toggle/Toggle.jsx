import { IonLabel, IonSegment, IonSegmentButton } from "@ionic/react";


const Toggle = (props) => {
  console.log("ASDasd")
  const { value, options, onChange: toggleHandler } = props;
  return (
    <IonSegment value={value} onIonChange={(e) => toggleHandler(e.detail.value)}>
      {options.map((opt, idx) => (
        <IonSegmentButton key={idx} value={opt.value}>
          <IonLabel>{opt.label}</IonLabel>
        </IonSegmentButton>
      ))}
    </IonSegment>
  )
}

export default Toggle;
