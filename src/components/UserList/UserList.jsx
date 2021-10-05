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
import FlexImage from "../../components/Image/FlexImage"

const LIMIT = 10;

const UserList = (props) => {
  const { collectionId = 1 } = props;
  const [users, setUsers] = useState([]);
  const [pages, setPages] = useState(-1);
  const [hasMore, setHasMore] = useState(true);

  const loadUsers = async () => {
    const nextPage = pages + 1;
    setTimeout(async () => {
      // TODO: Remove this timeout
      try {
        if (!hasMore) {
          return;
        }
        const retrievedUsers = await getFollowersByCollectionId(
          collectionId,
          nextPage * LIMIT,
          LIMIT
        );
        console.log(retrievedUsers);
        if (
          (retrievedUsers && retrievedUsers.length < LIMIT) ||
          !retrievedUsers
        ) {
          setHasMore(false);
        }
        setUsers([...users, ...retrievedUsers]);
        setPages(nextPage);
      } catch (e) {
        console.log(e);
      }
    }, 3000);
  };

  const fetchNextPage = () => {
    console.log("load next");
    loadUsers();
  };

  useEffect(() => {
    loadUsers();
  }, []);

  return (
    <IonContent fullscreen>
      <IonList>
        {/* <IonListHeader>Followers/Likes</IonListHeader> */}
        {users.map((userData, idx) => (
          <IonItem key={idx}>
            <IonAvatar>
              <FlexImage src={userData.profilePhotoUrl} />
            </IonAvatar>
            <IonCol>
              <IonLabel>@{userData.username}</IonLabel>
            </IonCol>
          </IonItem>
        ))}
        <IonInfiniteScroll
          disabled={!hasMore}
          onIonInfinite={fetchNextPage}
        >
          <IonInfiniteScrollContent loadingText="Loading..."></IonInfiniteScrollContent>
        </IonInfiniteScroll>
      </IonList>
    </IonContent>
  );
};

export default UserList;
