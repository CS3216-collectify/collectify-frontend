import { IonButton, IonRadio, IonRadioGroup, IonRow } from "@ionic/react";
import { useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router";
import { trackAddCollectionEvent, trackAddItemEvent } from "../../services/react-ga";
import InfiniteScroll from "../infinite-scroll/InfiniteScroll";
import TextBackground from "../text-background/TextBackground";
import Text from "../text/Text";
import CollectionCard from "./CollectionCard";
import "./SelectCollectionList.scss";

const SelectCollectionList = (props) => {
  const history = useHistory();
  const location = useLocation();

  const [collectionId, setCollectionId] = useState(null);

  const { collections, onScrollEnd: fetchNextPage, listEnded, emptyMessage = "No collections found!" } = props;

  useEffect(() => {
    setCollectionId(null);
  }, [location]);

  if (listEnded && collections && collections.length === 0 && emptyMessage) {
    return (
      <>
        <IonRow className="ion-justify-content-center add-new-collection-text">
          <TextBackground text="You have no collections yet 🥺" size="l" />
        </IonRow>
      </>
    );
  }

  return (
    <>
      <IonRow className="ion-justify-content-center add-new-collection-text">
        <Text className="ion-text-center" size="l">
          Tap on a collection to add an item:
        </Text>
      </IonRow>

      {collections.map((collection, index) => (
        <CollectionCard
          collection={collection}
          key={index}
          onClick={() => {
            trackAddItemEvent();
            history.push(`/collections/${collection.collectionId}/add`);
          }}
        />
      ))}
      <InfiniteScroll onScrollEnd={fetchNextPage} listEnded={listEnded} />
    </>
  );
};

export default SelectCollectionList;
