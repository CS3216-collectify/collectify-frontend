import { IonGrid, IonRow } from '@ionic/react';
import ImageGrid from '../../components/ImageGallery/ImageGrid'

const Collection = (props) => {
  const { title = "Test Collection", owner = "@test", description = "Test Collection Description..." } = props;
  return (
    <IonGrid>
      <IonRow>
        <p>{title}</p>
      </IonRow>
      <IonRow>
        <p>{description}</p>
      </IonRow>
      <IonRow>
        <p>{owner}</p>
      </IonRow>
      <ImageGrid />
    </IonGrid>
  )
}

export default Collection;