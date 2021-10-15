import { useEffect, useState } from "react";
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

  const loadItems = async () => {
    const nextPage = pages + 1;
    try {
      if (!hasMore) {
        return;
      }
      const retrievedItems = await getItemsFromCollection(
        collectionId,
        nextPage * LIMIT,
        LIMIT
      );
      console.log(retrievedItems);
      if (
        (retrievedItems && retrievedItems.length < LIMIT) ||
        !retrievedItems
      ) {
        setHasMore(false);
      }
      setItems([...items, ...retrievedItems]);
      setPages(nextPage);
    } catch (e) {
      console.log(e);
    }
  };

  const fetchNextPage = () => {
    console.log("load next");
    loadItems();
  };

  useEffect(() => {
    loadItems();
  }, []);

  return (
    <ItemGrid
      onScrollEnd={fetchNextPage}
      items={items}
      listEnded={!hasMore}
    />
  )
};

export default CollectionItems;
  