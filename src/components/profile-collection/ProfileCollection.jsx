import {
  IonImg,
  IonText,
  IonIcon,
  IonChip,
  IonList,
  IonLabel,
} from "@ionic/react";
import { peopleOutline } from "ionicons/icons";

import "./ProfileCollection.scss";

const ProfileCollection = (props) => {
  const { collection } = props;
  const { collectionName, collectionDescription, categoryName, coverImages } =
    collection;

  return (
    <IonList className="profile-collection--container ion-margin-vertical">
      <div className="profile-collection-title--container">
        <IonText className="profile-collection--title">
          {collectionName}
        </IonText>
        <div className="profile-collection-followers--container">
          <IonIcon
            size="small"
            icon={peopleOutline}
            className="followers--icon"
          />
          20 followers
        </div>
      </div>
      <div className="profile-collection--images">
        {coverImages.map((imgUrl, idx) => (
          <IonImg
            className="profile-collection--image"
            src={imgUrl}
            key={idx}
          />
        ))}
      </div>
      <div>
        <IonText className="profile-collection--desc">
          {collectionDescription}
        </IonText>
      </div>
      <div className="profile-collection-categories--container">
        {/* A collection only has a single category */}
        <IonChip>
          <IonLabel>{categoryName}</IonLabel>
        </IonChip>
      </div>
    </IonList>
  );
};

export default ProfileCollection;
