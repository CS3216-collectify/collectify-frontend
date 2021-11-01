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

  const collectionCardOnclick = () => {
    if (props.onClick) {
      return props.onClick();
    }
  };

  const goToFollowersList = (e) => {
    e.stopPropagation();
    history.push(`/collections/${collectionId}/followers`);
  };
  
  const goToDiscoverWithFilter = (e) => {
    e.stopPropagation();

  };

  return (
    <IonList className="profile-collection--container ion-margin-bottom clickable" onClick={() => collectionCardOnclick()}>
      <div className="profile-collection-title--container">
        <Text className="profile-collection--title">
          <b>{collectionName}</b>
        </Text>
      </div>
      <div className="profile-collection--images">
        {coverImages.map((imgUrl, idx) => (
          <IonCol key={idx} size={4}>
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
        <div>
          {categoryName && (
            <IonChip onClick={(e) => goToDiscoverWithFilter(e)}>
              <IonLabel>{categoryName}</IonLabel>
            </IonChip>
          )}
        </div>
        <div className="profile-collection-followers--container clickable" onClick={(e) => goToFollowersList(e)}>
          <IonIcon size="small" icon={peopleOutline} className="followers--icon" />
          <Text size="xs">{followersCount} followers</Text>
        </div>
      </div>
    </IonList>
  );
};

export default CollectionCard;
