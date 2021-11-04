import { IonGrid } from "@ionic/react";
import { useHistory } from "react-router";
import { trackViewCollectionEvent } from "../../services/react-ga";
import InfiniteScroll from "../infinite-scroll/InfiniteScroll";
import TextBackground from "../text-background/TextBackground";
import CollectionCard from "./CollectionCard";

const CollectionList = (props) => {
  const history = useHistory();
  const { collections, onScrollEnd: fetchNextPage, listEnded, emptyMessage = "No collections found!" } = props;

  if (listEnded && collections && collections.length === 0 && emptyMessage) {
    return (
      <IonGrid className="ion-text-center">
        <TextBackground size="l" text={emptyMessage} />
      </IonGrid>
    );
  }

  return (
    <>
      {collections.map((collection, index) => (
        <div key={index}>
          <CollectionCard
            collection={collection}
            onClick={() => {
              trackViewCollectionEvent();
              history.push(`/collections/${collection.collectionId}`);
            }}
          />
        </div>
      ))}
      <InfiniteScroll onScrollEnd={fetchNextPage} listEnded={listEnded} />
    </>
  );
};

export default CollectionList;
