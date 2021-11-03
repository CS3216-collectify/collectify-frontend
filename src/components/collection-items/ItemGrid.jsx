import { IonGrid } from "@ionic/react";
import { useHistory } from "react-router";
import ImageGrid from "../gallery/ImageGrid";
import TextBackground from "../text-background/TextBackground";

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
        <TextBackground size="l" text={emptyMessage} />
      </IonGrid>
    );
  }

  return <ImageGrid onScrollEnd={fetchNextPage} images={gridImages} listEnded={listEnded} discover={discover} />;
};

export default ItemGrid;
