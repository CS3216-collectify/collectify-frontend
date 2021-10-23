import { IonCol, IonIcon, IonChip, IonList, IonLabel } from "@ionic/react";
import { useHistory } from "react-router";
import { peopleOutline } from "ionicons/icons";

import "./CollectionCard.scss";
import FlexImage from "../image/FlexImage";
import Text from "../text/Text";
const CollectionCard = (props) => {
  const { collection } = props;
  const { collectionId, collectionName, collectionDescription, categoryName, coverImages, followersCount = 29 } = collection;
  const history = useHistory();

  return (
    <IonList className="profile-collection--container ion-margin-vertical" onClick={() => history.push("/collections/" + collectionId)}>
      <div className="profile-collection-title--container">
        <Text className="profile-collection--title">{collectionName}</Text>
        <div className="profile-collection-followers--container">
          <IonIcon size="small" icon={peopleOutline} className="followers--icon" />
          <Text size="xs">{followersCount} followers</Text>
        </div>
      </div>
      <div className="profile-collection--images">
        {coverImages.map((imgUrl, idx) => (
          <IonCol key={idx} size={4}>
            {/* TODO: add default error one */}
            <FlexImage src={imgUrl} />
          </IonCol>
        ))}
        {coverImages.length === 0 && (
          <Text size="xs" className="profile-collection-empty-images">
            This collection is empty.
          </Text>
        )}
      </div>
      <div>
        <Text size="s" className="profile-collection--desc">
          {collectionDescription}
        </Text>
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

export default CollectionCard;
