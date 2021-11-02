import { IonButton, IonRadio, IonRadioGroup, IonRow } from "@ionic/react";
import { useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router";
import { trackAddCollectionEvent, trackAddItemEvent } from "../../services/react-ga";
import InfiniteScroll from "../infinite-scroll/InfiniteScroll";
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
        <IonRow>
          <IonButton
            className="add-new-collection-button"
            fill="outline"
            onClick={() => {
              trackAddCollectionEvent();
              history.push({ pathname: "/add-collections", state: { redirectToAdd: true } });
            }}
          >
            + Add a new collection
          </IonButton>
        </IonRow>
      </>
    );
  }

  return (
    <>
      {/* <IonRow>
        <IonButton
          className="add-new-item-button"
          fill="solid"
          onClick={() => {
            trackAddItemEvent();
            history.push(`/collections/${collectionId}/add`);
          }}
          disabled={collectionId === null}
        >
          + Add a new item
        </IonButton>
      </IonRow> */}

      <IonRow>
        <IonButton
          className="add-new-collection-button"
          fill="outline"
          onClick={() => history.push({ pathname: "/add-collections", state: { redirectToAdd: true } })}
        >
          + Add a new collection
        </IonButton>
      </IonRow>

      {collections.map((collection, index) => (
        <CollectionCard
          collection={collection}
          key={index}
          onClick={() => {
            trackAddItemEvent();
            history.push(`/collections/${collection.collectionId}/add`);
          }}
          isSelect={true}
        />
      ))}
      <InfiniteScroll onScrollEnd={fetchNextPage} listEnded={listEnded} />
    </>
  );
};

export default SelectCollectionList;
