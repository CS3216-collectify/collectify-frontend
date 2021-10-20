import { useCallback, useEffect, useState } from "react";
import { getCollections } from "../../services/collections";
import CollectionList from "./CollectionList";

const LIMIT = 10;

const ProfileCollections = (props) => {
  const [collections, setCollections] = useState([]);
  const [pages, setPages] = useState(-1);
  const [hasMore, setHasMore] = useState(true);

  console.log(pages);
  // username = someone elses, userId = my own
  const { username, currentUserId, profileUserId } = props;
  // should check whether its guest clicking profile tab, or user clicking their own tab, or user viewing others' profile
  const loadUserCollections = useCallback(async () => {
    const nextPage = pages + 1;
    try {
      if (!hasMore) {
        return;
      }
      const retrievedCollections = await getCollections(null, profileUserId, nextPage * LIMIT, LIMIT);

      if ((retrievedCollections && retrievedCollections.length < LIMIT) || !retrievedCollections) {
        setHasMore(false);
      }
      setCollections([...collections, ...retrievedCollections]);
      setPages(nextPage);
    } catch (e) {
      console.log(e);
    }
  }, [collections, hasMore, pages, profileUserId]);

  useEffect(() => {
    if (!username && currentUserId) {
      loadUserCollections();
    }
  }, [currentUserId, username]);

  const fetchNextPage = () => {
    console.log("load next");
    loadUserCollections();
  };

  return (
    <CollectionList onScrollEnd={fetchNextPage} listEnded={!hasMore} collections={collections} />
  )
}

export default ProfileCollections;
