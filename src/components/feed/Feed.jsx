import HomeItem from "./HomeItem";
import InfiniteScroll from "../infinite-scroll/InfiniteScroll";
import React, { useCallback, useEffect, useState } from "react";
import { getFeed } from "../../services/feed";
import { IonLoading } from "@ionic/react";
import HorizontalLine from "../line/HorizontalLine";

const LIMIT = 6;

const Feed = (props) => {

  const { userId } = props;
  const [items, setItems] = useState([]);
  const [pages, setPages] = useState(-1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);

  const loadItems = useCallback(async () => {
    if (!hasMore || !userId) {
      return;
    }
    const nextPage = pages + 1;
    try {
      const retrievedItems = await getFeed(userId, nextPage * LIMIT, LIMIT);
      const updatedHasMore = retrievedItems && retrievedItems.length >= LIMIT;
      setItems([...items, ...retrievedItems]);
      setPages(nextPage);
      setHasMore(updatedHasMore);
    } catch (e) {
      console.log(e);
    }
  }, [hasMore, items, pages, userId]);

  const loadInitialItems = useCallback(async () => {
    if (!userId) {
      return;
    }
    const nextPage = 0;
    try {
      setLoading(true);
      const retrievedItems = await getFeed(userId, nextPage * LIMIT, LIMIT);
      const updatedHasMore = retrievedItems && retrievedItems.length >= LIMIT;
      setItems([...retrievedItems]);
      setPages(nextPage);
      setHasMore(updatedHasMore);
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  }, [userId]);

  useEffect(() => {
    if (props.userId) {
      loadInitialItems();
    }
  }, [props.userId]);

  const fetchNextPage = () => {
    console.log("load next");
    loadItems();
  };

  return (
    <>
      <IonLoading isOpen={loading} />
      {items.map((item, idx) =>
        <React.Fragment key={idx}>
          <HomeItem itemData={item} />
          <HorizontalLine />
        </React.Fragment>
      )}
      <InfiniteScroll listEnded={!hasMore} onScrollEnd={fetchNextPage}/>
    </>
  )
}

export default Feed;
