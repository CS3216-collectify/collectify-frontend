import { useEffect, useState, useCallback } from "react";

import "./DiscoverItems.scss";
import ItemGrid from "../collection-items/ItemGrid";
import { getDiscoverItems } from "../../services/search";

const LIMIT = 18;

const DiscoverItems = (props) => {
  const [items, setItems] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [pages, setPages] = useState(-1);

  const loadItems = useCallback(async () => {
    const nextPage = pages + 1;
    try {
      if (!hasMore) {
        return;
      }
      const retrievedItems = await getDiscoverItems(nextPage * LIMIT, LIMIT);
      const updatedHasMore = retrievedItems && retrievedItems.length >= LIMIT;
      setHasMore(updatedHasMore);
      setItems([...items, ...retrievedItems]);
      setPages(nextPage);
    } catch (e) {
      console.log(e);
    }
  }, [hasMore, items, pages]);

  const loadInitialItems = useCallback(async () => {
    const nextPage = 0;
    try {
      const retrievedItems = await getDiscoverItems(nextPage * LIMIT, LIMIT);
      const updatedHasMore = retrievedItems && retrievedItems.length >= LIMIT;
      setHasMore(updatedHasMore);
      setItems(retrievedItems);
      setPages(nextPage);
    } catch (e) {
      console.log(e);
    }
  }, []);

  const fetchNextPage = () => {
    loadItems();
  };

  useEffect(() => {
    loadInitialItems();
  }, [loadInitialItems]);

  return <ItemGrid onScrollEnd={fetchNextPage} items={items} scrollEnded={!hasMore} />;
};

export default DiscoverItems;
