import { IonGrid, IonRow, IonCol, IonText } from '@ionic/react';
import ImageCarousel from '../../components/ImageGallery/ImageCarousel'

const Item = (props) => {
  const { title = "Test Title", ownerUsername = "@test", ownerName = "Test", description = "Test Description..." } = props;
  return (
    <IonGrid>
      <IonRow>
        <IonCol>
          <p>{ownerUsername} ({ownerName}) </p>
        </IonCol>
      </IonRow>
      <ImageCarousel />
      <IonRow>
        <IonCol size={9}>
          <IonText>
            <p>{title}</p>
          </IonText>
        </IonCol>
        <IonCol size={3}>
          <IonText>
            <p>12 likes</p>
          </IonText>
        </IonCol>
      </IonRow>
      <IonRow className="top-margin-s">
        <IonCol>
          <IonText>
            <p>{description}</p>
          </IonText>
        </IonCol>
      </IonRow>
    </IonGrid>
  )
}

export default Item;
