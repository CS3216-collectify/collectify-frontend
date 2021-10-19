import {
  IonButton,
  IonCol,
  IonGrid,
  IonIcon,
  IonRow,
  IonText,
} from "@ionic/react";
import { useState } from "react";
import { useHistory } from "react-router";
import useUserContext from "../../hooks/useUserContext";
import ImageCarousel from "../gallery/ImageCarousel";
import { heart, heartOutline } from "ionicons/icons";

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
        <IonCol>
          <IonText>
            @{ownerUsername} ({ownerName})
          </IonText>
        </IonCol>
      </IonRow>
      <ImageCarousel imageUrls={imageUrls} />
      <IonRow>
        <IonCol size={8}>
          <p>{itemName}</p>
        </IonCol>
        <IonCol size={4}>
          <IonButton fill="clear" onClick={likeHandler}>
            <IonIcon
              size="small"
              slot="icon-only"
              icon={liked ? heart : heartOutline}
            />
            {/* <IonIcon size="small" slot="icon-only" icon={liked ? heart : heartOutline} /> */}
            <IonText color="default">{likesCount} likes</IonText>
          </IonButton>
        </IonCol>
      </IonRow>
      <IonRow>
        <IonCol>
          <p>{itemDescription}</p>
        </IonCol>
      </IonRow>
    </IonGrid>
  );
};

export default HomeItem;
