import { useCallback, useEffect, useState } from "react";
import { useLocation } from "react-router";
import useToastContext from "../../hooks/useToastContext";
import { getLikedItems } from "../../services/profile";
import ItemGrid from "../collection-items/ItemGrid";

const LIMIT = 18;

const LikedItems = (props) => {
  const location = useLocation();
  const setToast = useToastContext();
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
      setToast({ message: "Unable to load items. Please try again later.", color: "danger" });
    }
  }, [hasMore, pages, items, setToast])

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
      setToast({ message: "Unable to load items. Please try again later.", color: "danger" });
    } finally {
      setLoading(false);
    }
  }, [setToast]);

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
