import { IonAvatar, IonCol, IonImg, IonItem, IonLabel } from "@ionic/react";

const UserCard = (props) => {
  const { profilePhotoUrl, username } = props;
  return (
    <IonItem>
      <IonAvatar>
        <IonImg src={profilePhotoUrl} />
      </IonAvatar>
      <IonCol>
        <IonLabel>@{username}</IonLabel>
      </IonCol>
    </IonItem>
  )
};

export default UserCard;
