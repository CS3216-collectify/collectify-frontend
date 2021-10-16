import { IonInfiniteScroll, IonInfiniteScrollContent, IonList } from "@ionic/react";
import { useHistory } from "react-router";
import InfiniteScroll from "../infinite-scroll/InfiniteScroll";
import ProfileCollection from "./ProfileCollection";

const CollectionList = (props) => {
  const history = useHistory();
  const { collections, onScrollEnd: fetchNextPage, listEnded } = props;

  return (
    <IonList className="profile-collection--list">
      {collections.map((collection, index) => (
        <ProfileCollection collection={collection} key={index} onClick={() => history.push(`/collections/${collection.collectionId}`)} />
      ))}
      <InfiniteScroll onScrollEnd={fetchNextPage} listEnded={listEnded} />
    </IonList>
  )
}

export default CollectionList;
