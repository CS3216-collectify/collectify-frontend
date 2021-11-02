import { IonCol, IonGrid, IonRow } from "@ionic/react";
import { trackDiscoverViewItemEvent, trackSearchViewItemEvent } from "../../services/react-ga";

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

  const imgClickHandler = (img) => {
    if (discover) {
      trackDiscoverViewItemEvent();
    } else {
      trackSearchViewItemEvent();
    }
    console.log(img);
    img.clickHandler();
  };

  if (!discover) {
    const groupsOfThree = groupElements(images, 3);

    return (
      <IonGrid fixed className="image-grid">
        {groupsOfThree.map((grp, idx) => (
          <IonRow key={idx}>
            {grp.map((img, idx) => (
              <IonCol className="clickable" key={idx} size={4} onClick={() => imgClickHandler(img)}>
                <FlexImage className={img.isTradable ? "tradable-img" : ""} src={img.url} />
              </IonCol>
            ))}
          </IonRow>
        ))}
        <InfiniteScroll onScrollEnd={fetchNextPage} listEnded={listEnded} />
      </IonGrid>
    );
  }

  const groupsOfSix = groupElements(images, 6);
  return (
    <IonGrid fixed className="image-grid">
      {groupsOfSix.map((grp, idx) => {
        var returnedHtml =
          grp.length === 6 ? (
            <IonRow key={idx}>
              <IonCol className="clickable" size={8} onClick={grp[0].clickHandler}>
                <FlexImage className={grp[0].isTradable ? "tradable-img" : ""} src={grp[0].url} />
              </IonCol>

              <IonCol className="clickable" size={4}>
                <div className="big-tile-row--top clickable" onClick={grp[1].clickHandler}>
                  <FlexImage className={`${grp[1].isTradable ? "tradable-img" : ""} clickable`} src={grp[1].url} />
                </div>
                <div className="big-tile-row--bottom clickable" onClick={grp[2].clickHandler}>
                  <FlexImage className={`${grp[2].isTradable ? "tradable-img" : ""} clickable`} src={grp[2].url} />
                </div>
              </IonCol>

              {grp.slice(3).map((img, idx) => (
                <IonCol className="clickable" key={idx} size={4} onClick={img.clickHandler}>
                  <FlexImage className={img.isTradable ? "tradable-img" : ""} src={img.url} />
                </IonCol>
              ))}
            </IonRow>
          ) : (
            <IonRow key={idx}>
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
};

export default ImageGrid;
