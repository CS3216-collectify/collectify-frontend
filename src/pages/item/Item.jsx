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
import LikeButton from "../../components/button/LikeButton";
import { convertUTCtoLocal } from "../../utils/datetime";
import { likeByItemId, unlikeByItemId } from "../../services/likes";
import useToastContext from "../../hooks/useToastContext";

const Item = () => {
  const history = useHistory();
  const location = useLocation();
  const { collectionId, itemId } = useParams();
  const { currentUserId } = useUserContext();
  const setToast = useToastContext();

  const [title, setTitle] = useState("Test Title");
  const [ownerUsername, setOwnerUsername] = useState("itemOwner");
  const [ownerId, setOwnerId] = useState(null);
  const [description, setDescription] = useState("Test Description...");
  const [loading, setLoading] = useState(false);
  const [images, setImages] = useState([]);
  const [liked, setLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(0);
  const [itemCreationDate, setItemCreationDate] = useState("")

  const fetchItemData = useCallback(async () => {
    setLoading(true);
    try {
      const item = await getItemFromCollection(collectionId, itemId);
      setTitle(item.itemName);
      setDescription(item.itemDescription);
      setImages(item.images);
      setOwnerId(item.ownerId);
      setLikesCount(item.likesCount);
      setItemCreationDate(item.itemCreationDate);
      setOwnerUsername(item.ownerUsername);
      setLiked(item.isLiked)
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

  const likeHandler = () => {
    // api call to like, if user is authenticated
    if (liked) {
      unlikeByItemId(itemId)
        .then(() => {
          setLiked(false);
          setLikesCount(likesCount-1);
        })
        .catch((e) => {
          setToast({ message: "Unable to unlike item. Please try again later.", color: "danger" });
        })
    } else {
      likeByItemId(itemId).then(() => {
        setLiked(true);
        setLikesCount(likesCount+1);
      }).catch(() => {
        setToast({ message: "Unable to like item. Please try again later.", color: "danger" });
      })
    }
  }

  const isItemOwner = Number(currentUserId) === Number(ownerId);

  return (
    <IonPage className="profile">
      <IonLoading isOpen={loading} spinner="crescent" />
      <HomeToolbar title={`Item`} />
      <IonContent className="ion-padding">
        <IonGrid fixed>
          <IonRow>
            <IonCol>
              <Text>
              @{ownerUsername}
              </Text>
            </IonCol>
            <IonCol>
              {isItemOwner && (
                <IonRow className="ion-justify-content-end">
                  <EditButton label="Item" onClick={() => history.push(`/collections/${collectionId}/items/${itemId}/edit`)} />
                </IonRow>
              )}
            </IonCol>
          </IonRow>
          <ImageCarousel imageUrls={images.map((img) => img.imageUrl)} />
          <IonRow>
            <IonCol size={8}>
              <IonRow>
                <Text size="l">{title}</Text>
              </IonRow>
              <IonRow>
                <Text size="s">
                  {convertUTCtoLocal(itemCreationDate)}
                </Text>
              </IonRow>
            </IonCol>
            <IonCol size={1} >
              <LikeButton liked={liked} onClick={likeHandler} />
            </IonCol>
            <IonCol size={3} onClick={() => history.push(`/items/${itemId}/likes`)}>
              <Text color="default">{likesCount} likes</Text>
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
