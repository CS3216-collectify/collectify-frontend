import { IonAvatar, IonCol, IonImg, IonItem, IonLabel } from "@ionic/react";

const UserCard = (props) => {
  const { pictureUrl, username } = props;

  return (
    <IonItem>
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
