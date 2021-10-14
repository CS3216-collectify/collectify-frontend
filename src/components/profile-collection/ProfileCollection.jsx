import { IonCol, IonText, IonIcon, IonChip, IonList, IonLabel } from "@ionic/react";
import { useHistory } from "react-router";
import { peopleOutline } from "ionicons/icons";

import "./ProfileCollection.scss";
import FlexImage from "../image/FlexImage";

const ProfileCollection = (props) => {
  const { collection } = props;
  const { collectionId, collectionName, collectionDescription, categoryName, coverImages } = collection;
  const history = useHistory();
  console.log(collection);
  return (
    <IonList className="profile-collection--container ion-margin-vertical" onClick={() => history.push("/collections/" + collectionId)}>
      <div className="profile-collection-title--container">
        <IonText className="profile-collection--title">{collectionName}</IonText>
        <div className="profile-collection-followers--container">
          <IonIcon size="small" icon={peopleOutline} className="followers--icon" />
          20 followers
        </div>
      </div>
      <div className="profile-collection--images">
        {coverImages.map((imgUrl, idx) => (
          <IonCol key={idx} size={4}>
            {/* TODO: add default error one */}
            <FlexImage src={imgUrl} />
          </IonCol>
        ))}

        {coverImages.length === 0 && <IonText className="profile-collection-empty-images">No images added for this collection.</IonText>}
      </div>
      <div>
        <IonText className="profile-collection--desc">{collectionDescription}</IonText>
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
