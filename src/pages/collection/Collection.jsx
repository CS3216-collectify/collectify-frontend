import { IonCol, IonContent, IonGrid, IonRow } from '@ionic/react';
import ImageGrid from '../../components/gallery/ImageGrid'
import "./Collection.scss"

const Collection = (props) => {
  const { title = "Test Collection", ownerName = "Test", ownerUsername = "test", description = "Test Collection Description..." } = props;
  return (
    <IonContent>
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
    </IonContent>
  )
}

export default Collection;