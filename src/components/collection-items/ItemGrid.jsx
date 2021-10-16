import { useHistory } from "react-router";
import ImageGrid from "../gallery/ImageGrid";

const ItemGrid = (props) => {
  const history = useHistory();
  const { items, onScrollEnd: fetchNextPage, listEnded } = props;

  const goToItemPage = (collectionId, itemId) => {
    history.push(`/collections/${collectionId}/items/${itemId}`);
  };

  const gridImages = items.map((item) => ({ url: item.coverImage, clickHandler: () => goToItemPage(item.collectionId, item.itemId) }));

  return <ImageGrid onScrollEnd={fetchNextPage} images={gridImages} listEnded={listEnded} />;
};

export default ItemGrid;
