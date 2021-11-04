import { useCallback, useEffect, useState } from "react";
import useToastContext from "../../hooks/useToastContext";
import { searchUsers } from "../../services/search";
import UserList from "../user-list/UserList";

const LIMIT = 18;

const UserSearchResultDisplay = (props) => {
  const { searchText } = props;
  const [hasMore, setHasMore] = useState(true);
  const [pages, setPages] = useState(-1);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const setToast = useToastContext();

  const loadNextPage = useCallback(async () => {
    if (!hasMore || !searchText) {
      return;
    }
    try {
      const nextPage = pages + 1;
      const fetchedUsers = await searchUsers(searchText, nextPage * LIMIT, LIMIT);
      const updatedUsers = [...users, ...fetchedUsers];
      const updatedHasMore = fetchedUsers && fetchedUsers.length >= LIMIT;
      setPages(nextPage);
      setHasMore(updatedHasMore);
      setUsers(updatedUsers);
    } catch (e) {
      setToast({ message: "Unable to load search results. Please try again later.", color: "danger" });
    }
  }, [hasMore, searchText, pages, users, setToast]);

  const loadInitialPage = useCallback(async () => {
    if (!searchText) {
      return;
    }
    try {
      setLoading(true);
      const nextPage = 0;
      const fetchedUsers = await searchUsers(searchText, nextPage * LIMIT, LIMIT);
      const updatedHasMore = fetchedUsers && fetchedUsers.length >= LIMIT;
      setPages(nextPage);
      setHasMore(updatedHasMore);
      setUsers(fetchedUsers);
    } catch (e) {
      setToast({ message: "Unable to load search results. Please try again later.", color: "danger" });
    }
  }, [searchText, setToast]);

  useEffect(() => {
    if (props.searchText) {
      loadInitialPage();
    }
  }, [loadInitialPage, props.searchText]);

  return (
    <>
      <UserList listEnded={!hasMore} onScrollEnd={loadNextPage} users={users} emptyMessage="😵‍💫 No matching users found. Try another keyword!" />
    </>
  );
};

export default UserSearchResultDisplay;
