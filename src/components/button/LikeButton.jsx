import { IonButton, IonIcon } from "@ionic/react";
import { heart, heartOutline } from "ionicons/icons";
import Text from "../text/Text";


const LikeButton = (props) => {
  const { onClick: likeHandler, liked } = props;

  return (
    <IonIcon
      size="small"
      icon={liked ? heart : heartOutline}
      onClick={likeHandler}
      color="danger"
    />
  )
}

export default LikeButton;
