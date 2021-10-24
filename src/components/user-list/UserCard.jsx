import { IonAvatar, IonCol, IonImg, IonItem, IonLabel } from "@ionic/react";
import { useHistory } from "react-router";

const UserCard = (props) => {
  const history = useHistory();
  const { pictureUrl, username } = props;

  const clickHandler = () => {
    history.push(`/profile/${username}`);
  }

  return (
    <IonItem onClick={clickHandler}>
      <IonAvatar>
        <IonImg src={pictureUrl} />
      </IonAvatar>
      <IonCol>
        <IonLabel>@{username}</IonLabel>
      </IonCol>
    </IonItem>
  )
};

export default UserCard;
