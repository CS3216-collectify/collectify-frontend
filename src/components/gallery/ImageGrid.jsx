import { IonCol, IonGrid, IonRow } from "@ionic/react";

import FlexImage from "../image/FlexImage";
import InfiniteScroll from "../infinite-scroll/InfiniteScroll";
import "./gallery.scss";

const groupElements = (arr, interval) => {
  var groups = [];
  for (var i = 0; i < arr.length; i += interval) {
    groups.push(arr.slice(i, i + interval));
  }
  return groups;
};

const ImageGrid = (props) => {
  const { onScrollEnd: fetchNextPage, images = [], listEnded } = props;

  const groupsOfThree = groupElements(images, 3);

  return (
    <IonGrid fixed className="image-grid">
      {groupsOfThree.map((grp, idx) => (
        <IonRow key={idx}>
          {grp.map((img, idx) => (
            <IonCol className="clickable" key={idx} size={4} onClick={img.clickHandler}>
              <FlexImage className={img.isTradable ? "tradable-img" : ""} src={img.url} />
            </IonCol>
          ))}
        </IonRow>
      ))}
      <InfiniteScroll onScrollEnd={fetchNextPage} listEnded={listEnded} />
    </IonGrid>
  );
};

export default ImageGrid;
