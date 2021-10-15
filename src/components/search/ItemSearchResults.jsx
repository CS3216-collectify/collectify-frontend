import { IonLoading } from "@ionic/react";
import { useCallback, useEffect, useState } from "react"
import { searchItems } from "../../services/search";
import ItemGrid from "../collection-items/ItemGrid";

const LIMIT = 18;

const ItemSearchResultDisplay = (props) => {
  const { searchText } = props;
  const [hasMore, setHasMore] = useState(true);
  const [pages, setPages] = useState(-1);
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);

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
      // TODO: Error handling
      console.log(e);
    } finally {
      // TODO: ?
    }
  }, [searchText, hasMore, pages, items])

  const loadInitialPage = useCallback(async () => {
    try {
      setLoading(true);
      console.log(searchText);
      const nextPage = 0;
      const fetchedItems = await searchItems(searchText, nextPage * LIMIT, LIMIT);
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
  }, [searchText]);

  useEffect(() => {
    if (props.searchText) {
      loadInitialPage();
    }
  }, [props.searchText]);

  return (
    <>
      <IonLoading isOpen={loading} />
      <ItemGrid 
        listEnded={!hasMore} 
        onScrollEnd={loadNextPage} 
        items={items} 
      />
    </>
  )
}

export default ItemSearchResultDisplay;
