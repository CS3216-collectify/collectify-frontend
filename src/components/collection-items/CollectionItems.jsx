import { useCallback, useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router";
import ItemGrid from "./ItemGrid";
import { getItemsFromCollection } from "../../services/items";
import { IonLoading } from "@ionic/react";

const LIMIT = 18;

const CollectionItems = (props) => {
  const history = useHistory();
  const location = useLocation();

  const { collectionId = 1 } = props;
  const [items, setItems] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [pages, setPages] = useState(-1);

  const loadItems = useCallback(async () => {
    const nextPage = pages + 1;
    try {
      if (!hasMore) {
        return;
      }
      const retrievedItems = await getItemsFromCollection(collectionId, nextPage * LIMIT, LIMIT);
      const updatedHasMore = retrievedItems && retrievedItems.length >= LIMIT;
      setHasMore(updatedHasMore);
      setItems([...items, ...retrievedItems]);
      setPages(nextPage);
    } catch (e) {
      console.log(e);
    } finally {
      // TODO
    }
  }, [collectionId, hasMore, items, pages]);

  const loadInitialItems = useCallback(async () => {
    const nextPage = 0;
    try {
      const retrievedItems = await getItemsFromCollection(collectionId, nextPage * LIMIT, LIMIT);
      const updatedHasMore = retrievedItems && retrievedItems.length >= LIMIT;
      setHasMore(updatedHasMore);
      setItems(retrievedItems);
      setPages(nextPage);
    } catch (e) {
      console.log(e);
    } finally {
      // TODO
    }
  }, [collectionId]);

  useEffect(() => {
    loadInitialItems();
  }, [loadInitialItems, location]);

  const fetchNextPage = () => {
    console.log("load next");
    loadItems();
  };

  return (
    <ItemGrid
      onScrollEnd={fetchNextPage}
      items={items.map((item) => {
        return { ...item, collectionId };
      })}
      listEnded={!hasMore}
    />
  );
};

export default CollectionItems;
