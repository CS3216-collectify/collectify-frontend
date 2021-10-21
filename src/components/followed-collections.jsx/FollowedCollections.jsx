import { IonLoading } from "@ionic/react";
import { useCallback, useEffect, useState } from "react"
import { getFollowedCollections } from "../../services/profile";
import CollectionList from "../profile-collection/CollectionList";

const LIMIT = 10;

const FollowedCollections = (props) => {
  const [hasMore, setHasMore] = useState(true);
  const [pages, setPages] = useState(-1);
  const [collections, setCollections] = useState([]);
  const [loading, setLoading] = useState(false);

  const loadNextPage = useCallback(async () => {
    if (!hasMore) {
      return;
    }
    try {
      const nextPage = pages + 1;
      const fetchedCollections = await getFollowedCollections(nextPage * LIMIT, LIMIT);
      const updatedCollections = [...collections, ...fetchedCollections] 
      const updatedHasMore = fetchedCollections && fetchedCollections.length >= LIMIT;
      setPages(nextPage);
      setHasMore(updatedHasMore);
      setCollections(updatedCollections);
    } catch (e) {
      // TODO: Error handling
      console.log(e);
    } finally {
      // TODO: ?
    }
  }, [hasMore, pages, collections]);

  const loadInitialPage = useCallback(async () => {
    try {
      setLoading(true);
      const nextPage = 0;
      const fetchedCollections = await getFollowedCollections(nextPage * LIMIT, LIMIT);
      const updatedHasMore = fetchedCollections && fetchedCollections.length >= LIMIT;
      setPages(nextPage);
      setHasMore(updatedHasMore);
      setCollections(fetchedCollections);
    } catch (e) {
      // TODO: Error handling
      console.log(e);
    } finally {
      setLoading(false);
    }
  }, [])

  useEffect(() => {
    loadInitialPage();
  }, []);

  return (
    <>
      <IonLoading isOpen={loading} />
      <CollectionList 
        listEnded={!hasMore} 
        onScrollEnd={loadNextPage} 
        collections={collections} 
      />
    </>
  )
}

export default FollowedCollections;
