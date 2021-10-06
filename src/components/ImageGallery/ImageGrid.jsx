import {
  IonCol,
  IonGrid,
  IonInfiniteScroll,
  IonInfiniteScrollContent,
  IonRow,
} from "@ionic/react";
import { image } from "ionicons/icons";
import { useEffect, useState } from "react";
import { getItemsByCollectionId } from "../../services/items";
import FlexImage from "../Image/FlexImage"
import "./styles.css";

const groupElementsByThree = (arr) => {
  const groupsOfThree = [];
  var i = 0;
  var group = [];
  for (let elem of arr) {
    if (i === 3) {
      groupsOfThree.push(group);
      group = [];
      i = 0;
    }
    group.push(elem);
    i = i + 1;
  }
  groupsOfThree.push(group);

  return groupsOfThree;
};

const LIMIT = 18;

const ImageGrid = (props) => {
  const { collectionId = 1 } = props;
  const [items, setItems] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [pages, setPages] = useState(-1);

  const loadItems = async () => {
    const nextPage = pages + 1;
    setTimeout(async () => {
      // TODO: Remove this timeout
      try {
        if (!hasMore) {
          return;
        }
        const retrievedItems = await getItemsByCollectionId(
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
    }, 2000);
  };

  const fetchNextPage = () => {
    console.log("load next");
    loadItems();
  };

  useEffect(() => {
    loadItems();
  }, []);

  const groupsOfThree = groupElementsByThree(items);

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
