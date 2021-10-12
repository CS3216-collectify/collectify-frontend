import { IonImg, IonText, IonIcon, IonChip, IonList, IonLabel } from "@ionic/react";
import { peopleOutline } from "ionicons/icons";

import "./ProfileCollection.scss";

const ProfileCollection = () => {
  return (
    <IonList className="profile-collection--container ion-margin-vertical">
      <div className="profile-collection-title--container">
        <IonText className="profile-collection--title">
          <b>Title</b>
        </IonText>
        <div className="profile-collection-followers--container ion-justify-content-center">
          <IonIcon size="small" icon={peopleOutline} className="followers--icon" />
          20 followers
        </div>
      </div>

      <div className="profile-collection--images">
        <IonImg
          className="profile-collection--image"
          src="https://cdn.vox-cdn.com/thumbor/eFEHo8eygHajtwShwT9e_jf7c-c=/0x0:1920x1080/1200x800/filters:focal(722x227:1028x533)/cdn.vox-cdn.com/uploads/chorus_image/image/69323002/Screen_Shot_2021_05_21_at_9.54.00_AM.0.jpeg"
        />

        <IonImg
          className="profile-collection--image"
          src="https://cdn.vox-cdn.com/thumbor/eFEHo8eygHajtwShwT9e_jf7c-c=/0x0:1920x1080/1200x800/filters:focal(722x227:1028x533)/cdn.vox-cdn.com/uploads/chorus_image/image/69323002/Screen_Shot_2021_05_21_at_9.54.00_AM.0.jpeg"
        />

        <IonImg
          className="profile-collection--image"
          src="https://cdn.vox-cdn.com/thumbor/eFEHo8eygHajtwShwT9e_jf7c-c=/0x0:1920x1080/1200x800/filters:focal(722x227:1028x533)/cdn.vox-cdn.com/uploads/chorus_image/image/69323002/Screen_Shot_2021_05_21_at_9.54.00_AM.0.jpeg"
        />
      </div>

      <div>
        <IonText className="profile-collection--desc">Description</IonText>
      </div>

      <div className="profile-collection-categories--container">
        <IonChip>
          <IonLabel>Keyboard</IonLabel>
        </IonChip>
        <IonChip>
          <IonLabel>Keyboard</IonLabel>
        </IonChip>
        <IonChip>
          <IonLabel>Keyboard</IonLabel>
        </IonChip>
      </div>
    </IonList>
  );
};

export default ProfileCollection;
