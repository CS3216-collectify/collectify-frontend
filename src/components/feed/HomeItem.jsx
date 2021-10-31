import "./HomeItem.scss";

import { IonButton, IonCol, IonGrid, IonIcon, IonLabel, IonRow } from "@ionic/react";
import { peopleOutline } from "ionicons/icons";
import { useState } from "react";
import { useHistory } from "react-router";

import useToastContext from "../../hooks/useToastContext";
import { likeByItemId, unlikeByItemId } from "../../services/likes";
import { convertUTCtoLocal } from "../../utils/datetime";
import LikeButton from "../button/LikeButton";
import ImageCarousel from "../gallery/ImageCarousel";
import Text from "../text/Text";

const HomeItem = (props) => {
  const history = useHistory();
  const { itemData } = props;
  const {
    itemName,
    itemDescription,
    collectionId,
    itemId,
    ownerId,
    ownerName,
    images,
    ownerUsername,
    isLiked: initLiked,
    likesCount: initLikesCount,
    collectionName,
    itemCreationDate,
    isTradable: initIsTradable,
  } = itemData;

  const [liked, setLiked] = useState(initLiked);
  const [likesCount, setLikesCount] = useState(initLikesCount);
  const [isTradable, setIsTradable] = useState(initIsTradable);

  const setToast = useToastContext();

  const likeHandler = () => {
    // api call to like, if user is authenticated
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
        .catch(() => {
          setToast({ message: "Unable to like item. Please try again later.", color: "danger" });
        });
    }
  };

  const goToItemPage = () => {
    history.push(`/collections/${collectionId}/items/${itemId}`);
  };

  const goToUserProfilePage = () => {
    history.push(`/profile/${ownerUsername}`);
  };

  const goToCollectionPage = () => {
    history.push(`/collections/${collectionId}`);
  };
  return (
    <>
      <IonGrid fixed className="ion-padding">
        <IonRow className="ion-justify-content-between">
          <IonCol>
            <Text className="clickable" onClick={goToUserProfilePage}>
              <b>@{ownerUsername}</b>
            </Text>
          </IonCol>
          <IonButton size="small" onClick={goToCollectionPage} fill="outline">
            <IonLabel>View Collection</IonLabel>
          </IonButton>
        </IonRow>
      </IonGrid>

      <IonGrid fixed className="ion-no-padding">
        <ImageCarousel imageUrls={images.map((i) => i.imageUrl)} />
      </IonGrid>

      <IonGrid fixed className="ion-padding">
        <IonRow>
          <IonCol size={9}>
            <Text className="clickable" size="l" onClick={goToItemPage}>
              <b>{itemName}</b>
            </Text>
          </IonCol>

          <IonCol size={3}>
            <div className="like-button--container"><LikeButton className="item-like-button" liked={liked} onClick={likeHandler} />
            <Text color="default">{likesCount} likes</Text></div>
          </IonCol>
        </IonRow>

        <IonRow>
          <IonCol className="ion-align-items-center">
            <Text size="xs">{convertUTCtoLocal(itemCreationDate)}</Text>
          </IonCol>
          {isTradable && (
            <IonCol className="ion-justify-content-end">
              <div className="home-item-tradable--container">
                <IonIcon size="small" icon={peopleOutline} className="item-tradable-icon" />
                <Text size="s">
                  <b>Tradable</b>
                </Text>
              </div>
            </IonCol>
          )}
        </IonRow>
      </IonGrid>
    </>
  );
};

export default HomeItem;
