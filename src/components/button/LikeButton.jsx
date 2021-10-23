import { IonButton, IonIcon } from "@ionic/react";
import { heart, heartOutline } from "ionicons/icons";
import Text from "../text/Text";


const LikeButton = (props) => {
  const { likeHandler, liked, likesCount } = props;

  return (
    <IonButton fill="clear" onClick={likeHandler}>
      <IonIcon
        size="small"
        slot="icon-only"
        icon={liked ? heart : heartOutline}
      />
      <Text color="default">{likesCount} likes</Text>
    </IonButton>
  )
}

export default LikeButton;
