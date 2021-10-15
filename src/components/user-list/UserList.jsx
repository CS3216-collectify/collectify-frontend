import {
  IonAvatar,
  IonCol,
  IonContent,
  IonImg,
  IonInfiniteScroll,
  IonInfiniteScrollContent,
  IonItem,
  IonLabel,
  IonList,
} from "@ionic/react";
import { useEffect } from "react";
import { useState } from "react";
import { getFollowersByCollectionId } from "../../services/followers";
import FlexImage from "../../components/image/FlexImage"

const LIMIT = 10;

const UserList = (props) => {
  const { onScrollEnd: fetchNextPage, users = [], scrollEnded } = props;

  return (
    <IonList>
      {/* <IonListHeader>Followers/Likes</IonListHeader> */}
      {users.map((userData, idx) => (
        <IonItem key={idx}>
          <IonAvatar>
            <IonImg src={userData.profilePhotoUrl} />
          </IonAvatar>
          <IonCol>
            <IonLabel>@{userData.username}</IonLabel>
          </IonCol>
        </IonItem>
      ))}
      <IonInfiniteScroll
        disabled={scrollEnded}
        onIonInfinite={fetchNextPage}
      >
        <IonInfiniteScrollContent loadingText="Loading..."></IonInfiniteScrollContent>
      </IonInfiniteScroll>
    </IonList>
  );
};

export default UserList;
