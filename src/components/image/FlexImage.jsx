import { IonImg } from '@ionic/react';
import './image.scss';

const FlexImage = (props) => {
  return (
    <IonImg className="flex-image" src={props.src} />
  )
}

export default FlexImage;
