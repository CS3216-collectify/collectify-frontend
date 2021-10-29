import { IonGrid, IonRow, IonCol, IonContent, IonPage, IonLoading, IonButton, IonLabel } from "@ionic/react";
import { useEffect, useState, useCallback } from "react";
import { useHistory, useParams, useLocation } from "react-router";
import EditButton from "../../components/button/EditButton";
import ImageCarousel from "../../components/gallery/ImageCarousel";
import HomeToolbar from "../../components/toolbar/HomeToolbar";
import { getItemFromCollection } from "../../services/items";
import useUserContext from "../../hooks/useUserContext";
import Text from "../../components/text/Text";
import LikeButton from "../../components/button/LikeButton";
import { convertUTCtoLocal } from "../../utils/datetime";
import { likeByItemId, unlikeByItemId } from "../../services/likes";
import useToastContext from "../../hooks/useToastContext";
import "./Item.scss";

const Item = () => {
  const history = useHistory();
  const location = useLocation();
  const { collectionId, itemId } = useParams();
  const { isCurrentUser, isUserAuthenticated } = useUserContext();
  const setToast = useToastContext();

  const [itemName, setItemName] = useState("");
  const [ownerUsername, setOwnerUsername] = useState("");
  const [ownerId, setOwnerId] = useState(null);
  const [itemDescription, setItemDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [images, setImages] = useState([]);
  const [liked, setLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(0);
  const [itemCreationDate, setItemCreationDate] = useState("");

  const fetchItemData = useCallback(async () => {
    setLoading(true);
    try {
      const itemData = await getItemFromCollection(collectionId, itemId);
      const { itemName, itemDescription, images, ownerId, likesCount, itemCreationDate, ownerUsername, isLiked } = itemData;
      setItemName(itemName);
      setItemDescription(itemDescription);
      setImages(images);
      setOwnerId(ownerId);
      setLikesCount(likesCount);
      setItemCreationDate(itemCreationDate);
      setOwnerUsername(ownerUsername);
      setLiked(isLiked);
      setLoading(false);
    } catch (e) {
      console.log(e);
    } finally {
    }
  }, [collectionId, itemId]);

  useEffect(() => {
    if (location.pathname.startsWith(`/collections/${collectionId}/items/${itemId}`)) {
      setLoading(true);
      fetchItemData();
    }
  }, [fetchItemData, location]);

  const likeHandler = () => {
    // api call to like, if user is authenticated
    if (!isUserAuthenticated) {
      setToast({ message: "Please log in to like an item", color: "danger" });
      return;
    }

    if (liked) {
      unlikeByItemId(itemId)
        .then(() => {
          setLiked(false);
          setLikesCount(likesCount - 1);
        })
        .catch((e) => {
          setToast({ message: "Unable to unlike item. Please try again later.", color: "danger" });
        });
    } else {
      likeByItemId(itemId)
        .then(() => {
          setLiked(true);
          setLikesCount(likesCount + 1);
        })
        .catch((e) => {
          setToast({ message: "Unable to like item. Please try again later.", color: "danger" });
        });
    }
  };

  const isItemOwner = isCurrentUser(ownerId);

  const editPageRedirect = () => {
    const pathname = `/collections/${collectionId}/items/${itemId}/edit`;
    const _images = images.map((img) => ({ ...img })); // deep copy
    const item = { itemName, itemDescription, images: _images };
    const state = { item };
    history.push({
      pathname,
      state,
    });
  };

  const goToCollectionPage = () => {
    history.push(`/collections/${collectionId}`);
  };

  return (
    <IonPage className="item">
      <HomeToolbar title={`Item`} />
      <IonContent>
        <IonGrid fixed className="ion-padding">
          <IonRow>
            <IonCol className="item-username">
              <Text onClick={() => history.push(`/profile/${ownerUsername}`)}>
                <b>@{ownerUsername}</b>
              </Text>
            </IonCol>
            <IonCol>
              {isItemOwner && (
                <IonRow className="ion-justify-content-end">
                  <EditButton label="Item" onClick={editPageRedirect} fill="outline" />
                </IonRow>
              )}
              {!isItemOwner && (
                <IonRow className="ion-justify-content-end">
                  <IonButton size="small" onClick={goToCollectionPage} fill="outline">
                    <IonLabel>View Collection</IonLabel>
                  </IonButton>
                </IonRow>
              )}
            </IonCol>
          </IonRow>
        </IonGrid>

        <IonGrid fixed className="ion-no-padding">
          <ImageCarousel imageUrls={images.map((img) => img.imageUrl)} />
        </IonGrid>

        <IonGrid fixed className="ion-padding">
          <IonRow>
            <IonCol>
              <IonRow className="item-title-likes--container">
                <div>
                  <Text size="l">
                    <b>{itemName}</b>
                  </Text>
                </div>
                <div>
                  <IonCol className="like-button--column" size={1}>
                    <LikeButton className="item-like-button" liked={liked} onClick={likeHandler} />
                  </IonCol>
                  <IonCol size={3} onClick={() => history.push(`/items/${itemId}/likes`)}>
                    <Text color="default">{likesCount} likes</Text>
                  </IonCol>
                </div>
              </IonRow>

              <IonRow>
                <Text>{itemDescription}</Text>
              </IonRow>
            </IonCol>
          </IonRow>

          <IonRow>
            <IonCol className="ion-text-left">
              <Text size="xs">{convertUTCtoLocal(itemCreationDate)}</Text>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default Item;
