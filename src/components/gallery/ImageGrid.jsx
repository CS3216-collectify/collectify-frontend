import {
  IonCol,
  IonGrid,
  IonInfiniteScroll,
  IonInfiniteScrollContent,
  IonRow,
} from "@ionic/react";
import FlexImage from "../image/FlexImage";
import "./gallery.scss";

const groupElements = (arr, interval) => {
  var groups = [];
  for (var i = 0; i < arr.length; i += interval) {
    groups.push(arr.slice(i, i + interval));
  }
  return groups;
};

const ImageGrid = (props) => {
  const { onScrollEnd: fetchNextPage, images, scrollEnded } = props;

  const groupsOfThree = groupElements(images, 3);

  return (
    <IonGrid className="image-grid">
      {groupsOfThree.map((grp, idx) => (
        <IonRow className="single-row-3" size={12} key={idx}>
          {grp.map((img, idx) => (
            <IonCol key={idx} className="single-image-3" size={4}>
              <FlexImage
                src={img.url}
                onClick={img.clickHandler}
              />
            </IonCol>
          ))}
        </IonRow>
      ))}
      <IonInfiniteScroll disabled={scrollEnded} onIonInfinite={fetchNextPage}>
        <IonInfiniteScrollContent
          className="ion-margin-top"
          loadingText="Loading..."
        ></IonInfiniteScrollContent>
      </IonInfiniteScroll>
    </IonGrid>
  );
};

export default ImageGrid;
