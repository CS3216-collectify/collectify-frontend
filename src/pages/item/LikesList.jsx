import { IonContent, IonLoading, IonPage } from "@ionic/react";
import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router";
import HomeToolbar from "../../components/toolbar/HomeToolbar";
import UserList from "../../components/user-list/UserList";
import { getLikesByItemId } from "../../services/likes";

const LIMIT = 18;

const LikesList = (props) => {
  const { itemId } = useParams();

  const [users, setUsers] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [pages, setPages] = useState(false);
  const [loading, setLoading] = useState(false);

  const loadNextPage = useCallback(async () => {
    if (!hasMore) {
      return;
    }
    try {
      const nextPage = pages + 1;
      const fetchedUsers = await getLikesByItemId(itemId, nextPage * LIMIT, LIMIT);
      const updatedUsers = [...users, ...fetchedUsers] 
      const updatedHasMore = fetchedUsers && fetchedUsers.length >= LIMIT;
      setPages(nextPage);
      setHasMore(updatedHasMore);
      setUsers(updatedUsers);
    } catch (e) {
      // TODO: Error handling
      console.log(e);
    } finally {
      // TODO: ?
    }
  }, [itemId, hasMore, pages, users]);

  const loadInitialPage = useCallback(async () => {
    try {
      setLoading(true);
      const nextPage = 0;
      const fetchedUsers = await getLikesByItemId(itemId, nextPage * LIMIT, LIMIT);
      const updatedHasMore = fetchedUsers && fetchedUsers.length >= LIMIT;
      setPages(nextPage);
      setHasMore(updatedHasMore);
      setUsers(fetchedUsers);
    } catch (e) {
      // TODO: Error handling
      console.log(e);
    } finally {
      setLoading(false);
    }
  }, [itemId]);

  useEffect(() => {
    loadInitialPage();
  }, [itemId]);

  return (
    <IonPage>
      <HomeToolbar title={`Likes`} />
      <IonContent>
        <IonLoading isOpen={loading} />
        <UserList 
          users={users} 
          onScrollEnded={loadNextPage} 
          listEnded={loadInitialPage} 
          emptyMessage="Be the first one to like this item!"
        />
      </IonContent>
    </IonPage>
  )
}

export default LikesList;
