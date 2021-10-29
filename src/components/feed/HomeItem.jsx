import { IonButton, IonCol, IonGrid, IonLabel, IonRow } from "@ionic/react";
import { useState } from "react";
import { useHistory } from "react-router";
import useToastContext from "../../hooks/useToastContext";
import { likeByItemId, unlikeByItemId } from "../../services/likes";
import { convertUTCtoLocal } from "../../utils/datetime";
import LikeButton from "../button/LikeButton";
import ImageCarousel from "../gallery/ImageCarousel";
import Text from "../text/Text";
import "./HomeItem.scss";

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
  } = itemData;

  const [liked, setLiked] = useState(initLiked);
  const [likesCount, setLikesCount] = useState(initLikesCount);

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
            <Text className="clickable" onClick={goToUserProfilePage}><b>@{ownerUsername}</b></Text>
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
          <IonCol>
            <IonRow className="ion-justify-content-between">
              <div className="ion-no-padding" size={9}>
                <Text className="clickable" size="l" onClick={goToItemPage}>
                  <b>{itemName}</b>
                </Text>
              </div>

              <div>
                  <IonCol className="like-button--column" size={1}>
                    <LikeButton className="item-like-button" liked={liked} onClick={likeHandler} />
                  </IonCol>
                  <IonCol size={3} onClick={() => history.push(`/items/${itemId}/likes`)}>
                    <Text className="clickable" color="default">{likesCount} likes</Text>
                  </IonCol>
                </div>
            </IonRow>
            <IonRow className="home-item-date">
              <Text size="xs">{convertUTCtoLocal(itemCreationDate)}</Text>
            </IonRow>
          </IonCol>
        </IonRow>
      </IonGrid>
    </>
  );
};

export default HomeItem;
