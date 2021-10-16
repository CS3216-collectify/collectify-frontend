import { IonInfiniteScroll, IonInfiniteScrollContent } from "@ionic/react";

const InfiniteScroll = (props) => {
  const { listEnded, onScrollEnd } = props;

  const fetchNextPage = async (e) => {
    await onScrollEnd();
    e.target.complete();
  }

  return (
    <IonInfiniteScroll disabled={listEnded} onIonInfinite={fetchNextPage}>
      <IonInfiniteScrollContent className="ion-margin-top" loadingText="Loading..."></IonInfiniteScrollContent>
    </IonInfiniteScroll>
  )
}

export default InfiniteScroll;
