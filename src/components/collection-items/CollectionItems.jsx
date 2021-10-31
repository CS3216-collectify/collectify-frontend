import { useCallback, useEffect, useState } from "react";
import { useLocation } from "react-router";
import ItemGrid from "./ItemGrid";
import { getItemsFromCollection } from "../../services/items";
import useToastContext from "../../hooks/useToastContext";

const LIMIT = 18;

const CollectionItems = (props) => {
  const location = useLocation();
  const setToast = useToastContext();
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
      setToast({ message: "Unable to load items. Please try again later.", color: "danger" });
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
      setToast({ message: "Unable to load items. Please try again later.", color: "danger" });
    }
  }, [collectionId]);

  useEffect(() => {
    loadInitialItems();
  }, [loadInitialItems, location]);

  const fetchNextPage = () => {
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
