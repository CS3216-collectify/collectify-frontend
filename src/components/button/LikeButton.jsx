import { IonIcon } from "@ionic/react";
import { heart, heartOutline } from "ionicons/icons";
import { trackItemLikeEvent, trackItemUnlikeEvent } from "../../services/react-ga";

const LikeButton = (props) => {
  const { onClick: likeHandler, liked, className } = props;

  return (
    <IonIcon
      size="small"
      icon={liked ? heart : heartOutline}
      onClick={() => {
        liked ? trackItemUnlikeEvent() : trackItemLikeEvent();
        likeHandler();
      }}
      color="danger"
      className={`${className} clickable like-button-icon`}
    />
  );
};

export default LikeButton;
