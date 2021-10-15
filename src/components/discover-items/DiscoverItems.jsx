import { useEffect, useState, useCallback } from "react";
import { useHistory } from "react-router";

import "./DiscoverItems.scss";
import ImageGrid from "../gallery/ImageGrid";
import { getItemsForDiscover } from "../../services/items";

const LIMIT = 18;

const DiscoverItems = (props) => {
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

  const goToItemPage = (itemId) => {
    history.push(`/collections/${collectionId}/items/${itemId}`);
  };

  const gridImages = items.map((item) => ({ url: item.coverImage, clickHandler: () => goToItemPage(item.itemId) }));

  return <ImageGrid onScrollEnd={fetchNextPage} images={gridImages} scrollEnded={!hasMore} />;
};

export default DiscoverItems;
