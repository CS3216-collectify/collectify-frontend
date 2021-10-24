import { IonIcon } from "@ionic/react";
import { heart, heartOutline } from "ionicons/icons";

const LikeButton = (props) => {
  const { onClick: likeHandler, liked, className } = props;

  return <IonIcon size="small" icon={liked ? heart : heartOutline} onClick={likeHandler} color="danger" className={className} />;
};

export default LikeButton;
