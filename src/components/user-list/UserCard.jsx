import { IonAvatar, IonCol, IonImg, IonItem, IonLabel } from "@ionic/react";
import { useHistory } from "react-router";
import noProfileImage from "../../assets/no-profile-image.png";
import { trackViewUserEvent } from "../../services/react-ga";

const UserCard = (props) => {
  const history = useHistory();
  const { pictureUrl, username } = props;

  const clickHandler = () => {
    trackViewUserEvent();
    history.push(`/profile/${username}`);
  };

  return (
    <IonItem className="clickable" onClick={clickHandler}>
      <IonAvatar>
        <IonImg src={pictureUrl || noProfileImage} />
      </IonAvatar>
      <IonCol>
        <IonLabel>@{username}</IonLabel>
      </IonCol>
    </IonItem>
  );
};

export default UserCard;
