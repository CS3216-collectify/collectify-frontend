import { useCallback, useEffect, useState } from "react";
import { useHistory } from "react-router";
import ItemGrid from "./ItemGrid";
import { getItemsFromCollection } from "../../services/items";

const LIMIT = 18;

const CollectionItems = (props) => {
  const history = useHistory();
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
    }
  }, [collectionId, hasMore, items, pages]);

  useEffect(() => {
    loadItems();
  }, [loadItems]);

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
