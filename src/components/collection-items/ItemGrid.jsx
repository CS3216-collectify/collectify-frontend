import { IonGrid } from "@ionic/react";
import { useHistory } from "react-router";
import ImageGrid from "../gallery/ImageGrid";
import Text from "../text/Text";

const ItemGrid = (props) => {
  const history = useHistory();
  const { items, onScrollEnd: fetchNextPage, listEnded, emptyMessage = "No items found!", discover } = props;

  const goToItemPage = (collectionId, itemId) => {
    history.push(`/collections/${collectionId}/items/${itemId}`);
  };

  const gridImages = items.map((item) => ({
    url: item.coverImage,
    clickHandler: () => goToItemPage(item.collectionId, item.itemId),
    isTradable: item.isTradable,
  }));

  if (listEnded && items && items.length === 0 && emptyMessage) {
    return (
      <IonGrid className="ion-text-center">
        <Text size="xl">{emptyMessage}</Text>
      </IonGrid>
    );
  }

  return <ImageGrid onScrollEnd={fetchNextPage} images={gridImages} listEnded={listEnded} discover={discover} />;
};

export default ItemGrid;
