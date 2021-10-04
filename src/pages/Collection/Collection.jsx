import { IonCol, IonGrid, IonRow, IonText } from '@ionic/react';
import ImageGrid from '../../components/ImageGallery/ImageGrid'
import "./styles.css"

const Collection = (props) => {
  const { title = "Test Collection", ownerName = "Test", ownerUsername = "@test", description = "Test Collection Description..." } = props;
  return (
    <IonGrid>
      <IonRow>
        <IonCol size={8}>
          <IonText>
            <p>{title}</p>
          </IonText>
        </IonCol>
        <IonCol size={4}>
          <IonText>
            <p>20 followers</p>
          </IonText>
        </IonCol>
      </IonRow>
      <IonRow className="top-margin-s">
        <IonCol>
          <IonText>
            <p>by {ownerUsername} ({ownerName}) </p>
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
      <ImageGrid />
    </IonGrid>
  )
}

export default Collection;