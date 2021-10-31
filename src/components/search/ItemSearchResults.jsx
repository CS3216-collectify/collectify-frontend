import { IonLoading } from "@ionic/react";
import { useCallback, useEffect, useState } from "react"
import useToastContext from "../../hooks/useToastContext";
import { searchItems } from "../../services/search";
import ItemGrid from "../collection-items/ItemGrid";

const LIMIT = 18;

const ItemSearchResultDisplay = (props) => {
  const { searchText } = props;
  const [hasMore, setHasMore] = useState(true);
  const [pages, setPages] = useState(-1);
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const setToast = useToastContext();

  const loadNextPage = useCallback(async () => {
    if (!hasMore || !searchText) {
      return;
    }
    try {
      const nextPage = pages + 1;
      const fetchedItems = await searchItems(searchText, nextPage * LIMIT, LIMIT);
      const updatedItems = [...items, ...fetchedItems] 
      const updatedHasMore = fetchedItems && fetchedItems.length >= LIMIT;
      setPages(nextPage);
      setHasMore(updatedHasMore);
      setItems(updatedItems);
    } catch (e) {
      setToast({ message: "Unable to load search results. Please try again later.", color: "danger" });
    }
  }, [searchText, hasMore, pages, items])

  const loadInitialPage = useCallback(async () => {
    if (!searchText) {
      return;
    }
    try {
      setLoading(true);
      const nextPage = 0;
      const fetchedItems = await searchItems(searchText, nextPage * LIMIT, LIMIT);
      const updatedHasMore = fetchedItems && fetchedItems.length >= LIMIT;
      setPages(nextPage);
      setHasMore(updatedHasMore);
      setItems(fetchedItems);
    } catch (e) {
      setToast({ message: "Unable to load search results. Please try again later.", color: "danger" });
    } finally {
      setLoading(false);
    }
  }, [searchText]);

  useEffect(() => {
    if (props.searchText) {
      loadInitialPage();
    }
  }, [loadInitialPage, props.searchText]);

  return (
    <>
      <ItemGrid 
        listEnded={!hasMore} 
        onScrollEnd={loadNextPage} 
        items={items} 
        emptyMessage="No matching items found. Try other keywords!"
      />
    </>
  )
}

export default ItemSearchResultDisplay;
