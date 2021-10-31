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
  const { onScrollEnd: fetchNextPage, images = [], listEnded, discover } = props;
  console.log(discover);
  if (!discover) {
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
  } else {
    const groupsOfSix = groupElements(images, 6);
    console.log(groupsOfSix);
    return (
      <IonGrid fixed className="image-grid">
        {groupsOfSix.map((grp, idx) => {
          var returnedHtml =
            grp.length === 6 ? (
              <IonRow>
                <IonCol className="clickable" key={0} size={8}>
                  <FlexImage className={grp[0].isTradable ? "tradable-img" : ""} src={grp[0].url} />
                </IonCol>

                {grp.length > 1 && (
                  <IonCol key={1} size={4}>
                    <IonRow className="big-tile-row--top">
                      <FlexImage className={grp[1].isTradable ? "tradable-img" : ""} src={grp[1].url} />
                    </IonRow>

                    {grp.length > 2 && (
                      <IonRow className="big-tile-row--bottom">
                        <FlexImage className={grp[2].isTradable ? "tradable-img" : ""} src={grp[2].url} />
                      </IonRow>
                    )}
                  </IonCol>
                )}

                {grp.slice(3).map((img, idx) => (
                  <IonCol className="clickable" key={idx} size={4} onClick={img.clickHandler}>
                    <FlexImage className={img.isTradable ? "tradable-img" : ""} src={img.url} />
                  </IonCol>
                ))}
              </IonRow>
            ) : (
              <IonRow>
                {grp.map((img, idx) => (
                  <IonCol className="clickable" key={idx} size={4} onClick={img.clickHandler}>
                    <FlexImage className={img.isTradable ? "tradable-img" : ""} src={img.url} />
                  </IonCol>
                ))}
              </IonRow>
            );
          return returnedHtml;
        })}
        <InfiniteScroll onScrollEnd={fetchNextPage} listEnded={listEnded} />
      </IonGrid>
    );
  }
};

export default ImageGrid;
