import { IonCol, IonGrid, IonRow } from '@ionic/react';
import ImageGrid from '../../components/ImageGallery/ImageGrid'
import "./styles.css"

const Collection = (props) => {
  const { title = "Test Collection", ownerName = "Test", ownerUsername = "test", description = "Test Collection Description..." } = props;
  return (
    <IonGrid>
      <IonRow>
        <IonCol size={8}>
          <p>{title}</p>
        </IonCol>
        <IonCol size={4}>
          <p>20 followers</p>
        </IonCol>
      </IonRow>
      <IonRow className="top-margin-s">
        <IonCol>
          <p>by @{ownerUsername} ({ownerName}) </p>
        </IonCol>
      </IonRow>
      <IonRow className="top-margin-s">
        <IonCol>
          <p>{description}</p>
        </IonCol>
      </IonRow>
      <ImageGrid />
    </IonGrid>
  )
}

export default Collection;