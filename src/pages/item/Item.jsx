import { IonGrid, IonRow, IonCol, IonContent, IonPage, IonLoading } from '@ionic/react';
import { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router';
import EditButton from '../../components/button/EditButton';
import ImageCarousel from '../../components/gallery/ImageCarousel';
import HomeToolbar from '../../components/toolbar/HomeToolbar';
import { getItemFromCollection } from '../../services/items';

const Item = () => {
  const history = useHistory();
  const { collectionId, itemId } = useParams();

  const [title, setTitle] = useState("Test Title");
  const [ownerUsername, setOwnerUsername] = useState("itemOwner");
  const [ownerName, setOwnerName] = useState("itemOwner");
  const [description, setDescription] = useState("Test Description...");
  const [loading, setLoading] = useState(false);

  const fetchItemData = async () => {
    setLoading(true);
    try {
      const item = await getItemFromCollection(collectionId, itemId);
      setTitle(item.itemName);
      setDescription(item.description);
      // setOwnerUsername(item.ownerUsername);
      // setOwnerName(item.ownerName);
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    setLoading(true);
    fetchItemData();
  }, []);

  if (loading) {
    return <IonLoading isOpen={loading} />;
  }

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
            <IonRow className="ion-justify-content-end">
              <EditButton label="Item" onClick={() => history.push(`/collections/${collectionId}/items/${itemId}/edit`)} />
            </IonRow>
          </IonGrid>
        </IonContent>
    </IonPage>
  )
}

export default Item;
