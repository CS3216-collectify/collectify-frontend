import {
  IonCol,
  IonGrid,
  IonInfiniteScroll,
  IonInfiniteScrollContent,
  IonRow,
} from "@ionic/react";
import { image } from "ionicons/icons";
import { useEffect, useState } from "react";
import { getItemsByCollectionId, getItemsFromCollection } from "../../services/items";
import FlexImage from "../image/FlexImage"
import "./gallery.scss";

const groupElements = (arr, interval) => {
  var groups = [];
  for (var i = 0; i < arr.length; i += interval) {
    groups.push(arr.slice(i, i + interval));
  }
  return groups;
}

const LIMIT = 18;

const ImageGrid = (props) => {
  const { collectionId = 1 } = props;
  const [items, setItems] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [pages, setPages] = useState(-1);

  const loadItems = async () => {
    const nextPage = pages + 1;
    try {
      if (!hasMore) {
        return;
      }
      const retrievedItems = await getItemsFromCollection(
        collectionId,
        nextPage * LIMIT,
        LIMIT
      );
      console.log(retrievedItems);
      if (
        (retrievedItems && retrievedItems.length < LIMIT) ||
        !retrievedItems
      ) {
        setHasMore(false);
      }
      setItems([...items, ...retrievedItems]);
      setPages(nextPage);
    } catch (e) {
      console.log(e);
    }
  };

  const fetchNextPage = () => {
    console.log("load next");
    loadItems();
  };

  useEffect(() => {
    loadItems();
  }, []);

  const groupsOfThree = groupElements(items, 3);

  return (
    <IonGrid className="image-grid">
      {groupsOfThree.map((grp, idx) => (
        <IonRow className="single-row-3" size={12} key={idx}>
          {grp.map((item, idx) => (
            <IonCol key={idx} className="single-image-3"  size={4}>
              <FlexImage src={item.coverImage.url} />
            </IonCol>
          ))}
        </IonRow>
      ))}
      <IonInfiniteScroll
        disabled={!hasMore}
        onIonInfinite={fetchNextPage}
      >
        <IonInfiniteScrollContent className="ion-margin-top" loadingText="Loading..."></IonInfiniteScrollContent>
      </IonInfiniteScroll>
    </IonGrid>
  );
};

export default ImageGrid;
