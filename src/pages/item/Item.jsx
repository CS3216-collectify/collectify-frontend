import { IonGrid, IonRow, IonCol, IonContent } from '@ionic/react';
import ImageCarousel from '../../components/gallery/ImageCarousel'

const Item = (props) => {
  const { title = "Test Title", ownerUsername = "test", ownerName = "Test", description = "Test Description..." } = props;
  return (
    <IonContent>
      <IonGrid>
        <IonRow>
          <IonCol>
            <p>@{ownerUsername} ({ownerName}) </p>
          </IonCol>
        </IonRow>
        <ImageCarousel />
        <IonRow>
          <IonCol size={9}>
            <p>{title}</p>
          </IonCol>
          <IonCol size={3}>
            <p>12 likes</p>
          </IonCol>
        </IonRow>
        <IonRow className="top-margin-s">
          <IonCol>
            <p>{description}</p>
          </IonCol>
        </IonRow>
      </IonGrid>
    </IonContent>
  )
}

export default Item;
