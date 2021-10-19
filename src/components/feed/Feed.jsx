import HomeItem from "./HomeItem";
import InfiniteScroll from "../infinite-scroll/InfiniteScroll";
import { useCallback, useEffect, useState } from "react";
import { getFeed } from "../../services/feed";

const LIMIT = 6;

const HomeItems = (props) => {

  const { userId = 1 } = props;
  const [items, setItems] = useState([]);
  const [pages, setPages] = useState(-1);
  const [hasMore, setHasMore] = useState(true);

  const loadItems = useCallback(async () => {
    const nextPage = pages + 1;
    try {
      if (!hasMore) {
        return;
      }
      const retrievedItems = await getFeed(userId, nextPage * LIMIT, LIMIT);
      if ((retrievedItems && retrievedItems.length < LIMIT) || !retrievedItems) {
        setHasMore(false);
      }
      setItems([...items, ...retrievedItems]);
      setPages(nextPage);
    } catch (e) {
      console.log(e);
    }
  }, [hasMore, items, pages]);

  useEffect(() => {
    loadItems();
  }, []);

  const fetchNextPage = () => {
    console.log("load next");
    loadItems();
  };

  // fetch feed

  return (
    <>
      {items.map((item, idx) =>
        <HomeItem key={idx} itemData={item} />
      )}
      <InfiniteScroll listEnded={!hasMore} onScrollEnd={fetchNextPage}/>
    </>
  )
}

export default HomeItems;
