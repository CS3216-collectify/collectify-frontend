import { IonGrid, IonRow, IonCol, IonContent, IonPage, IonLoading, IonButton, IonLabel, IonIcon } from "@ionic/react";
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
import { chatbubblesOutline, peopleOutline } from "ionicons/icons";

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
  const [isTradable, setIsTradable] = useState("");

  const fetchItemData = useCallback(async () => {
    setLoading(true);
    try {
      const itemData = await getItemFromCollection(collectionId, itemId);
      const { itemName, itemDescription, images, ownerId, likesCount, itemCreationDate, ownerUsername, isLiked, isTradable } = itemData;
      setItemName(itemName);
      setItemDescription(itemDescription);
      setImages(images);
      setOwnerId(ownerId);
      setLikesCount(likesCount);
      setItemCreationDate(itemCreationDate);
      setOwnerUsername(ownerUsername);
      setLiked(isLiked);
      setIsTradable(isTradable);
      setLoading(false);
    } catch (e) {
      setToast({ message: "Failed to load item. Please try again later.", color: "danger" });
    }
  }, [collectionId, itemId]);

  useEffect(() => {
    if (location.pathname.startsWith(`/collections/${collectionId}/items/${itemId}`)) {
      setLoading(true);
      fetchItemData();
    }
  }, [collectionId, fetchItemData, itemId, location]);

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
    const item = { itemName, itemDescription, images: _images, isTradable };
    const state = { item };
    history.push({
      pathname,
      state,
    });
  };

  const goToCollectionPage = () => {
    history.push(`/collections/${collectionId}`);
  };

  const openChatWithItem = () => {
    const pathname = "/chat";
    const state = {
      recipient: ownerId.toString(),
      chatItem: {
        name: itemName,
        link: `/collections/${collectionId}/items/${itemId}`,
        imageUrl: images[0].imageUrl,
        ownerId: ownerId.toString(),
      },
    };
    history.push({ pathname, state });
  };

  return (
    <IonPage className="item">
      <HomeToolbar title={`Item`} />
      <IonContent>
        <IonGrid fixed className="ion-padding">
          <IonRow>
            <IonCol className="item-username">
              <Text className="clickable" onClick={() => history.push(`/profile/${ownerUsername}`)}>
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
            <IonCol size={9}>
              <Text size="l">
                <b>{itemName}</b>
              </Text>
            </IonCol>

            <IonCol size={3}>
              <LikeButton className="item-like-button" liked={liked} onClick={likeHandler} />
              <Text color="default">{likesCount} likes</Text>
            </IonCol>
          </IonRow>

          <IonRow>
            <IonCol size={9}>
              <Text>{itemDescription}</Text>
            </IonCol>
            {isTradable && (
              <IonCol size={3} className="item-tradable">
                <div className="tradable--container">
                  <IonIcon size="small" icon={peopleOutline} className="item-tradable-icon" />
                  <Text size="s">
                    <b>Tradable</b>
                  </Text>
                </div>
              </IonCol>
            )}
          </IonRow>

          <IonRow>
            <IonCol className="ion-align-items-center" size={9}>
              <Text size="xs">{convertUTCtoLocal(itemCreationDate)}</Text>
            </IonCol>
            {!isItemOwner && (
              <IonCol size={3}>
                <IonButton size="small" onClick={() => openChatWithItem()}>
                  <IonIcon icon={chatbubblesOutline} className="item-chat-icon" />
                  <IonLabel>Chat</IonLabel>
                </IonButton>
              </IonCol>
            )}
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default Item;
