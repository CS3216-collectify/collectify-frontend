import { IonLoading } from "@ionic/react";
import { useCallback, useEffect, useState } from "react"
import { useLocation } from "react-router";
import useToastContext from "../../hooks/useToastContext";
import { getFollowedCollections } from "../../services/profile";
import CollectionList from "../profile-collection/CollectionList";

const LIMIT = 6;

const FollowedCollections = (props) => {
  const location = useLocation();
  const setToast = useToastContext();
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
      setToast({ message: "Unable to load collections. Please try again later.", color: "danger" });
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
      setToast({ message: "Unable to load collections. Please try again later.", color: "danger" });
    } finally {
      setLoading(false);
    }
  }, [])

  useEffect(() => {
    loadInitialPage();
  }, [loadInitialPage, location]);

  return (
    <>
      <CollectionList 
        listEnded={!hasMore} 
        onScrollEnd={loadNextPage} 
        collections={collections} 
        emptyMessage="You are not following any collections!"
      />
    </>
  )
}

export default FollowedCollections;
