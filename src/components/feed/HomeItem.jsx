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
import { heart, heartOutline } from "ionicons/icons";
import Text from "../text/Text";
import LikeButton from "../button/LikeButton"
import { convertUTCtoLocal } from "../../utils/datetime";

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
    liked: initLiked,
    likesCount,
    collectionName,
    itemCreationDate,
  } = itemData;

  const { currentUserId } = useUserContext();

  const [liked, setLiked] = useState(initLiked);

  const imageUrls = images.map((img) => img.url);

  const likeHandler = () => {
    // api call to like, if user is authenticated
    setLiked(!liked);
  }

  return (
    <IonGrid fixed>
      <IonRow>
        <Text>
          @{ownerUsername}
        </Text>
      </IonRow>
      <ImageCarousel imageUrls={imageUrls} />
      <IonRow>
        <IonCol size={8}>
          <IonRow>
            <Text>{itemName}</Text>
            <Text size="s">
              {convertUTCtoLocal(itemCreationDate)}
            </Text>
          </IonRow>
        </IonCol>
        <IonCol size={4}>
          <LikeButton liked={liked} likeHandler={likeHandler} likesCount={likesCount} />
        </IonCol>
      </IonRow>
    </IonGrid>
  );
};

export default HomeItem;
