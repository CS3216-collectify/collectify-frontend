import { IonImg } from '@ionic/react';
import './styles.css';

const FlexImage = (props) => {
  return (
    <IonImg className="flex-image" src={props.src} />
  )
}

export default FlexImage;
