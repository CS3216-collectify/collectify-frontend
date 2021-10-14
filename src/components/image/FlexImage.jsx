import { IonImg } from '@ionic/react';
import './image.scss';

const FlexImage = (props) => {
  return (
    <IonImg className="flex-image" {...props} />
  )
}

export default FlexImage;
