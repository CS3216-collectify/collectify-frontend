import { IonChip, IonCol, IonIcon, IonLabel, IonList } from "@ionic/react";
import { peopleOutline } from "ionicons/icons";
import { useHistory } from "react-router";
import FlexImage from "../image/FlexImage";
import Text from "../text/Text";
import "./CollectionCard.scss";

const CollectionCard = (props) => {
  const { collection, disableChip = false } = props;
  const { collectionId, collectionName, categoryId, collectionDescription, categoryName, coverImages, followersCount } = collection;
  const history = useHistory();

  const collectionCardOnclick = () => {
    if (props.onClick) {
      return props.onClick();
    }
  };

  const goToFollowersList = (e) => {
    e.stopPropagation();
    console.log(e);
    history.push(`/collections/${collectionId}/followers`);
  };

  const goToDiscoverWithFilter = (e) => {
    e.stopPropagation();
    history.push({ pathname: `/discover`, state: { category: categoryId } });
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
            // <IonChip className={`${disableChip ? 'no-pointer' : ''}`} onClick={(e) => goToDiscoverWithFilter(e)}>
            <IonChip className="no-pointer" onClick={(e) => goToDiscoverWithFilter(e)}>
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
