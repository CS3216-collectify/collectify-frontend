import { IonButton, IonCol, IonContent, IonGrid, IonIcon, IonLabel, IonPage, IonRow } from "@ionic/react";
import { chatbubbleEllipsesOutline, peopleOutline } from "ionicons/icons";
import { useCallback, useEffect, useState } from "react";
import { useHistory, useLocation, useParams } from "react-router";
import EditButton from "../../components/button/EditButton";
import LikeButton from "../../components/button/LikeButton";
import ImageCarousel from "../../components/gallery/ImageCarousel";
import Text from "../../components/text/Text";
import AppToolbar from "../../components/toolbar/AppToolbar";
import useToastContext from "../../hooks/useToastContext";
import useUserContext from "../../hooks/useUserContext";
import { getItemFromCollection } from "../../services/items";
import { likeByItemId, unlikeByItemId } from "../../services/likes";
import {
  trackEditItemEvent,
  trackItemChatEvent,
  trackPageView,
  trackViewCollectionEvent,
  trackViewItemLikesEvent,
  trackViewItemOwnerEvent
} from "../../services/react-ga";
import { convertUTCtoLocal } from "../../utils/datetime";
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
  const [isTradable, setIsTradable] = useState("");

  useEffect(() => {
    trackPageView(window.location.pathname);
  }, []);

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
  }, [collectionId, itemId, setToast]);

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
    trackEditItemEvent();
    history.push({
      pathname,
      state,
    });
  };

  const goToCollectionPage = () => {
    trackViewCollectionEvent();
    history.push(`/collections/${collectionId}`);
  };

  const goToLikesPage = () => {
    trackViewItemLikesEvent();
    history.push(`/items/${itemId}/likes`);
  };

  const goToUserProfilePage = () => {
    trackViewItemOwnerEvent();
    history.push(`/profile/${ownerUsername}`);
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
    trackItemChatEvent();
    history.push({ pathname, state });
  };

  return (
    <IonPage className="item">
      <AppToolbar title={`Item`} />
      <IonContent>
        <IonGrid fixed className="ion-padding">
          <IonRow>
            <IonCol className="item-username">
              <Text className="clickable" onClick={() => goToUserProfilePage()}>
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
              <div className="like-button--container">
                <LikeButton className="item-like-button" liked={liked} onClick={likeHandler} />
                <Text className="clickable" color="default" onClick={goToLikesPage}>
                  {likesCount} likes
                </Text>
              </div>
            </IonCol>
          </IonRow>

          <IonRow>
            <IonCol>
              <Text>{itemDescription}</Text>
            </IonCol>
          </IonRow>

          <IonRow>
            <IonCol className="zz" size={9}>
              {isTradable && (
                <div className="tradable--container">
                  <IonIcon size="small" icon={peopleOutline} className="item-tradable-icon" />
                  <Text size="s">
                    <b>Tradable</b>
                  </Text>
                </div>
              )}
              <Text size="xs">{convertUTCtoLocal(itemCreationDate)}</Text>
            </IonCol>

            {!isItemOwner && (
              <IonCol size={3}>
                <IonButton size="small" onClick={() => openChatWithItem()} className="item-chat-button--container">
                  <IonIcon icon={chatbubbleEllipsesOutline} className="item-chat-icon" />
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
