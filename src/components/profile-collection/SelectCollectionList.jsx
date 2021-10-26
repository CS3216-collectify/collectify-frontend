import { useState, useEffect } from "react";
import { IonGrid, IonRadioGroup, IonRadio, IonButton, IonRow } from "@ionic/react";
import { useHistory } from "react-router";
import InfiniteScroll from "../infinite-scroll/InfiniteScroll";
import Text from "../text/Text";
import HorizontalLine from "../line/HorizontalLine";
import CollectionCard from "./CollectionCard";
import "./SelectCollectionList.scss";
import { useLocation } from "react-router";

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
      <IonGrid className="ion-text-center">
        <Text size="xl">{emptyMessage}</Text>
      </IonGrid>
    );
  }

  return (
    <>
      <IonRow>
        <IonButton
          className="add-new-collection-button"
          fill="solid"
          onClick={() => history.push(`/collections/${collectionId}/add`)}
          disabled={collectionId === null}
        >
          + Add a new item
        </IonButton>
      </IonRow>

      <IonRow>
        <IonButton
          className="add-new-collection-button"
          fill="outline"
          onClick={() => history.push({ pathname: "/add-collections", state: { redirectToAdd: true } })}
        >
          + Add a new collection
        </IonButton>
      </IonRow>

      <IonRadioGroup className="select-collection-list" value={collectionId} onIonChange={(e) => setCollectionId(e.detail.value)}>
        {collections.map((collection, index) => (
          <div className="radio-collection--container" key={index}>
            <HorizontalLine color="lightgrey" />
            <div className="radio-collection">
              <IonRadio mode="md" className="collection-radio" value={collection.collectionId} />
              <CollectionCard collection={collection} />
            </div>
          </div>
        ))}
        <InfiniteScroll onScrollEnd={fetchNextPage} listEnded={listEnded} />
      </IonRadioGroup>
    </>
  );
};

export default SelectCollectionList;
