import { IonGrid, IonRow, IonCol, IonContent, IonPage, IonLoading, IonIcon, IonButton } from "@ionic/react";
import { useEffect, useState, useCallback } from "react";
import { useHistory, useParams, useLocation } from "react-router";
import EditButton from "../../components/button/EditButton";
import ImageCarousel from "../../components/gallery/ImageCarousel";
import HomeToolbar from "../../components/toolbar/HomeToolbar";
import { getItemFromCollection } from "../../services/items";
import useUserContext from "../../hooks/useUserContext";
import { heart, heartOutline } from "ionicons/icons";
import Text from "../../components/text/Text";

const Item = () => {
  const history = useHistory();
  const location = useLocation();
  const { collectionId, itemId } = useParams();
  const { currentUserId } = useUserContext();

  const [title, setTitle] = useState("Test Title");
  const [ownerUsername, setOwnerUsername] = useState("itemOwner");
  const [ownerId, setOwnerId] = useState(null);
  const [ownerName, setOwnerName] = useState("itemOwner");
  const [description, setDescription] = useState("Test Description...");
  const [loading, setLoading] = useState(false);
  const [images, setImages] = useState([]);
  const [liked, setLiked] = useState(false);

  const fetchItemData = useCallback(async () => {
    setLoading(true);
    try {
      const item = await getItemFromCollection(collectionId, itemId);
      setTitle(item.itemName);
      setDescription(item.description);
      setImages(item.images);
      setOwnerId(item.ownerId);
      // setOwnerUsername(item.ownerUsername);
      // setOwnerName(item.ownerName);
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  }, [collectionId, itemId]);

  useEffect(() => {
    setLoading(true);
    fetchItemData();
    console.log("fetech")
  }, [fetchItemData, location]);

 
  return (
    <IonPage className="profile">
      <IonLoading isOpen={loading} spinner="crescent" />
      <HomeToolbar title={`${ownerName}'s Item`} />
      <IonContent>
        <IonGrid fixed>
          <IonRow>
            <IonCol>
              <Text>
              @{ownerUsername}
              </Text>
            </IonCol>
            <IonCol>
              {Number(currentUserId) === Number(ownerId) && (
                <IonRow className="ion-justify-content-end">
                  <EditButton label="Item" onClick={() => history.push(`/collections/${collectionId}/items/${itemId}/edit`)} />
                </IonRow>
              )}
            </IonCol>
          </IonRow>
          <ImageCarousel imageUrls={images.map((img) => img.imageUrl)} />
          <IonRow>
            <IonCol size={8}>
              <p>{title}</p>
            </IonCol>
            <IonCol size={4}>
              <IonButton fill="clear" onClick={() => setLiked(!liked)}>
                <IonIcon size="small" slot="icon-only" icon={liked ? heart : heartOutline} />
                <Text color="default">12 likes</Text>
              </IonButton>
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
  );
};

export default Item;
