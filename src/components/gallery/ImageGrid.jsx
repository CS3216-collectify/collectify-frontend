import { IonCol, IonGrid, IonInfiniteScroll, IonInfiniteScrollContent, IonRow } from "@ionic/react";
import { image } from "ionicons/icons";
import { useEffect, useState, useCallback } from "react";
import { useHistory } from "react-router";
import { getItemsFromCollection } from "../../services/items";
import FlexImage from "../image/FlexImage";
import "./gallery.scss";

const groupElements = (arr, interval) => {
  var groups = [];
  for (var i = 0; i < arr.length; i += interval) {
    groups.push(arr.slice(i, i + interval));
  }
  return groups;
};

const LIMIT = 18;

const ImageGrid = (props) => {
  const history = useHistory();
  const { collectionId = 1 } = props;
  const [items, setItems] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [pages, setPages] = useState(-1);

  const loadItems = useCallback(async () => {
    const nextPage = pages + 1;
    try {
      if (!hasMore) {
        return;
      }
      const retrievedItems = await getItemsFromCollection(collectionId, nextPage * LIMIT, LIMIT);
      if ((retrievedItems && retrievedItems.length < LIMIT) || !retrievedItems) {
        setHasMore(false);
      }
      setItems([...items, ...retrievedItems]);
      setPages(nextPage);
    } catch (e) {
      console.log(e);
    }
  }, [collectionId, hasMore, items, pages]);

  useEffect(() => {
    loadItems();
  }, [loadItems]);
  const { onScrollEnd: fetchNextPage, images, scrollEnded } = props;

  const groupsOfThree = groupElements(images, 3);

  return (
    <IonGrid fixed className="image-grid">
      {groupsOfThree.map((grp, idx) => (
        <IonRow  key={idx}>
          {grp.map((img, idx) => (
            <IonCol key={idx} size={4}>
              <FlexImage src={img.url} onClick={img.clickHandler} />
            </IonCol>
          ))}
        </IonRow>
      ))}
      <IonInfiniteScroll disabled={scrollEnded} onIonInfinite={fetchNextPage}>
        <IonInfiniteScrollContent className="ion-margin-top" loadingText="Loading..."></IonInfiniteScrollContent>
      </IonInfiniteScroll>
    </IonGrid>
  );
};

export default ImageGrid;
