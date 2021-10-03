import { IonImg } from '@ionic/react';
import './styles.css';

const FlexIonImg = (props) => {
  return (
    <IonImg className="flex-image" src={props.src} />
  )
}

export default FlexIonImg;
