import { IonGrid, IonRow } from '@ionic/react';
import ImageCarousel from '../../components/ImageGallery/ImageCarousel'

const Item = (props) => {
  const { title = "Test", owner = "@test", description = "Test Description..." } = props;
  return (
    <IonGrid>
      <IonRow>
        <p>{title}</p>
      </IonRow>
      <IonRow>
        <p>{owner}</p>
      </IonRow>
      <ImageCarousel />
      <IonRow>
        <p>{description}</p>
      </IonRow>
    </IonGrid>
  )
}

export default Item;
