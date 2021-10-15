import { IonInfiniteScroll, IonInfiniteScrollContent, IonList } from "@ionic/react";
import { useHistory } from "react-router";
import ProfileCollection from "./ProfileCollection";

const CollectionList = (props) => {
  const history = useHistory();
  const { collections, onScrollEnded: fetchNextPage, scrollEnded } = props;

  return (
    <IonList className="profile-collection--list">
      {collections.map((collection, index) => (
        <ProfileCollection collection={collection} key={index} onClick={() => history.push(`/collections/${collection.collectionId}`)} />
      ))}
      <IonInfiniteScroll disabled={scrollEnded} onIonInfinite={fetchNextPage}>
        <IonInfiniteScrollContent className="ion-margin-top" loadingText="Loading..." />
      </IonInfiniteScroll>
    </IonList>
  )
}

export default CollectionList;
