import { IonContent, IonLoading, IonPage } from "@ionic/react";
import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router";
import HomeToolbar from "../../components/toolbar/HomeToolbar";
import UserList from "../../components/user-list/UserList";
import { getFollowersByCollectionId } from "../../services/followers";

const LIMIT = 18;

const FollowersList = (props) => {
  const { collectionId } = useParams();

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
      const fetchedUsers = await getFollowersByCollectionId(collectionId, nextPage * LIMIT, LIMIT);
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
  }, [collectionId, hasMore, pages, users]);

  const loadInitialPage = useCallback(async () => {
    try {
      setLoading(true);
      const nextPage = 0;
      const fetchedUsers = await getFollowersByCollectionId(collectionId, nextPage * LIMIT, LIMIT);
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
  }, [collectionId]);

  useEffect(() => {
    loadInitialPage();
  }, [collectionId]);

  return (
    <IonPage>
      <HomeToolbar title={`Followers`} />
      <IonContent>
        <IonLoading isOpen={loading} />
        <UserList users={users} onScrollEnded={loadNextPage} listEnded={loadInitialPage} />
      </IonContent>
    </IonPage>
  )
}

export default FollowersList;
