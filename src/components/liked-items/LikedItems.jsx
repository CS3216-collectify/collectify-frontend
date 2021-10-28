import { getLikedItems } from "../../services/profile";
import { IonLoading } from "@ionic/react";
import { useCallback, useEffect, useState } from "react"
import ItemGrid from "../collection-items/ItemGrid";
import { useLocation } from "react-router";

const LIMIT = 18;

const LikedItems = (props) => {
  const location = useLocation();
  const [hasMore, setHasMore] = useState(true);
  const [pages, setPages] = useState(-1);
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);

  const loadNextPage = useCallback(async () => {
    if (!hasMore) {
      return;
    }
    try {
      const nextPage = pages + 1;
      const fetchedItems = await getLikedItems(nextPage * LIMIT, LIMIT);
      const updatedItems = [...items, ...fetchedItems] 
      const updatedHasMore = fetchedItems && fetchedItems.length >= LIMIT;
      setPages(nextPage);
      setHasMore(updatedHasMore);
      setItems(updatedItems);
    } catch (e) {
      // TODO: Error handling
      console.log(e);
    } finally {
      // TODO: ?
    }
  }, [hasMore, pages, items])

  const loadInitialPage = useCallback(async () => {
    try {
      setLoading(true);
      const nextPage = 0;
      const fetchedItems = await getLikedItems(nextPage * LIMIT, LIMIT);
      const updatedHasMore = fetchedItems && fetchedItems.length >= LIMIT;
      setPages(nextPage);
      setHasMore(updatedHasMore);
      setItems(fetchedItems);
    } catch (e) {
      // TODO: Error handling
      console.log(e);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadInitialPage();
  }, [loadInitialPage, location]);

  return (
    <>
      <ItemGrid 
        listEnded={!hasMore} 
        onScrollEnd={loadNextPage} 
        items={items} 
        emptyMessage="You have not liked any items!"
      />
    </>
  )
}

export default LikedItems;
