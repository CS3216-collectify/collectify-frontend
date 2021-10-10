import { IonGrid, IonRow, IonCol, IonContent, IonPage } from '@ionic/react';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import ImageCarousel from '../../components/gallery/ImageCarousel';
import HomeToolbar from '../../components/toolbar/HomeToolbar';
import { getItemFromCollection } from '../../services/items';

const Item = () => {
  const { collectionId, itemId } = useParams();

  const [title, setTitle] = useState("Test Title");
  const [ownerUsername, setOwnerUsername] = useState("itemOwner");
  const [ownerName, setOwnerName] = useState("itemOwner");
  const [description, setDescription] = useState("Test Description...");

  const fetchItemData = async () => {
    const item = await getItemFromCollection(collectionId, itemId);
    setTitle(item.itemName);
    setDescription(item.description);
    // setOwnerUsername(item.ownerUsername);
    // setOwnerName(item.ownerName);
  }

  useEffect(() => {
    fetchItemData();
  }, []);

  return (
    <IonPage className="profile">
      <HomeToolbar title={`${ownerName}'s Item`} />
        <IonContent>
          <IonGrid fixed>
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
            <IonRow>
              <IonCol>
                <p>{description}</p>
              </IonCol>
            </IonRow>
          </IonGrid>
        </IonContent>
    </IonPage>
  )
}

export default Item;
