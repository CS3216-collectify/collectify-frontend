import { useEffect, useState, useCallback } from "react";

import "./DiscoverItems.scss";
import ItemGrid from "../collection-items/ItemGrid";
import { getItemsForDiscover } from "../../services/items";

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
      const retrievedItems = (await getItemsForDiscover(nextPage * LIMIT, LIMIT)).items;
      console.log(retrievedItems);
      if ((retrievedItems && retrievedItems.length < LIMIT) || !retrievedItems) {
        setHasMore(false);
      }
      setItems([...items, ...retrievedItems]);
      setPages(nextPage);
    } catch (e) {
      console.log(e);
    }
  }, [hasMore, items, pages]);

  const fetchNextPage = () => {
    console.log("load next");
    loadItems();
  };

  useEffect(() => {
    loadItems();
  }, [loadItems]);

  return <ItemGrid onScrollEnd={fetchNextPage} items={items} scrollEnded={!hasMore} />;
};

export default DiscoverItems;
