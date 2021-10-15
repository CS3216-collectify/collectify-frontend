import { useCallback, useEffect, useState } from "react"
import { searchUsers } from "../../services/search";
import UserList from "../user-list/UserList";

const LIMIT = 20;

const UserSearchResultDisplay = (props) => {
  const { searchText } = props;
  const [hasMore, setHasMore] = useState(true);
  const [pages, setPages] = useState(-1);
  const [users, setUsers] = useState([]);

  const loadNextPage = useCallback(async () => {
    if (!hasMore || !searchText) {
      return;
    }
    try {
      const nextPage = pages + 1;
      const fetchedUsers = await searchUsers(searchText, nextPage * LIMIT, LIMIT);
      const updatedUsers = [...users, ...fetchedUsers] 
      const updatedHasMore = !(fetchedUsers && fetchedUsers.length < LIMIT) || !fetchedUsers;
      setPages(nextPage);
      setHasMore(updatedHasMore);
      setUsers(updatedUsers);
    } catch (e) {
      // TODO: Error handling
      console.log(e);
    } finally {
      // TODO: ?
    }
  }, [searchText, hasMore, pages, users]);

  const loadInitialPage = useCallback(async () => {
    try {
      console.log(searchText);
      const nextPage = 0;
      const fetchedUsers = await searchUsers(searchText, nextPage * LIMIT, LIMIT);
      const updatedHasMore = !(fetchedUsers && fetchedUsers.length < LIMIT) || !fetchedUsers;
      setPages(nextPage);
      setHasMore(updatedHasMore);
      setUsers(fetchedUsers);
    } catch (e) {
      // TODO: Error handling
      console.log(e);
    } finally {
      // TODO: ?
    }
  }, [searchText]);

  useEffect(() => {
    if (props.searchText) {
      loadInitialPage();
    }
  }, [props.searchText]);

  return (
    <>
      <UserList 
        listEnded={!hasMore} 
        onScrollEnd={loadNextPage} 
        users={users} 
      />
    </>
  )
}

export default UserSearchResultDisplay;
