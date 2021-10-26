import React, { useCallback, useEffect, useState } from "react";
import { useHistory } from "react-router";
import { IonGrid, IonLoading, IonRow, IonButton, IonLabel } from "@ionic/react";

import "./Feed.scss";
import HomeItem from "./HomeItem";
import InfiniteScroll from "../infinite-scroll/InfiniteScroll";
import { getFeedItems } from "../../services/feed";
import HorizontalLine from "../line/HorizontalLine";
import Text from "../text/Text";
import { ReactComponent as FollowCollections } from "../../assets/follow-collections.svg";

const LIMIT = 6;

const Feed = (props) => {
  const history = useHistory();
  const [items, setItems] = useState([]);
  const [pages, setPages] = useState(-1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);

  const loadItems = useCallback(async () => {
    if (!hasMore) {
      return;
    }
    const nextPage = pages + 1;
    try {
      const retrievedItems = await getFeedItems(nextPage * LIMIT, LIMIT);
      const updatedHasMore = retrievedItems && retrievedItems.length >= LIMIT;
      setItems([...items, ...retrievedItems]);
      setPages(nextPage);
      setHasMore(updatedHasMore);
    } catch (e) {
      console.log(e);
    }
  }, [hasMore, items, pages]);

  const loadInitialItems = useCallback(async () => {
    const nextPage = 0;
    try {
      setLoading(true);
      const retrievedItems = await getFeedItems(nextPage * LIMIT, LIMIT);
      const updatedHasMore = retrievedItems && retrievedItems.length >= LIMIT;
      setItems(retrievedItems);
      setPages(nextPage);
      setHasMore(updatedHasMore);
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadInitialItems();
  }, [loadInitialItems]);

  const fetchNextPage = () => {
    loadItems();
  };

  return (
    <>
      <IonLoading isOpen={loading} />
      {items &&
        items.length > 0 &&
        items.map((item, idx) => (
          <React.Fragment key={idx}>
            <HomeItem itemData={item} />
            <HorizontalLine color="lightgrey" />
          </React.Fragment>
        ))}
      {((items && items.length === 0) || !items) && !hasMore && (
        <div className="ion-text-center ion-padding">
          <Text size="xl">Start following some collections to stay updated!</Text>
          <IonGrid fixed>
            <IonRow className="ion-justify-content-center ion-margin-top">
              <IonButton size="small" fill="solid" className="discover-button" onClick={() => history.push("/discover")}>
                <IonLabel>Discover collections</IonLabel>
              </IonButton>
              <FollowCollections />
            </IonRow>
          </IonGrid>
        </div>
      )}
      <InfiniteScroll listEnded={!hasMore} onScrollEnd={fetchNextPage} />
    </>
  );
};

export default Feed;
