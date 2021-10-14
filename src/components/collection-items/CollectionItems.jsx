import { useEffect, useState } from "react";
import { useHistory } from "react-router";
import ImageGrid from "../gallery/ImageGrid";
import { getItemsFromCollection } from "../../services/items";

const groupElements = (arr, interval) => {
  var groups = [];
  for (var i = 0; i < arr.length; i += interval) {
    groups.push(arr.slice(i, i + interval));
  }
  return groups;
};

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

  const goToItemPage = (itemId) => {
    history.push(
      `/collections/${collectionId}/items/${itemId}`
    );
  };

  const gridImages = items.map((item) => ({ url: item.coverImage, clickHandler: () => goToItemPage(item.itemId) }));

  return (
    <ImageGrid 
      onScrollEnd={fetchNextPage}
      images={gridImages}
      hasMore={hasMore}
    />
  );
};

export default CollectionItems;
  