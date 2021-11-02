import { IonContent, IonPage } from "@ionic/react";
import { useCallback, useEffect, useState } from "react";
import { useLocation, useParams } from "react-router";
import HomeToolbar from "../../components/toolbar/HomeToolbar";
import UserList from "../../components/user-list/UserList";
import useToastContext from "../../hooks/useToastContext";
import { getLikesByItemId } from "../../services/likes";
import { trackPageView } from "../../services/react-ga";

const LIMIT = 18;

const LikesList = (props) => {
  const setToast = useToastContext();
  const { itemId } = useParams();
  const location = useLocation();
  const [users, setUsers] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [pages, setPages] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    trackPageView(window.location.pathname);
  }, []);

  const loadNextPage = useCallback(async () => {
    if (!hasMore) {
      return;
    }
    try {
      const nextPage = pages + 1;
      const fetchedUsers = await getLikesByItemId(itemId, nextPage * LIMIT, LIMIT);
      const updatedUsers = [...users, ...fetchedUsers];
      const updatedHasMore = fetchedUsers && fetchedUsers.length >= LIMIT;
      setPages(nextPage);
      setHasMore(updatedHasMore);
      setUsers(updatedUsers);
    } catch (e) {
      setToast({ message: "Failed to load likes. Please try again later.", color: "danger" });
    }
  }, [hasMore, pages, itemId, users, setToast]);

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
      setToast({ message: "Failed to load likes. Please try again later.", color: "danger" });
    } finally {
      setLoading(false);
    }
  }, [itemId, setToast]);

  useEffect(() => {
    loadInitialPage();
  }, [itemId, loadInitialPage, location]);

  return (
    <IonPage>
      <HomeToolbar title={`Likes`} />
      <IonContent>
        <UserList users={users} onScrollEnded={loadNextPage} listEnded={loadInitialPage} emptyMessage="Be the first one to like this item!" />
      </IonContent>
    </IonPage>
  );
};

export default LikesList;
