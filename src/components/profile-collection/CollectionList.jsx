import { IonGrid } from "@ionic/react";
import { useHistory } from "react-router";
import InfiniteScroll from "../infinite-scroll/InfiniteScroll";
import Text from "../text/Text";
import HorizontalLine from "../line/HorizontalLine";
import CollectionCard from "./CollectionCard";

const CollectionList = (props) => {
  const history = useHistory();
  const { collections, onScrollEnd: fetchNextPage, listEnded, emptyMessage = "No collections found!" } = props;

  if (listEnded && collections && collections.length === 0 && emptyMessage) {
    return (
      <IonGrid className="ion-text-center">
        <Text size="xl">{emptyMessage}</Text>
      </IonGrid>
    );
  }

  return (
    <>
      {collections.map((collection, index) => (
        <div key={index}>
          <HorizontalLine color="lightgrey" />
          <CollectionCard collection={collection} onClick={() => history.push(`/collections/${collection.collectionId}`)} />
        </div>
      ))}
      <InfiniteScroll onScrollEnd={fetchNextPage} listEnded={listEnded} />
    </>
  );
};

export default CollectionList;
