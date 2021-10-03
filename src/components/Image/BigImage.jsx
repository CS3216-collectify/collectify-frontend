import { IonImg } from '@ionic/react';
import './styles.css';

const BigImage = (props) => {
  return (
    <IonImg className="big-image" {...props}/>
  )
}

export default BigImage;
