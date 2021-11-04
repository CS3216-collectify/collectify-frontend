import { IonCol, IonGrid, IonImg, IonRow } from "@ionic/react";
import { trackDiscoverViewItemEvent, trackSearchViewItemEvent } from "../../services/react-ga";

import FlexImage from "../image/FlexImage";
import InfiniteScroll from "../infinite-scroll/InfiniteScroll";
import "./gallery.scss";
import PopularGif from "../../assets/popular.gif";
import TradableGif from "../../assets/tradable.gif";

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
                {img.isTradable && <IonImg className="tradable-gif" src={TradableGif} />}
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
                {grp[0].isTradable && <IonImg className="tradable-gif" src={TradableGif} />}
                {grp[0].isPopular && <IonImg className="popular-gif" src={PopularGif} />}
              </IonCol>

              <IonCol className="clickable" size={4}>
                <div className="big-tile-row--top clickable" onClick={grp[1].clickHandler}>
                  <FlexImage className={`${grp[1].isTradable ? "tradable-img" : ""} clickable`} src={grp[1].url} />
                  {grp[1].isTradable && <IonImg className="tradable-gif" src={TradableGif} />}
                  {grp[1].isPopular && <IonImg className="popular-gif" src={PopularGif} />}
                </div>
                <div className="big-tile-row--bottom clickable" onClick={grp[2].clickHandler}>
                  <FlexImage className={`${grp[2].isTradable ? "tradable-img" : ""} clickable`} src={grp[2].url} />
                  {grp[2].isTradable && <IonImg className="tradable-gif" src={TradableGif} />}
                  {grp[2].isPopular && <IonImg className="popular-gif" src={PopularGif} />}
                </div>
              </IonCol>

              {grp.slice(3).map((img, idx) => (
                <IonCol className="clickable" key={idx} size={4} onClick={img.clickHandler}>
                  {img.isTradable && <IonImg className="tradable-gif" src={TradableGif} />}
                  <FlexImage className={img.isTradable ? "tradable-img" : ""} src={img.url} />
                  {img.isPopular && <IonImg className="popular-gif" src={PopularGif} />}
                </IonCol>
              ))}
            </IonRow>
          ) : (
            <IonRow key={idx}>
              {grp.map((img, idx) => (
                <IonCol className="clickable" key={idx} size={4} onClick={img.clickHandler}>
                  {img.isTradable && <IonImg className="tradable-gif" src={TradableGif} />}
                  <FlexImage className={img.isTradable ? "tradable-img" : ""} src={img.url} />
                  {img.isPopular && <IonImg className="popular-gif" src={PopularGif} />}
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
