import {
  IonButton,
  IonCol,
  IonGrid,
  IonIcon,
  IonRow,
} from "@ionic/react";
import { useState } from "react";
import { useHistory } from "react-router";
import useUserContext from "../../hooks/useUserContext";
import ImageCarousel from "../gallery/ImageCarousel";
import Text from "../text/Text";
import LikeButton from "../button/LikeButton";
import { convertUTCtoLocal } from "../../utils/datetime";
import { likeByItemId, unlikeByItemId } from "../../services/likes";
import useToastContext from "../../hooks/useToastContext";

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
    coverImage,
    ownerUsername,
    liked: initLiked,
    likesCount: initLikesCount,
    collectionName,
    itemCreationDate,
  } = itemData;

  const { currentUserId } = useUserContext();

  const [liked, setLiked] = useState(initLiked);
  const [likesCount, setLikesCount] = useState(initLikesCount);

  const imageUrls = [coverImage];
  const setToast = useToastContext();

  // TODO: Use the bottom one once images is implemented
  // const imageUrls = images.map((img) => img.url);

  const likeHandler = () => {
    // api call to like, if user is authenticated
    if (liked) {
      unlikeByItemId(itemId)
        .then(() => {
          setLiked(false);
          setLikesCount(likesCount - 1);
        })
        .catch((e) => {
          setToast({ message: "Unable to like item. Please try again later.", color: "danger" });
        })
    } else {
      likeByItemId(itemId).then(() => {
        setLiked(true);
        setLikesCount(likesCount + 1);
      }).catch(() => {
        setToast({ message: "Unable to unlike item. Please try again later.", color: "danger" });
      })
    }
  }

  const goToItemPage = () => {
    history.push(`/collections/${collectionId}/items/${itemId}`);
  }

  const goToUserProfilePage = () => {
    history.push(`/profile/${ownerUsername}`);
  }

  return (
    <IonGrid fixed>
      <IonRow>
        <Text onClick={goToUserProfilePage}>
          @{ownerUsername}
        </Text>
      </IonRow>
      <ImageCarousel imageUrls={imageUrls} />
      <IonRow>
        <IonCol size={8}>
          <IonRow>
            <Text size="l" onClick={goToItemPage}>
              {itemName}
            </Text>
          </IonRow>
          <IonRow>
            <Text size="s">
              {convertUTCtoLocal(itemCreationDate)}
            </Text>
          </IonRow>
        </IonCol>
        <IonCol size={1}>
          <LikeButton liked={liked} likeHandler={likeHandler} />
        </IonCol>
        <IonCol size={3}>
          <Text color="default">{likesCount} likes</Text>
        </IonCol>
      </IonRow>
    </IonGrid>
  );
};

export default HomeItem;
